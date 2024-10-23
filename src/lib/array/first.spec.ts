import { describe, it, expect } from "vitest";
import { first, head } from "./first";
import _ from "lodash"; // 引入 lodash 进行对比测试

describe("first function", () => {
  it("应该获取数组的第一个元素", () => {
    const array = [10, 20, 30];

    const result = first(array);
    const lodashResult = _.first(array);

    expect(result).toBe(lodashResult);
    expect(result).toBe(10);
  });

  it("应该获取数组的前两个元素", () => {
    const array = [10, 20, 30];

    const result = first(array, 2);
    const lodashResult = _.take(array, 2); // lodash `first` 不支持第二个参数，用 `take` 实现

    expect(result).toEqual(lodashResult);
    expect(result).toEqual([10, 20]);
  });

  it("应该通过回调函数过滤数组元素", () => {
    const array = [10, 20, 30];

    const result = first(array, (value) => value < 30);
    const lodashResult = _.takeWhile(array, (value) => value < 30); // lodash 的 `takeWhile`

    expect(result).toEqual(lodashResult);
    expect(result).toEqual([10, 20]);
  });

  it("应该支持元组并获取元组的第一个元素", () => {
    const tuple = [1, 2, 3] as const;

    const result = first(tuple);
    const lodashResult = _.first(tuple);

    expect(result).toBe(lodashResult);
    expect(result).toBe(1);
  });

  it("应该支持只读数组并获取第一个元素", () => {
    const readonlyArray: readonly number[] = [5, 10, 15];

    const result = first(readonlyArray);
    const lodashResult = _.first(readonlyArray);

    expect(result).toBe(lodashResult);
    expect(result).toBe(5);
  });
});

describe("head function", () => {
  it("head 函数应与 first 函数行为一致", () => {
    const array = [100, 200, 300];

    const result1 = first(array);
    const result2 = head(array);
    const lodashResult = _.head(array); // lodash `head` 是 `first` 的别名

    expect(result1).toBe(result2);
    expect(result1).toBe(lodashResult);
    expect(result1).toBe(100);
  });
});

describe("first function", () => {
  it("空数组返回 undefined", () => {
    const result = first();
    expect(result).toBeUndefined();
  });

  it("应该获取数组的第一个元素", () => {
    const array = [10, 20, 30] as const;
    const result = first(array);
    expect(result).toBe(10);
  });

  it("应该获取数组的前一个元素", () => {
    const array = [10, 20, 30];
    const result = first(array, 1);
    expect(result).toEqual([10]);
  });

  it("应该获取数组的前两个元素", () => {
    const array = [10, 20, 30];
    const result = first(array, 2);
    expect(result).toEqual([10, 20]);
  });

  it("应该通过回调函数过滤数组元素", () => {
    const array = [10, 20, 30];
    const result = first(array, (value) => value < 30);
    expect(result).toEqual([10, 20]);
  });

  it("应该支持元组并获取元组的第一个元素", () => {
    const tuple = [1, 2, 3] as const;
    const result = first(tuple);
    expect(result).toBe(1);
  });

  it("应该支持只读数组并获取第一个元素", () => {
    const readonlyArray: readonly number[] = [5, 10, 15];
    const result = first(readonlyArray);
    expect(result).toBe(5);
  });
});

describe("head function", () => {
  it("head 函数应与 first 函数行为一致", () => {
    const array = [100, 200, 300];
    const result1 = first(array);
    const result2 = head(array);
    expect(result1).toBe(result2);
  });
});
