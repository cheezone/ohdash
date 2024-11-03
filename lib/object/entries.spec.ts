// import { entries as lodashEntries } from "lodash";
import { describe, expect, expectTypeOf, it } from "vitest";
import { entries } from "./entries";

/**
 * entries 测试
 */
describe("entries", () => {
  it("应正确返回对象的键值对数组", () => {
    const 水果 = { 苹果: 1 as const, 香蕉: 2 as const };
    const result = entries(水果);

    expect(result).toEqual([
      ["苹果", 1],
      ["香蕉", 2],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<(["苹果", 1] | ["香蕉", 2])[]>();
  });

  it("应处理空对象", () => {
    const 空对象 = {};
    const result = entries(空对象);

    expect(result).toEqual([]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<never[]>();
  });

  it("应处理对象中的字符串值", () => {
    const 人物 = { 姓名: "张三", 年龄: 30 };
    const result = entries(人物);

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
    const result = entries(只读对象);

    expect(result).toEqual([
      ["猫", "喵"],
      ["狗", "汪"],
    ]);

    // 类型测试
    expectTypeOf(result).toEqualTypeOf<(["猫", "喵"] | ["狗", "汪"])[]>();
  });

  it("应处理对象中的布尔值", () => {
    const 布尔对象 = { 正确: true, 错误: false };
    const result = entries(布尔对象);

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
    const result = entries(混合对象);

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

  it("应处理嵌套对象", () => {
    const 嵌套对象 = {
      用户信息: { 姓名: "李四", 年龄: 25 },
      地址: { 省份: "广东", 城市: "广州" },
    };
    const result = entries(嵌套对象);

    expect(result).toEqual([
      ["用户信息", { 姓名: "李四", 年龄: 25 }],
      ["地址", { 省份: "广东", 城市: "广州" }],
    ]);
  });

  it("应处理数组", () => {
    const 数组对象 = {
      爱好: ["编程", "阅读", "运动"],
      成绩: [90, 85, 92],
    };
    const result = entries(数组对象);

    expect(result).toEqual([
      ["爱好", ["编程", "阅读", "运动"]],
      ["成绩", [90, 85, 92]],
    ]);
  });

  it("应处理函数", () => {
    const 函数对象 = {
      打招呼: () => "Hello",
      计算面积: (length: number, width: number) => length * width,
    };
    const result = entries(函数对象);

    // 函数值的具体表示可能因环境而异，这里只验证键名
    expect(result.map(([key]) => key)).toEqual(["打招呼", "计算面积"]);
  });

  it("不应处理 Symbol", () => {
    const symbolKey = Symbol("mySymbol");
    const symbolObject = { [symbolKey]: "symbolValue" };
    const result = entries(symbolObject);

    expect(result).toEqual([]);
  });

  it("应处理 null 和 undefined", () => {
    const nullUndefinedObject = {
      name: null,
      age: undefined,
    };
    const result = entries(nullUndefinedObject);

    expect(result).toEqual([
      ["name", null],
      ["age", undefined],
    ]);
  });
});
