/**
 * 获取对象的键
 * @description 返回对象或数组的所有键名，若为 null 或 undefined 返回空数组。
 * @param target 目标对象或数组。
 * @returns 键名数组。
 * @example
 * keys({ 苹果: 1, 梨: 2 }); // ['苹果', '梨']
 * keys([1, 2, 3]); // ['0', '1', '2']
 */
export function keys<T extends object>(target: T): Array<keyof T>;
export function keys(target: null | undefined): [];
export function keys<T extends object>(
  target: T | null | undefined
): Array<keyof T> | [] {
  if (target == null) return [];
  return Object.keys(target) as Array<keyof T>;
}

// 中文别名导出
export { keys as 键名 };
