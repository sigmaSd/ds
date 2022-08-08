declare global {
  interface Object {
    // deno-lint-ignore no-explicit-any
    p<U>(fn: (a: any) => U): U;
  }
}

Object.prototype.p = function <U>(fn: (a: typeof this) => U) {
  return fn(typeof this);
};
