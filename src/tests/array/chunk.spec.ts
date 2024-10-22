import { describe, it, expect } from "vitest";
import { chunk } from "../../lib/array/chunk";

// 测试 chunk 函数
describe("chunk 函数测试", () => {
  it("切分为两个子数组，每个长度为 2", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], 2);
    expect(result).toEqual([
      ["甲", "乙"],
      ["丙", "丁"],
    ]);
  });

  it("切分为两个子数组，第一个长度为 3，第二个长度为 1", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], 3);
    expect(result).toEqual([["甲", "乙", "丙"], ["丁"]]);
  });

  it("切分空数组，返回空数组", () => {
    const result = chunk([], 2);
    expect(result).toEqual([]);
  });

  it("chunkSize 为 0，返回空数组", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], 0);
    expect(result).toEqual([]);
  });

  it("chunkSize 大于数组长度，返回单个子数组", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], 10);
    expect(result).toEqual([["甲", "乙", "丙", "丁"]]);
  });

  it("chunkSize 为负数，返回空数组", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], -1);
    expect(result).toEqual([]);
  });
});
