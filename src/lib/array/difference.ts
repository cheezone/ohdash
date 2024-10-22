/**
 * 根据提供的函数，返回第一个数组中与其他数组的不同元素。
 *
 * @description
 * 通过自定义函数进行比较，返回第一个数组中不同于其他数组的元素。适合处理复杂数据类型的比较。
 *
 * @param array 需要处理的第一个数组
 * @param values 需要比较的数组
 * @param iteratee 比较函数，通常用于处理复杂数据类型
 * @returns 返回过滤后的数组，包含与其他数组不同的元素
 * @template T 数组元素的类型
 *
 * @example
 * // 示例：根据 Math.floor 函数比较
 * const result = differenceBy([1.1, 1.2, 2.1, 2.2, 3.3, 4, 5], [1.4, 2.3, 3.2], Math.floor);
 * // => [4, 5]
 */
export function differenceBy<T>(
  array: T[],
  values: T[],
  iteratee: (value: T) => unknown
): T[] {
  const transformedValues = values.map(iteratee);
  return array.filter((item) => !transformedValues.includes(iteratee(item)));
}

/**
 * 返回第一个数组与其他数组中不同的元素。
 *
 * @description
 * 直接比较值，返回第一个数组中不同于其他数组的元素。
 *
 * @param array 需要处理的第一个数组
 * @param values 需要比较的数组（可以有多个）
 * @returns 返回过滤后的数组，包含与其他数组不同的元素
 * @template T 数组元素的类型
 *
 * @example
 * // 示例：比较多个数组
 * const result = difference([1, 2, 3, 4, 5], [1, 3], [2, 4]);
 * // => [5]
 */
export function difference<T>(array: T[], ...values: T[][]): T[] {
  const allValues = values.flat();
  return array.filter((item) => !allValues.includes(item));
}

export { difference as 不同 };

/**
 * 通过自定义比较函数返回第一个数组中与其他数组的不同元素。
 *
 * @description
 * 接受一个比较器函数，返回第一个数组中不同于其他数组的元素，适合用于对象的深度比较。
 *
 * @param array 需要处理的第一个数组
 * @param values 需要比较的数组
 * @param comparator 自定义比较器函数，用于比较两个元素是否相等
 * @returns 返回过滤后的数组，包含与其他数组不同的元素
 * @template T 数组元素的类型
 *
 * @example
 * // 示例：比较对象数组
 * const result = differenceWith(
 *   [{ x: 1, y: 2 }, { x: 2, y: 1 }],
 *   [{ x: 2, y: 1 }],
 *   (a, b) => a.x === b.x && a.y === b.y
 * );
 * // => [{ x: 1, y: 2 }]
 */
export function differenceWith<T>(
  array: T[],
  values: T[],
  comparator: (a: T, b: T) => boolean
): T[] {
  return array.filter(
    (item) => !values.some((value) => comparator(item, value))
  );
}
