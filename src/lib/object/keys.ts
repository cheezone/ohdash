import type { LiteralStringUnion, PlainObject } from "../types/types";

/**
 * 获取对象的键
 * @description 返回对象或数组的所有键名，若为 null 或 undefined 返回空数组。
 * @param target 目标对象或数组。
 * @returns 键名数组。
 * @example
 * keys({ 苹果: 1, 梨: 2 }); // ['苹果', '梨']
 * keys([1, 2, 3]); // ['0', '1', '2']
 */
export function keys(target: null | undefined): [];
export function keys<Target extends Array<unknown>>(target: Target): string[];
export function keys<Target extends PlainObject>(
  target: Target
): Array<LiteralStringUnion<`${Exclude<keyof Target, symbol>}`>>;
export function keys(target: object): string[];
export function keys(target?: any): string[] {
  if (target == null) return [];

  // 如果是数组，返回所有索引作为字符串
  if (Array.isArray(target)) {
    return Array.from({ length: target.length }, (_, index) => String(index));
  }

  return Object.keys(target);
}

// 中文别名导出
export { keys as 键名 };
