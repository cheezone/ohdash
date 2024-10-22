import { describe, it, expect } from "vitest";
import { entities } from "../../lib/object/entities";
import { expectTypeOf } from "vitest";

/**
 * entities 测试
 */
describe("entities", () => {
  it("应正确返回对象的键值对数组", () => {
    const 水果 = { 苹果: 1 as const, 香蕉: 2 as const };
    const result = entities(水果);

    expect(result).toEqual([
      ["苹果", 1],
      ["香蕉", 2],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<(["苹果", 1] | ["香蕉", 2])[]>();
  });

  it("应处理空对象", () => {
    const 空对象 = {};
    const result = entities(空对象);

    expect(result).toEqual([]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<never[]>();
  });

  it("应处理对象中的字符串值", () => {
    const 人物 = { 姓名: "张三", 年龄: 30 };
    const result = entities(人物);

    expect(result).toEqual([
      ["姓名", "张三"],
      ["年龄", 30],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<
      (["姓名", string] | ["年龄", number])[]
    >();
  });

  it("应处理只读对象", () => {
    const 只读对象 = { 猫: "喵", 狗: "汪" } as const;
    const result = entities(只读对象);

    expect(result).toEqual([
      ["猫", "喵"],
      ["狗", "汪"],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<(["猫", "喵"] | ["狗", "汪"])[]>();
  });

  it("应处理对象中的布尔值", () => {
    const 布尔对象 = { 正确: true, 错误: false };
    const result = entities(布尔对象);

    expect(result).toEqual([
      ["正确", true],
      ["错误", false],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<
      (["正确", boolean] | ["错误", boolean])[]
    >();

    expectTypeOf(result).toMatchTypeOf<[string, boolean][]>();
  });

  it("应处理混合类型对象", () => {
    const 混合对象 = { 数量: 10, 激活: true, 姓名: "小明" };
    const result = entities(混合对象);

    expect(result).toEqual([
      ["数量", 10],
      ["激活", true],
      ["姓名", "小明"],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<
      (["数量", number] | ["激活", boolean] | ["姓名", string])[]
    >();
  });
});
