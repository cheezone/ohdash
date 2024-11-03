import { describe, it, expect } from "vitest";
import { merge, toMerged } from "./merge";

// FIX: 类型错误

describe("单元测试：merge 函数", () => {
  it("应合并嵌套对象", () => {
    const result = merge(
      { 兔子: 1 },
      { 乌龟: 2 },
      { 青蛙: 3, 鳄鱼: { 鳄: 4 } }
    );
    // 预期结果应为 { 兔子: 1, 乌龟: 2, 青蛙: 3, 鳄鱼: { 鳄: 4 } }
    expect(result).toEqual({ 兔子: 1, 乌龟: 2, 青蛙: 3, 鳄鱼: { 鳄: 4 } });
  });

  it("应覆盖数组类型", () => {
    const result = merge(
      { 蔬菜: ["西红柿", "黄瓜"] },
      { 蔬菜: ["辣椒", "土豆"] }
    );
    // 预期结果应为 { 蔬菜: ['辣椒', '土豆'] }
    expect(result).toEqual({ 蔬菜: ["辣椒", "土豆"] });
  });

  it("应覆盖不同类型的值", () => {
    const result = merge({ 水果: 1 }, { 水果: "是" });
    // 预期结果应为 { 水果: "是" }
    expect(result).toEqual({ 水果: "是" });
  });

  it("应合并多个对象", () => {
    const result = merge(
      { 星星: 1, 月亮: { 太阳: 2 } },
      { 月亮: { 行星: 3 }, 地球: 4 }
    );
    // 预期结果应为 { 星星: 1, 月亮: { 太阳: 2, 行星: 3 }, 地球: 4 }
    expect(result).toEqual({ 星星: 1, 月亮: { 太阳: 2, 行星: 3 }, 地球: 4 });
  });

  it("toMerged 应返回新对象而不修改原对象", () => {
    const target = { 姓名: "张三", 年龄: 30 };
    const result = toMerged(target, { 性别: "男" });

    expect(result).toEqual({ 姓名: "张三", 年龄: 30, 性别: "男" });
    expect(target).toEqual({ 姓名: "张三", 年龄: 30 }); // 原对象未改变
  });

  it("merge 应修改目标对象", () => {
    const target = { 姓名: "张三", 年龄: 30 };
    const result = merge(target, { 性别: "男" });

    expect(result).toEqual({ 姓名: "张三", 年龄: 30, 性别: "男" });
    expect(target).toEqual({ 姓名: "张三", 年龄: 30, 性别: "男" }); // 原对象已被改变
  });

  it("应处理 null 值", () => {
    const result = merge({ 苹果: 1 }, null);
    // 预期结果应为 { 苹果: 1 }
    expect(result).toEqual({ 苹果: 1 });
  });

  it("应处理 undefined 值", () => {
    const result = merge({ 橙子: 1 }, undefined);
    // 预期结果应为 { 橙子: 1 }
    expect(result).toEqual({ 橙子: 1 });
  });

  it("应处理空对象", () => {
    const result = merge({ 香蕉: 1 }, {});
    // 预期结果应为 { 香蕉: 1 }
    expect(result).toEqual({ 香蕉: 1 });
  });

  it("应合并多个空对象", () => {
    const result = merge({}, {}, {});
    // 预期结果应为 {}
    expect(result).toEqual({});
  });
});
