import { describe, it, expect } from "vitest";
import { chunk } from "../dist";

describe("E2E 测试：chunk 函数", () => {
  it("应将数组分块为指定大小的子数组", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], 2);
    // 预期结果应为 [['甲', '乙'], ['丙', '丁']]
    expect(result).toEqual([
      ["甲", "乙"],
      ["丙", "丁"],
    ]);
  });

  it("应返回最后一个子数组包含剩余元素", () => {
    const result = chunk(["甲", "乙", "丙", "丁"], 3);
    // 预期结果应为 [['甲', '乙', '丙'], ['丁']]
    expect(result).toEqual([["甲", "乙", "丙"], ["丁"]]);
  });

  it("当数组为空时，应返回空数组", () => {
    const result = chunk([], 2);
    // 预期结果应为 []
    expect(result).toEqual([]);
  });

  it("当切块大小小于 1 时，应返回空数组", () => {
    const result = chunk(["甲", "乙"], 0);
    // 预期结果应为 []
    expect(result).toEqual([]);
  });

  it("应正常处理包含非字符串元素的数组", () => {
    const result = chunk([1, 2, 3, 4], 2);
    // 预期结果应为 [[1, 2], [3, 4]]
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
