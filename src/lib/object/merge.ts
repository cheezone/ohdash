import {
  GenericObject,
  ArrayMinLength,
  MergeDeepObjects,
  PlainObject,
  isPlainObject,
} from "../types";

/**
 * 合并并返回新的对象。
 *
 * @description 此函数合并一个或多个源对象到目标对象的副本中。嵌套对象将被合并，其他类型将被覆盖。
 *
 * @example
 * // ---- 嵌套对象会被合并 ----
 * toMerged({ 姓名: "张三", 年龄: 30 }, { 性别: "男", 地址: { 城市: "北京" } })
 * // => { 姓名: "张三", 年龄: 30, 性别: "男", 地址: { 城市: "北京" } }
 *
 * // ---- 其他类型将被覆盖 ----
 * toMerged({ 爱好: ["读书"] }, { 爱好: ["运动"] })
 * // => { 爱好: ["运动"] }
 *
 * toMerged({ 年龄: 30 }, { 年龄: 25 })
 * // => { 年龄: 25 }
 *
 * @param target 目标对象
 * @param sources 源对象
 * @template TTarget 目标对象的类型
 * @template TSources 源对象的类型
 * @returns 一个新的合并后的对象
 */
export function toMerged<
  TTarget extends GenericObject,
  TSources extends ArrayMinLength<GenericObject | null | undefined, 1>
>(
  target: TTarget,
  ...sources: TSources
): MergeDeepObjects<[TTarget, ...TSources]> {
  // 基于 merge 函数创建目标对象的副本
  const targetCopy = { ...target };

  return merge(targetCopy, ...sources) as MergeDeepObjects<
    [TTarget, ...TSources]
  >;
}

/**
 * 合并多个对象到目标对象中。
 *
 * @description 此函数合并一个或多个源对象到目标对象中，嵌套对象将被合并，其他类型将被覆盖。
 *
 * @example
 * // ---- 嵌套对象会被合并 ----
 * merge({ 姓名: "张三", 年龄: 30 }, { 性别: "男", 地址: { 城市: "上海" } })
 * // => { 姓名: "张三", 年龄: 30, 性别: "男", 地址: { 城市: "上海" } }
 *
 * // ---- 其他类型将被覆盖 ----
 * merge({ 爱好: ["读书"] }, { 爱好: ["音乐"] })
 * // => { 爱好: ["音乐"] }
 *
 * merge({ 年龄: 30 }, { 年龄: 35 })
 * // => { 年龄: 35 }
 *
 * @param target 目标对象
 * @param sources 源对象
 * @template TTarget 目标对象的类型
 * @template TSources 源对象的类型
 * @returns 合并后的目标对象
 */
export function merge<
  TTarget extends GenericObject,
  TSources extends ArrayMinLength<GenericObject | null | undefined, 1>
>(
  target: TTarget,
  ...sources: TSources
): MergeDeepObjects<[TTarget, ...TSources]> {
  for (const source of sources) {
    // 如果源对象是 null 或 undefined，跳过合并
    if (source == null) {
      continue;
    }

    for (const [key, value] of Object.entries(source)) {
      (target as PlainObject)[key] =
        isPlainObject(value) && isPlainObject(target[key])
          ? merge(target[key], value)
          : value;
    }
  }
  return target as MergeDeepObjects<[TTarget, ...TSources]>;
}
