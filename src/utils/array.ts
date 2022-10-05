declare global {
  interface Array<T> {
    filterMap<E>(f: (x: T) => E | undefined): E[];
    parallelMap<U>(
      callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
      // deno-lint-ignore no-explicit-any
      thisArg?: any,
    ): Promise<U[]>;
  }
}

Array.prototype.parallelMap = async function <T, U>(
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
  // deno-lint-ignore no-explicit-any
  thisArg?: any,
): Promise<U[]> {
  const promises = [];
  for (let i = 0; i < this.length; i++) {
    promises.push(callbackfn.call(thisArg, this[i], i, this));
  }
  return await Promise.all(promises);
};

Array.prototype.filterMap = function <T, E>(f: (x: T) => E | undefined): E[] {
  return this.map(f).filter((x) => x) as E[];
};
