import { describe, it, expect } from "vitest";
import { compact } from "../../lib/array/compact";

describe("compact 删除虚假值的数组测试", () => {
  it("应删除数组中的所有虚假值", () => {
    const result = compact([0, 1, false, 2, "", 3, null, undefined, NaN]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("应保留非虚假值", () => {
    const result = compact([0, "北京", false, "上海", "", "广州"]);
    expect(result).toEqual(["北京", "上海", "广州"]);
  });

  it("应处理包含不同类型元素的数组", () => {
    const result = compact([0, 42, false, "深圳", "", true, {}, []]);
    expect(result).toEqual([42, "深圳", true, {}, []]);
  });
});
