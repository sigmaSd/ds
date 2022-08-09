declare global {
  interface Array<T> {
    filterMap<E>(f: (x: T) => E | undefined): E[];
  }
}
Array.prototype.filterMap = function <T, E>(f: (x: T) => E | undefined): E[] {
  return this.map(f).filter((x) => x) as E[];
};
