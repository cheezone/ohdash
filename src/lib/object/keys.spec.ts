import { describe, it, expectTypeOf } from "vitest";
import { keys } from "./keys";
import lodash from "lodash";
import { ref } from "vue"; // 引入 Vue 的相关函数

describe.concurrent("keys 与 lodash 的一致性测试", () => {
  // 测试对象
  it("应该与 lodash 的行为保持一致 - 对象", ({ expect }) => {
    const obj = { 苹果: 1, 梨: 2 };
    expect(keys(obj)).toEqual(lodash.keys(obj));
  });

  // 测试数组
  it("应该与 lodash 的行为保持一致 - 数组", ({ expect }) => {
    const arr = ["苹果", "李子", "梨"];
    expect(keys(arr)).toEqual(lodash.keys(arr));
  });

  // 测试 null 和 undefined
  it("应该与 lodash 的行为保持一致 - null 和 undefined", ({ expect }) => {
    expect(keys(null)).toEqual(lodash.keys(null));
    expect(keys(undefined)).toEqual(lodash.keys(undefined));
  });

  // 测试字符串和数字（转换为对象）
  it("应该与 lodash 的行为保持一致 - 字符串和数字", ({ expect }) => {
    const strObj = new String("苹果"); // 转为对象
    const numObj = new Number(123); // 转为对象
    expect(keys(strObj)).toEqual(lodash.keys(strObj));
    expect(keys(numObj)).toEqual(lodash.keys(numObj));
  });

  // 测试空对象
  it("应该与 lodash 的行为保持一致 - 空对象", ({ expect }) => {
    const emptyObj = {};
    expect(keys(emptyObj)).toEqual(lodash.keys(emptyObj));
  });

  // 测试 Map
  it("应该与 lodash 的行为保持一致 - Map 对象", ({ expect }) => {
    const map = new Map([
      ["苹果", 1],
      ["梨", 2],
    ]);
    expect(keys(map)).toEqual(lodash.keys(map));
  });

  // 测试 Set
  it("应该与 lodash 的行为保持一致 - Set 对象", ({ expect }) => {
    const set = new Set(["苹果", "李子"]);
    expect(keys(set)).toEqual(lodash.keys(set));
  });

  // 测试系统对象 (如 Math 对象)
  it("应该与 lodash 的行为保持一致 - 系统对象 (Math)", ({ expect }) => {
    expect(keys(Math)).toEqual(lodash.keys(Math));
  });

  // 测试 Date 对象
  it("应该与 lodash 的行为保持一致 - Date 对象", ({ expect }) => {
    const date = new Date();
    expect(keys(date)).toEqual(lodash.keys(date));
  });

  // 测试类数组对象
  it("应该与 lodash 的行为保持一致 - 类数组对象", ({ expect }) => {
    const obj = { 0: "苹果", 1: "李子", length: 2 };
    expect(keys(obj)).toEqual(lodash.keys(obj));
  });

  // 测试自定义构造函数的实例
  it("应该与 lodash 的行为保持一致 - 自定义构造函数实例", ({ expect }) => {
    function Person() {
      // @ts-ignore
      this.苹果 = 1;
    }
    Person.prototype.李子 = 2;
    // @ts-ignore
    const person = new Person();
    expect(keys(person)).toEqual(lodash.keys(person)); // 仅获取实例属性
  });

  // 测试稀疏数组
  it("应该与 lodash 的行为保持一致 - 稀疏数组", ({ expect }) => {
    const sparseArray = [1, , 3]; // 稀疏数组，第二个元素是空位
    expect(keys(sparseArray)).toEqual(lodash.keys(sparseArray));
  });

  // 测试 Error 对象
  it("应该与 lodash 的行为保持一致 - Error 对象", ({ expect }) => {
    const error = new Error("错误信息");
    expect(keys(error)).toEqual(lodash.keys(error));
  });

  // 测试代理对象
  it("应该与 lodash 的行为保持一致 - 代理对象", ({ expect }) => {
    const target = { 苹果: 1, 李子: 2 };
    const handler = {};
    const proxy = new Proxy(target, handler);
    expect(keys(proxy)).toEqual(lodash.keys(proxy));

    // 测试包含不可枚举属性的代理
    const objWithNonEnumerable = Object.create(
      {},
      {
        苹果: { value: 1, enumerable: true },
        李子: { value: 2, enumerable: false },
      }
    );
    const proxyWithNonEnumerable = new Proxy(objWithNonEnumerable, handler);
    expect(keys(proxyWithNonEnumerable)).toEqual(
      lodash.keys(proxyWithNonEnumerable)
    );
  });

  // 测试 Vue 的 Ref 对象
  it("应该与 lodash 的行为保持一致 - Vue Ref 对象", ({ expect }) => {
    const refValue = ref("苹果");
    console.log(keys(refValue));
    expect(keys(refValue)).toEqual(lodash.keys(refValue)); // 转换为响应式引用对象
  });

  // 测试 Vue 代理对象
  it("应该与 lodash 的行为保持一致 - Vue 代理对象", ({ expect }) => {
    const state = ref({ 苹果: 1, 李子: 2 });
    const proxy = new Proxy(state.value, {});
    expect(keys(proxy)).toEqual(lodash.keys(proxy));
  });
});

describe("keys 类型测试", () => {
  it("应该推导出对象的键为字符串数组", () => {
    const obj = { 苹果: 1, 李子: 2 };
    expectTypeOf(keys(obj)).toMatchTypeOf<string[]>();
  });

  it("应该推导出数组的键为字符串数组", () => {
    const arr = ["苹果", "李子", "梨"];
    expectTypeOf(keys(arr)).toMatchTypeOf<string[]>();
  });

  it("应该推导出处理 null 和 undefined 返回空数组", () => {
    expectTypeOf(keys(null)).toMatchTypeOf<string[]>();
    expectTypeOf(keys(undefined)).toMatchTypeOf<string[]>();
  });

  it("应该推导出字符串和数字转换为对象后，返回字符串数组", () => {
    const strObj = Object("苹果");
    const numObj = Object(123);
    expectTypeOf(keys(strObj)).toMatchTypeOf<string[]>();
    expectTypeOf(keys(numObj)).toMatchTypeOf<string[]>();
  });

  it("应该推导出对 Map、Set 等其他对象的键为字符串数组", () => {
    const map = new Map([
      ["苹果", 1],
      ["李子", 2],
    ]);
    const set = new Set(["苹果", "李子"]);
    expectTypeOf(keys(map)).toMatchTypeOf<string[]>();
    expectTypeOf(keys(set)).toMatchTypeOf<string[]>();
  });

  it("应该推导出 Date 对象的键为字符串数组", () => {
    const date = new Date();
    console.log(keys(date));
    expectTypeOf(keys(date)).toMatchTypeOf<string[]>();
  });

  it("应该推导出自定义构造函数实例的键为字符串数组", () => {
    function Person() {
      // @ts-ignore
      this.苹果 = 1;
    }
    Person.prototype.李子 = 2;
    // @ts-ignore
    const person = new Person();
    expectTypeOf(keys(person)).toMatchTypeOf<string[]>();
  });

  it("应该推导出稀疏数组的键为字符串数组", () => {
    const sparseArray = [1, , 3];
    expectTypeOf(keys(sparseArray)).toMatchTypeOf<string[]>();
  });

  it("应该推导出 Vue 的 Ref 对象的键为字符串数组", () => {
    const refValue = ref("苹果");
    expectTypeOf(keys(refValue)).toMatchTypeOf<string[]>();
  });
});
