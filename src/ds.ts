const quote = (cmd: TemplateStringsArray, ...args: Array<string | number>) => {
  return cmd.reduce((acc, cur, i) => {
    return acc + cur + (args[i - 1] || "");
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
  return execSyncWrapper(cmd, ...args).status;
};
/** Run a command with stdin,stdout,stderr set as 'inherit'
 * This is useful for long-running/interactive commands */
export const $$ = (
  cmd: TemplateStringsArray,
  ...args: Array<string | number>
) => {
  const cmdStr = typeof (cmd) == "string" ? cmd : quote(cmd, ...args);
  const cmdArr = cmdStr.split(/\s+/);
  return Deno.spawnSync(cmdArr[0], {
    args: cmdArr.slice(1),
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  }).status;
};
