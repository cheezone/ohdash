/**
 * 模拟 Python 的 for-else 结构
 * @description 如果在循环中满足条件则退出，不满足则执行 else 逻辑
 * @param array 需要迭代的数组
 * @param forCallback 循环体回调函数，返回 true 表示满足条件，退出循环
 * @param elseCallback 当未满足条件时执行的 else 回调函数
 * @returns void
 */
export function forElse<T>(
  array: T[],
  forCallback: (item: T, index: number, array: T[]) => boolean | void,
  elseCallback: () => void
): void {
  let found = false;

  for (let i = 0; i < array.length; i++) {
    if (forCallback(array[i], i, array)) {
      found = true;
      break; // 满足条件，退出循环
    }
  }

  if (!found) {
    elseCallback(); // 如果没有找到，执行 else 逻辑
  }
}
