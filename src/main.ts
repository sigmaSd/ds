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
// deno-lint-ignore no-explicit-any
export const $o = (cmd: TemplateStringsArray, ...args: any[]) => {
  return new TextDecoder().decode(execSync(quote(cmd, ...args)).stdout);
};
// deno-lint-ignore no-explicit-any
export const $e = (cmd: TemplateStringsArray, ...args: any[]) => {
  return new TextDecoder().decode(execSync(quote(cmd, ...args)).stderr);
};
// deno-lint-ignore no-explicit-any
export const $s = (cmd: TemplateStringsArray, ...args: any[]) => {
  return execSync(quote(cmd, ...args)).status;
};
