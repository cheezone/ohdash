import type { Falsy } from "../types/types";

/**
 * 删除数组中的所有虚假值（Falsy values）。
 *
 * @description
 * 虚假值包括 `false`、`null`、`0`、`""`（空字符串）、`undefined` 和 `NaN`。
 *
 * @param array 待处理的数组
 * @returns 返回一个新的数组，所有虚假值已被移除
 * @template T 元素类型
 *
 * @example
 * // 示例：去除数组中的虚假值
 * const result = compact([0, 1, false, 2, '', 3, null, undefined, NaN]);
 * // => [1, 2, 3]
 *
 * // 示例：去除包含复杂数据类型的数组中的虚假值
 * const result = compact([0, '北京', false, '上海', '', '广州']);
 * // => ['北京', '上海', '广州']
 */
export function compact<T>(array: T[] | readonly T[]): Exclude<T, Falsy>[] {
  return array.filter(Boolean) as Exclude<T, Falsy>[];
}
export { compact as 去空 };
