const quote = (cmd: TemplateStringsArray, ...args: Array<string | number>) => {
  return cmd.reduce((acc, cur, i) => {
    return acc + cur + (args[i] || "");
  }, "");
};
const execSync = (c: string) => {
  const cmd = c.split(/\s+/);
  return Deno.spawnSync(cmd[0], {
    args: cmd.slice(1),
  });
};
const execSyncWrapper = (
  cmd: TemplateStringsArray | string,
  // deno-lint-ignore no-explicit-any
  ...args: any[]
) => {
  if (typeof cmd === "string") {
    return execSync(cmd);
  } else {
    return execSync(quote(cmd, ...args));
  }
};

/** Run a command and return stdout decoded */
export const $o = (
  cmd: TemplateStringsArray | string,
  ...args: Array<string | number>
) => {
  return new TextDecoder().decode(execSyncWrapper(cmd, ...args).stdout);
};
/** Run a command and return stdout decoded (alias to $o) */
export const $ = $o;
/** Run a command and return stderr decoded */
export const $e = (
  cmd: TemplateStringsArray | string,
  ...args: Array<string | number>
) => {
  return new TextDecoder().decode(execSyncWrapper(cmd, ...args).stderr);
};
/** Run a command and return the status */
export const $s = (
  cmd: TemplateStringsArray | string,
  ...args: Array<string | number>
) => {
  return execSyncWrapper(cmd, ...args).success;
};
/** Run a command and throw an error if it exists with a non-zero code. */
export const $t = (
  cmd: TemplateStringsArray | string,
  ...args: Array<string | number>
) => {
  const result = execSyncWrapper(cmd, ...args);
  if (!result.success) {
    console.error(
      new TextDecoder().decode(execSyncWrapper(cmd, ...args).stderr),
    );
    throw (`'${cmd} ${args}' exited with non-zero code.`);
  }
};
/** Run a command with stdin,stdout,stderr set as 'inherit'
 * This is useful for long-running/interactive commands
 *
 * `$$` have a `throws` property, by default it is set to true.
 * If `throws` is set to true this function will throw an error if the command exists with a non-zero code
 */
export const $$ = (
  cmd: TemplateStringsArray | string,
  ...args: Array<string | number>
) => {
  const cmdStr = typeof (cmd) == "string" ? cmd : quote(cmd, ...args);
  const cmdArr = cmdStr.split(/\s+/);
  const success = Deno.spawnSync(cmdArr[0], {
    args: cmdArr.slice(1),
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  }).success;
  if ($$.throws && !success) {
    throw (`'${cmd} ${args}' exited with non-zero code.`);
  }
};
$$.throws = false;

/** Run a command with a specified shell
 *
 * It should be used as workaround when the default quoting of arguments doesn't work, example: echo 'hello world'
 *
 * Quoting currently relies on splitting by white-space and doesn't handle quoted arguments correctly
 *
 Hopefully this can be fixed in the future but for now `shellRun` can be used as an escape hatch */
export const shellRun = (
  { shell, shellExecFlag, cmd }: {
    shell: string;
    shellExecFlag: string;
    cmd: string;
  },
) => {
  return Deno.spawnSync(shell, {
    args: [shellExecFlag, cmd],
  });
};
