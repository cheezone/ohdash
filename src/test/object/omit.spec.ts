import { describe, it, expect } from "vitest";
import { omit } from "../../lib/object/omit";

describe("omit 函数测试", () => {
  it("应该从对象中省略指定的键", () => {
    const obj = { 姓名: "张三", 年龄: 25, 职业: "程序员" };
    const result = omit(obj, "年龄", "职业");
    // 预期结果应该只保留 姓名
    expect(result).toEqual({ 姓名: "张三" });
  });

  it("如果对象为 null，应该返回空对象", () => {
    const result = omit(null, "任意键");
    // 预期结果应该是空对象
    expect(result).toEqual({});
  });

  it("如果对象为 undefined，应该返回空对象", () => {
    const result = omit(undefined, "任意键");
    // 预期结果应该是空对象
    expect(result).toEqual({});
  });

  it("省略不存在的键，应该返回原对象", () => {
    const obj = { 城市: "北京", 天气: "晴" };
    const result = omit(obj, "不存在的键");
    // 预期结果应该和原对象一致
    expect(result).toEqual(obj);
  });

  it("可以省略多个键", () => {
    const obj = { 食物: "饺子", 饮料: "可乐", 颜色: "红色" };
    const result = omit(obj, "食物", "颜色");
    // 预期结果应该只保留 饮料
    expect(result).toEqual({ 饮料: "可乐" });
  });
});
