/**
 * 删除数组元素。
 *
 * @description 删除数组中符合条件的元素，并返回剩余元素。支持类型谓词或普通函数，修改原数组。
 *
 * @example
 * // 使用类型谓词函数
 * type 男 = { 性别: '男' };
 * type 女 = { 性别: '女' };
 * const 性别数组: (男 | 女)[] = [{ 性别: '男' }, { 性别: '女' }, { 性别: '男' }];
 * const 是男 = (item: 男 | 女): item is 男 => item.性别 === '男';
 * remove(性别数组, 是男);
 * // 性别数组 => [{ 性别: '女' }]
 *
 * // 使用普通函数
 * const 数字数组 = [1, 2, 3, 4];
 * remove(数字数组, n => n % 2 === 0);
 * // 数字数组 => [1, 3]
 *
 * @param array 需要操作的数组
 * @param predicate 用于删除的条件函数，可以是布尔函数或类型谓词函数
 * @template T 数组元素的类型
 * @returns 返回删除后的数组
 */
export function remove<T, S extends T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => value is S
): Exclude<T, S>[];

export function remove<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[];

export function remove<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  // 反向遍历数组，从后往前删除，以防止索引错位
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      // 删除符合条件的元素
      array.splice(i, 1);
    }
  }

  // 返回删除后的数组
  return array;
}
