import { describe, it, expect } from "vitest";
import { forElse } from "../../lib/array/forElse";

/**
 * forElse 测试
 */
describe("forElse", () => {
  it("应在找到满足条件的元素时提前退出", () => {
    const 数字数组 = [1, 2, 3, 6, 4];
    let result = "";

    forElse(
      数字数组,
      (item) => {
        if (item > 5) {
          result = `找到: ${item}`;
          return true; // 满足条件，退出循环
        }
      },
      () => {
        result = "未找到大于 5 的数字";
      }
    );

    expect(result).toBe("找到: 6");
  });

  it("应在没有找到满足条件的元素时执行 else 逻辑", () => {
    const 数字数组 = [1, 2, 3, 4];
    let result = "";

    forElse(
      数字数组,
      (item) => {
        if (item > 5) {
          result = `找到: ${item}`;
          return true;
        }
      },
      () => {
        result = "未找到大于 5 的数字";
      }
    );

    expect(result).toBe("未找到大于 5 的数字");
  });

  it("应处理空数组", () => {
    const 空数组: number[] = [];
    let result = "";

    forElse(
      空数组,
      () => {
        result = "循环体不应被调用";
      },
      () => {
        result = "数组为空，执行 else 逻辑";
      }
    );

    expect(result).toBe("数组为空，执行 else 逻辑");
  });

  it("应处理数组中只有一个元素且满足条件的情况", () => {
    const 数字数组 = [10];
    let result = "";

    forElse(
      数字数组,
      (item) => {
        if (item > 5) {
          result = `找到: ${item}`;
          return true; // 满足条件，退出循环
        }
      },
      () => {
        result = "未找到大于 5 的数字";
      }
    );

    expect(result).toBe("找到: 10");
  });

  it("应处理数组中只有一个元素且不满足条件的情况", () => {
    const 数字数组 = [3];
    let result = "";

    forElse(
      数字数组,
      (item) => {
        if (item > 5) {
          result = `找到: ${item}`;
          return true; // 满足条件，退出循环
        }
      },
      () => {
        result = "未找到大于 5 的数字";
      }
    );

    expect(result).toBe("未找到大于 5 的数字");
  });

  it("应处理多类型元素的数组", () => {
    const 混合数组 = [1, "苹果", 3, "香蕉", 7];
    let result = "";

    forElse(
      混合数组,
      (item) => {
        if (typeof item === "number" && item > 5) {
          result = `找到数字: ${item}`;
          return true; // 找到大于 5 的数字，退出循环
        }
      },
      () => {
        result = "未找到大于 5 的数字";
      }
    );

    expect(result).toBe("找到数字: 7");
  });

  it("应处理所有元素为假值的情况", () => {
    const 假值数组 = [0, "", null, undefined, false];
    let result = "";

    forElse(
      假值数组,
      (item) => {
        if (item) {
          result = "找到真值";
          return true; // 找到真值，退出循环
        }
      },
      () => {
        result = "未找到真值";
      }
    );

    expect(result).toBe("未找到真值");
  });

  it("应在大数组中找到第一个满足条件的元素并执行 else 逻辑", () => {
    const 大数组 = Array.from({ length: 1000 }, (_, i) => i); // 生成 0 到 999 的数组
    let result = "";

    forElse(
      大数组,
      (item) => {
        if (item > 500) {
          result = `找到: ${item}`;
          return true; // 找到第一个大于 500 的数字
        }
      },
      () => {
        result = "未找到大于 500 的数字";
      }
    );

    expect(result).toBe("找到: 501");
  });

  it("应在未满足条件的情况下返回特定的 else 逻辑", () => {
    const 空对象数组 = [{}, {}, {}]; // 数组中的每个元素都是空对象
    let result = "";

    forElse(
      空对象数组,
      (item) => {
        if (Object.keys(item).length > 0) {
          result = "找到非空对象";
          return true; // 找到非空对象，退出循环
        }
      },
      () => {
        result = "未找到非空对象";
      }
    );

    expect(result).toBe("未找到非空对象");
  });
});
