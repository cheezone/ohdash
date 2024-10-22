/**
 * 获取数组的第一个元素。
 *
 * @description
 * 如果不提供其他参数，则默认返回数组的第一个元素。
 *
 * @example
 * // 获取第一个元素
 * first([1, 2, 3]);
 * // => 1
 *
 * @param array 要操作的数组
 * @returns 返回数组的第一个元素，或者 `undefined` 如果数组为空。
 */
export function first<T>(array: T[]): T | undefined;

export function first<T extends readonly unknown[]>(array: T): T[0];

/**
 * 获取空数组的第一个元素。
 *
 * @deprecated 此方法其实没有太大用途，因为空数组没有元素可以获取。
 * @returns 返回 `undefined`，因为空数组没有第一个元素。
 */
export function first(): undefined;

/**
 * 获取数组的前 n 个元素。
 *
 * @description
 * 如果提供了 `n` 参数，则返回数组前 `n` 个元素。
 *
 * @example
 * // 获取前两个元素
 * first([1, 2, 3], 2);
 * // => [1, 2]
 *
 * @param array 要操作的数组
 * @param n 要获取的元素个数
 * @returns 返回数组前 `n` 个元素，或者 `undefined` 如果数组为空。
 */
export function first<T>(array: T[], n: number): T[];

/**
 * 根据回调函数获取数组的元素。
 *
 * @description
 * 如果提供了回调函数，将返回满足回调条件的数组元素，回调函数会依次作用于数组的每个元素，直到返回 `false` 为止。
 *
 * @example
 * // 通过回调获取元素
 * first([1, 2, 3], (value) => value < 3);
 * // => [1, 2]
 *
 * @param array 要操作的数组
 * @param callback 处理每个元素的回调函数
 * @returns 返回满足条件的元素数组。
 */
export function first<T>(
  array: T[],
  callback: (value: T, index: number, array: T[] | readonly T[]) => boolean
): T[];

/**
 * 获取数组的第一个元素或前 n 个元素，或通过回调函数获取满足条件的元素。
 *
 * @description
 * 此重载可以根据传入的参数不同，灵活返回不同结果。如果 `nOrCallback` 是数字，则返回数组前 `n` 个元素；
 * 如果 `nOrCallback` 是回调函数，则返回满足条件的元素。
 *
 * @param array 要操作的数组
 * @param nOrCallback 要获取的元素个数或处理每个元素的回调函数（可选）
 * @returns 返回第一个元素，或前 `n` 个元素，或满足回调函数的元素数组。
 */
export function first<T>(
  array?: T[] | readonly T[],
  nOrCallback?:
    | number
    | ((value: T, index: number, array: T[] | readonly T[]) => boolean)
): T[] | T | undefined {
  if (!array) {
    return;
  }

  if (typeof nOrCallback === "function") {
    return array.filter(nOrCallback);
  }

  if (typeof nOrCallback === "number") {
    return array.slice(0, nOrCallback);
  }

  return array[0];
}

/**
 * @see first
 * @alias head
 */
export { first as head };

/**
 * @see first
 * @alias 第一个
 */
export { first as 第一个 };
