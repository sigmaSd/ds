import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import {} from "./array.ts";

Deno.test("parallelMap", async () => {
  assertEquals(
    // deno-lint-ignore require-await
    await ["a", "b", "c"].parallelMap(async (e) => e + "1"),
    ["a1", "b1", "c1"],
  );
  assertEquals(
    // deno-lint-ignore require-await
    await [1, 2, 3].parallelMap(async function (this: number) {
      return this;
    }, 2),
    [2, 2, 2],
  );
});
