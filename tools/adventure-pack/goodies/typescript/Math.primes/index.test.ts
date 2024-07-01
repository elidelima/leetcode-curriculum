import { describe, expect, it } from "@jest/globals";

import "./index";

describe("Math.primes", () => {
  it("generates primes", () => {
    const primes = Math.primes();

    [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59].forEach(
      (p) => {
        expect(primes.next().value).toBe(p);
      },
    );
  });
});
