/**
 * 匹配任何 [原始值](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)。
 *
 */
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type LiteralStringUnion<T> = LiteralUnion<T, string>;

/**
 * 允许通过组合原始类型和字面量类型来创建一个联合类型，而不牺牲 IDE 中字面量类型部分的自动补全功能。
 *
 * 目前，当原始类型的联合类型与字面量类型结合时，TypeScript 会丢失所有关于组合字面量的信息。因此，当在具有自动补全功能的 IDE 中使用此类类型时，已声明的字面量不会提供任何建议。
 *
 * 此类型是对 [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729) 的变通解决方案。一旦不再需要，它将被移除。
 *
 * @example
 * ```
 * import type {LiteralUnion} from 'type-fest';
 *
 * // 之前
 *
 * type Pet = 'dog' | 'cat' | string;
 *
 * const pet: Pet = '';
 * // 在你的 TypeScript 启用的 IDE 中开始输入。
 * // 你 **不会** 获得 `dog` 和 `cat` 字面量的自动补全。
 *
 * // 之后
 *
 * type Pet2 = LiteralUnion<'dog' | 'cat', string>;
 *
 * const pet: Pet2 = '';
 * // 你 **会** 获得 `dog` 和 `cat` 字面量的自动补全。
 * ```
 *
 */
export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);

/**
 * 表示一个通用对象类型，键为任意属性，值为任意类型。
 */
export type GenericObject = Record<PropertyKey, any>;

/**
 * 创建一个具有最小长度的数组类型。
 *
 * @typeParam TElement - 数组中元素的类型。
 * @typeParam TMinLength - 数组的最小长度。
 */
export type ArrayMinLength<
  TElement,
  TMinLength extends number
> = BuildArrayMinLength<TElement, TMinLength, []>;

/**
 * 构建一个具有最小长度的数组类型的递归类型定义。
 *
 * @typeParam TElement - 数组中元素的类型。
 * @typeParam TMinLength - 数组的最小长度。
 * @typeParam Current - 当前构建的数组，默认为空数组。
 */
type BuildArrayMinLength<
  TElement,
  TMinLength extends number,
  Current extends TElement[]
> = Current["length"] extends TMinLength
  ? [...Current, ...TElement[]]
  : BuildArrayMinLength<TElement, TMinLength, [...Current, TElement]>;

/**
 * 表示一个普通对象类型，键为任意属性，值为未知类型。
 */
export type PlainObject = Record<PropertyKey, unknown>;

/**
 * 获取对象中可选属性的名称。
 *
 * @typeParam T - 目标对象的类型。
 */
export type OptionalPropertyNames<T> = {
  [K in keyof T]-?: PlainObject extends { [P in K]: T[K] } ? K : never;
}[keyof T];

/**
 * 组合两个对象的属性。
 *
 * @typeParam L - 第一个对象的类型。
 * @typeParam R - 第二个对象的类型。
 * @typeParam K - 两个对象中都有的键的类型。
 */
export type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

/**
 * 表示一个类型的标识。
 *
 * @typeParam T - 需要推断的类型。
 */
type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * 组合两个对象的属性，处理重叠和可选属性。
 *
 * @typeParam L - 第一个对象的类型。
 * @typeParam R - 第二个对象的类型。
 */
export type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

/**
 * 合并多个对象的类型，支持深度合并。
 *
 * @typeParam A - 包含多个对象类型的元组。
 */
export type MergeDeepObjects<A extends readonly [...unknown[]]> = A extends [
  infer L,
  ...infer R
]
  ? SpreadTwo<L, MergeDeepObjects<R>>
  : unknown;

/**
 * 假值。
 *
 * @description 包括：`false`, `0`, `''`, `null`, `undefined`, `NaN`
 */
export type Falsy = false | 0 | "" | null | undefined | typeof NaN;

export interface List<T> {
  [index: number]: T;
  length: number;
}
