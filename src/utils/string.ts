declare global {
  interface String {
    pathExists(): boolean;
    splitWhiteSpace(): string[];
    lines(): string[];
  }
}

String.prototype.pathExists = function () {
  try {
    Deno.statSync(this.toString());
    return true;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
};

String.prototype.splitWhiteSpace = function () {
  return this.toString().split(/\s+/);
};

String.prototype.lines = function () {
  return this.toString().split("\n");
};
