declare global {
  interface Object {
    // deno-lint-ignore no-explicit-any
    pipe<U>(fn: (a: any) => U): U;
  }
}

Object.prototype.pipe = function <U>(fn: (a: typeof this) => U) {
  return fn(this);
};
