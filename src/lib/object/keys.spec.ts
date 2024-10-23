import { describe, it } from "vitest";
import { keys } from "./keys";
import lodash from "lodash";

describe("keys 函数测试", () => {
  // 功能测试
  describe("功能测试", () => {
    it("应该返回对象的所有键", ({ expect }) => {
      const obj = { 苹果: 1, 李子: 2 };
      expect(keys(obj)).toEqual(["苹果", "李子"]);
    });

    it("应该返回数组的索引作为键", ({ expect }) => {
      const arr = ["苹果", "李子", "梨"];
      expect(keys(arr)).toEqual(["0", "1", "2"]);
    });

    it("应该处理 null 和 undefined", ({ expect }) => {
      expect(keys(null)).toEqual([]);
      expect(keys(undefined)).toEqual([]);
    });
  });

  // 一致性测试
  describe("与 lodash 一致性测试", () => {
    it("应该与 lodash 的行为保持一致", ({ expect }) => {
      const obj = { 苹果: 1, 梨: 2 };
      expect(keys(obj)).toEqual(lodash.keys(obj));

      const arr = ["苹果", "李子", "梨"];
      expect(keys(arr)).toEqual(lodash.keys(arr));
    });
  });

  // 并发测试
  describe.concurrent("并发测试", () => {
    it.concurrent("对象的键名测试", async ({ expect }) => {
      const obj = { 苹果: 1, 李子: 2 };
      expect(keys(obj)).toEqual(["苹果", "李子"]);
    });

    it.concurrent("数组的键名测试", async ({ expect }) => {
      const arr = ["苹果", "李子", "梨"];
      expect(keys(arr)).toEqual(["0", "1", "2"]);
    });

    it.concurrent("处理 null 和 undefined", async ({ expect }) => {
      expect(keys(null)).toEqual([]);
      expect(keys(undefined)).toEqual([]);
    });
  });
});
