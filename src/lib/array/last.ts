/**
 * 获取数组中的最后一个元素
 * @description 返回数组中的最后一个元素。如果数组为空或为 null，则返回 `undefined`。
 * @example
 * // 返回最后一个水果
 * last(['苹果', '香蕉', '橙子'])
 * // => 橙子
 *
 * // 返回 undefined 因为数组为空
 * last([])
 * // => undefined
 *
 * @param array 需要获取最后一个元素的数组
 * @returns 数组中的最后一个元素，或者 `undefined`（如果数组为空或为 null）
 */
export function last<T>(array: null | undefined): undefined;
export function last<T>(array: readonly [T, ...T[]]): T;
export function last<T>(array: readonly T[]): T | undefined;
export function last<T>(array: readonly T[] | null | undefined): T | undefined {
  return array && array.length > 0 ? array[array.length - 1] : undefined;
}

// 别名导出
export { last as 最后 };
