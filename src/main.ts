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
// deno-lint-ignore no-explicit-any
export const $e = (cmd: TemplateStringsArray | string, ...args: any[]) => {
  return new TextDecoder().decode(execSyncWrapper(cmd, ...args).stderr);
};
// deno-lint-ignore no-explicit-any
export const $s = (cmd: TemplateStringsArray | string, ...args: any[]) => {
  return execSyncWrapper(cmd, ...args).status;
};
