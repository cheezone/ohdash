/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src/lib",
    }),
  ],
  test: {
    coverage: {
      include: ["**/lib/**/*.ts"],
      exclude: ["**/index.ts", "dist/**"],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "ohdash",
      fileName: (format) => `ohdash.${format}.js`, // 根据格式生成文件名
      formats: ["es"],
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        dir: "dist", // 输出目录
        format: "es",
        entryFileNames: "[name].js", // 输出文件名
        preserveModules: true, // 保持模块结构
        preserveModulesRoot: "src/lib", // 保留模块根目录
      },
    },
  },
});
