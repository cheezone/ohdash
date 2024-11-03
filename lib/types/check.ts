import { PlainObject } from "./types";

export function isPlainObject(value: unknown): value is PlainObject {
  return value?.constructor === Object;
}
