/**
 * 根据指定属性进行数组去重。
 *
 * @example
 * uniqueBy([{ id: 1, name: '张三' }, { id: 2, name: '李四' }, { id: 1, name: '王五' }], element => element.id)
 * // => [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
 *
 * @param array 需要去重的数组
 * @param iteratee 用于提取属性的函数
 * @template TElement 数组元素的类型
 * @returns 返回去重后的新数组
 */
export function uniqueBy<TElement>(
  array: readonly TElement[],
  iteratee: (element: TElement) => unknown
): TElement[] {
  const seen = new Set(); // 存储已有的值
  const uniqueArray: TElement[] = []; // 去重后的数组

  for (const element of array) {
    const key = iteratee(element); // 根据 iteratee 函数提取键
    if (!seen.has(key)) {
      seen.add(key); // 记录该键
      uniqueArray.push(element); // 添加到结果数组
    }
  }

  return uniqueArray; // 返回去重后的数组
}
