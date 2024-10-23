import { describe, it, expect } from "vitest";
import { remove } from "./remove";

describe("remove 函数", () => {
  it("应该删除数组中的偶数", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    remove(numbers, (n) => n % 2 === 0);
    expect(numbers).toEqual([1, 3, 5]); // 偶数被删除，剩下奇数
  });

  it("应该删除数组中的男性", () => {
    type Male = { gender: "male" };
    type Female = { gender: "female" };
    const people: (Male | Female)[] = [
      { gender: "male" },
      { gender: "female" },
      { gender: "male" },
    ];
    const isMale = (person: Male | Female): person is Male =>
      person.gender === "male";

    remove(people, isMale);
    expect(people).toEqual([{ gender: "female" }]); // 男性被删除，剩下女性
  });

  it("应该处理空数组", () => {
    const emptyArray: number[] = [];
    remove(emptyArray, (n) => n % 2 === 0);
    expect(emptyArray).toEqual([]); // 空数组不应该有任何修改
  });

  it("应该删除符合条件的字符串", () => {
    const words = ["apple", "banana", "cherry", "date"];
    remove(words, (word) => word.startsWith("b"));
    expect(words).toEqual(["apple", "cherry", "date"]); // 开头为 'b' 的元素被删除
  });

  it("如果未提供条件函数，应该删除所有元素", () => {
    const items = [1, 2, 3, 4, 5];
    remove(items); // 不传递条件函数
    expect(items).toEqual([]); // 所有元素都被删除
  });

  it("如果条件函数总是返回 false，数组应该保持不变", () => {
    const items = [1, 2, 3, 4, 5];
    remove(items, () => false); // 条件函数总是返回 false
    expect(items).toEqual([1, 2, 3, 4, 5]); // 数组应保持不变
  });

  it("如果条件函数总是返回 true，数组应该被清空", () => {
    const items = [1, 2, 3, 4, 5];
    remove(items, () => true); // 条件函数总是返回 true
    expect(items).toEqual([]); // 数组应被清空
  });
});
