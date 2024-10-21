type Many<T> = T | readonly T[];

/**
 * 从对象中省略指定的键。
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['a', 'b']);
 * // => { c: 3 }
 *
 * @param object 要过滤的对象
 * @param paths 要从返回的对象中排除的键
 * @template TObj 对象的类型
 * @returns 不包含指定键的对象
 */

export function omit<T extends object, K extends keyof T>(
  object: T | null | undefined,
  ...paths: Array<Many<K>>
): Omit<T, K>;

export function omit<T extends object, K extends PropertyKey[]>(
  object: T | null | undefined,
  ...paths: K
): Pick<T, Exclude<keyof T, K[number]>>;

export function omit<T extends object>(
  object: T | null | undefined,
  ...paths: Array<Many<PropertyKey>>
): Partial<T>;

export function omit(object: any, ...paths: any[]): any {
  if (object == null) return {}; // 如果对象为空，返回空对象

  // 使用 reduce 遍历路径，构建新的对象
  return Object.keys(object).reduce((acc, key) => {
    if (!paths.includes(key)) {
      // 如果当前键不在要省略的路径中，添加到结果中
      acc[key] = object[key];
    }
    return acc; // 返回累积的结果对象
  }, {} as Record<string, any>);
}
