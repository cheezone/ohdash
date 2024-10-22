import { describe, it, expect, expectTypeOf } from "vitest";
import { last, 最后 } from "../../lib/array/last";
import lodash from "lodash";

describe("last", () => {
  it("获取数组中的最后一个水果", () => {
    const fruits = ["苹果", "香蕉", "橙子"];
    expect(last(fruits)).toBe("橙子");
    expect(最后(fruits)).toBe("橙子"); // 测试别名
    expect(lodash.last(fruits)).toBe("橙子");
  });

  it("获取空数组中的最后一个元素，返回 undefined", () => {
    const emptyArray: string[] = [];
    expect(last(emptyArray)).toBe(undefined);
    expect(最后(emptyArray)).toBe(undefined);
    expect(lodash.last(emptyArray)).toBe(undefined);
  });

  it("获取数字数组中的最后一个数字", () => {
    const numbers = [10, 20, 30];
    expect(last(numbers)).toBe(30);
    expect(最后(numbers)).toBe(30);
    expect(lodash.last(numbers)).toBe(30);
  });

  it("类型测试", () => {
    const fruits = ["苹果", "香蕉", "橙子"] as const;
    expectTypeOf(last(fruits)).toEqualTypeOf<"苹果" | "香蕉" | "橙子">();
    expectTypeOf(最后(fruits)).toEqualTypeOf<"苹果" | "香蕉" | "橙子">();

    const emptyArray = [] as [];
    expectTypeOf(last(emptyArray)).toBeUndefined();
    expectTypeOf(最后(emptyArray)).toBeUndefined();
  });
});
