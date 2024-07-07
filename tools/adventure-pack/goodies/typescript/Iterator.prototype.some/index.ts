import "../Iterator.prototype.toIterable";
import { iteratorPrototype } from "../Iterator.prototype";

declare global {
  interface Iterator<T> {
    some(
      this: Iterator<T>,
      callbackfn: (value: T, index: number) => unknown,
    ): boolean;
  }
}

iteratorPrototype.some ??= function <T>(
  this: Iterator<T>,
  callbackfn: (element: T, index: number) => unknown,
): boolean {
  let index = 0;
  for (const element of this.toIterable()) {
    if (callbackfn(element, index)) {
      return true;
    }
    ++index;
  }
  return false;
};
