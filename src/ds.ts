// deno-lint-ignore no-explicit-any
const quote = (cmd: TemplateStringsArray, ...args: any[]) => {
  return cmd.reduce((acc, cur, i) => {
    return acc + cur + (args[i - 1] || "");
  }, "");
};

// takes a command as raw string and run it
const execSync = (c: string) => {
  const cmd = c.split(/\s+/);
  return Deno.spawnSync(cmd[0], {
    args: cmd.slice(1),
  });
};
export const execSyncWrapper = (
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
// deno-lint-ignore no-explicit-any
export const $o = (cmd: TemplateStringsArray | string, ...args: any[]) => {
  return new TextDecoder().decode(execSyncWrapper(cmd, ...args).stdout);
};
export const $ = $o;
// deno-lint-ignore no-explicit-any
export const $e = (cmd: TemplateStringsArray | string, ...args: any[]) => {
  return new TextDecoder().decode(execSyncWrapper(cmd, ...args).stderr);
};
// deno-lint-ignore no-explicit-any
export const $s = (cmd: TemplateStringsArray | string, ...args: any[]) => {
  return execSyncWrapper(cmd, ...args).status;
};

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
