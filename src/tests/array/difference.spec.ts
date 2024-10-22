import { describe, it, expect } from "vitest";
import {
  differenceBy,
  difference,
  differenceWith,
} from "../../lib/array/difference";

describe("differenceBy 根据函数比较返回不同的元素", () => {
  it("根据 Math.floor 比较返回不同的元素", () => {
    const result = differenceBy(
      [1.1, 1.2, 2.1, 2.2, 3.3, 4, 5],
      [1.4, 2.3, 3.2],
      Math.floor
    );
    expect(result).toEqual([4, 5]);
  });

  it("根据自定义函数处理复杂数组", () => {
    const result = differenceBy(
      ["北京", "上海", "哈尔滨"],
      ["深圳"],
      (str) => str.length
    );
    expect(result).toEqual(["哈尔滨"]);
  });
});

describe("difference 直接比较数组中不同的元素", () => {
  it("比较多个数组返回不同的元素", () => {
    const result = difference([1, 2, 3, 4, 5], [1, 3], [2, 4]);
    expect(result).toEqual([5]);
  });

  it("比较字符数组", () => {
    const result = difference(["北京", "上海", "广州"], ["广州"]);
    expect(result).toEqual(["北京", "上海"]);
  });
});

describe("differenceWith 通过自定义比较器函数处理对象数组", () => {
  it("比较对象数组返回不同的对象", () => {
    const array = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const values = [{ x: 2, y: 1 }];
    const result = differenceWith(
      array,
      values,
      (a, b) => a.x === b.x && a.y === b.y
    );
    expect(result).toEqual([{ x: 1, y: 2 }]);
  });

  it("自定义比较函数处理对象数组", () => {
    const array = [
      { x: 3, y: "广州" },
      { x: 5, y: "北京" },
    ];
    const values = [{ x: 3, y: "广州" }];
    const result = differenceWith(
      array,
      values,
      (a, b) => a.x === b.x && a.y === b.y
    );
    expect(result).toEqual([{ x: 5, y: "北京" }]);
  });
});
