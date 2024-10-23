import { bench, describe } from "vitest";
import { keys } from "./keys";
import lodash from "lodash";

describe("性能测试", () => {
  const testData = { 苹果: 1, 梨: 2, 李子: 3 };

  bench("自定义 keys 性能测试 - 1000 次", () => {
    for (let i = 0; i < 1000; i++) {
      keys(testData);
    }
  });

  bench("lodash keys 性能测试 - 1000 次", () => {
    for (let i = 0; i < 1000; i++) {
      lodash.keys(testData);
    }
  });
});
