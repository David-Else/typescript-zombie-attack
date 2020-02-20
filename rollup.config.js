import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/mod.ts",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true
  },
  plugins: [typescript()]
};
