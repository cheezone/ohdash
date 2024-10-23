/**
 * 获取对象的键值对数组，类型安全
 *
 * @description 返回给定对象的所有可枚举自身属性的键值对数组，确保键和值的字面量类型。
 * @example
 * const fruit = { apple: 1 as const, banana: 2 as const };
 * const result = entries(fruit);
 * // => [['apple', 1], ['banana', 2]]
 *
 * @template T 输入对象的类型
 * @param obj 目标对象
 * @returns 对象的键值对数组
 */
export function entries<T extends Record<string, unknown>>(
  obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][] {
  return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
}

// 中文别名导出
export { entries as 键值对 };
