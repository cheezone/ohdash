import { describe, it, expect } from "vitest";
import { uniqueBy } from "../../lib/array/uniqueBy";

describe("uniqueBy 函数", () => {
  it("应该根据 id 去重对象数组", () => {
    const data = [
      { id: 1, name: "张三" },
      { id: 2, name: "李四" },
      { id: 1, name: "王五" },
    ];

    const result = uniqueBy(data, (element) => element.id);

    // 根据 id 去重
    expect(result).toEqual([
      { id: 1, name: "张三" },
      { id: 2, name: "李四" },
    ]);
  });

  it("应该返回空数组当输入为空数组时", () => {
    const emptyArray: { id: number; name: string }[] = [];
    const result = uniqueBy(emptyArray, (element) => element.id);

    // 空数组应该返回空数组
    expect(result).toEqual([]);
  });

  it("应该正确去重具有相同属性值的对象", () => {
    const users = [
      { id: 1, name: "张三" },
      { id: 1, name: "李四" },
      { id: 2, name: "张三" },
    ];

    const result = uniqueBy(users, (element) => element.id);

    // 根据 id 去重
    expect(result).toEqual([
      { id: 1, name: "张三" },
      { id: 2, name: "张三" },
    ]);
  });

  it("应该支持其他属性进行去重", () => {
    const data = [
      { id: 1, name: "张三" },
      { id: 2, name: "张三" },
      { id: 3, name: "李四" },
      { id: 4, name: "张三" },
    ];
    const result = uniqueBy(data, (element) => element.name);
    expect(result).toEqual([
      { id: 1, name: "张三" },
      { id: 3, name: "李四" },
    ]); // 根据 name 去重
  });
});
