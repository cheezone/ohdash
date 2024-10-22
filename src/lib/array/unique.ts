/**
 * 数组去重。
 *
 * @example
 * unique([2, 1, 2])
 * // => [2, 1]
 *
 * const users = [
 *   { id: 1, name: '张三' },
 *   { id: 2, name: '李四' },
 *   { id: 2, name: '李四' }
 * ];
 *
 * // 根据对象相等性去重
 * unique(users, (a, b) => a.id === b.id)
 * // => [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
 *
 * @param array 需要去重的数组
 * @param compareFn 用于比较的函数，可选，默认为严格相等 `===`
 * @template TElement 数组元素的类型
 * @returns 返回去重后的新数组
 */
export function unique<TElement>(
  array: readonly TElement[],
  compareFn?: (a: TElement, b: TElement) => boolean
): TElement[] {
  if (!compareFn) {
    return [...new Set(array)];
  }

  const uniqueArray: TElement[] = [];

  for (const value of array) {
    if (!uniqueArray.some((existing) => compareFn(value, existing))) {
      uniqueArray.push(value);
    }
  }

  return uniqueArray;
}
export { unique as 去重 };
