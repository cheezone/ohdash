import { describe, it, expect } from "vitest";
import { unique } from "../../lib/array/unique";

describe("unique 函数", () => {
  it("应该正确去除重复的数字", () => {
    const numbers = [1, 2, 2, 3, 4, 4, 5];
    const result = unique(numbers);
    expect(result).toEqual([1, 2, 3, 4, 5]); // 去除重复数字
  });

  it("应该根据对象 id 去重", () => {
    const users = [
      { id: 1, name: "张三" },
      { id: 2, name: "李四" },
      { id: 2, name: "李四" },
    ];
    const result = unique(users, (a, b) => a.id === b.id);
    expect(result).toEqual([
      { id: 1, name: "张三" },
      { id: 2, name: "李四" },
    ]); // 根据 id 去重
  });

  it("应该返回空数组当输入为空数组时", () => {
    const emptyArray: number[] = [];
    const result = unique(emptyArray);
    expect(result).toEqual([]); // 空数组应该返回空数组
  });

  it("应该正确去除重复的字符串", () => {
    const words = ["苹果", "香蕉", "苹果", "橙子"];
    const result = unique(words);
    expect(result).toEqual(["苹果", "香蕉", "橙子"]); // 去除重复的字符串
  });

  it("应该支持自定义比较函数进行去重", () => {
    const objects = [
      { name: "张三", age: 20 },
      { name: "李四", age: 25 },
      { name: "张三", age: 20 },
    ];

    // 根据 name 去重
    const result = unique(objects, (a, b) => a.name === b.name);

    expect(result).toEqual([
      { name: "张三", age: 20 },
      { name: "李四", age: 25 },
    ]);
  });
});
