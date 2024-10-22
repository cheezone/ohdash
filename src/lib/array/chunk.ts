/**
 * 切分数组。
 *
 * @description 将数组按照指定长度切分为多个子数组。如果数组不能被均匀切分，最后一个子数组将包含剩余的元素。
 *
 * @example
 * chunk(['甲', '乙', '丙', '丁'], 2)
 * // => [['甲', '乙'], ['丙', '丁']]
 *
 * chunk(['甲', '乙', '丙', '丁'], 3)
 * // => [['甲', '乙', '丙'], ['丁']]
 *
 * @param chunkSize 每个子数组的长度
 * @param array 要切分的数组
 * @template TElement 数组元素的类型
 * @returns 返回切分后的新数组
 */
export function chunk<TElement>(
  array: readonly TElement[],
  chunkSize: number
): TElement[][] {
  // 把 chunkSize 取整
  const size = Math.trunc(chunkSize);

  // 如果数组为空或 chunkSize 小于 1，则返回空数组
  if (array.length === 0 || size < 1) return [];

  // 初始化结果数组
  const result: TElement[][] = [];

  // 遍历数组，按照 chunkSize 分割数组
  for (let i = 0; i < array.length; i += size) {
    // 使用 slice 方法获取子数组，并添加到结果数组中
    result.push(array.slice(i, i + size));
  }

  // 返回分割后的数组
  return result;
}

export { chunk as 分块 };
