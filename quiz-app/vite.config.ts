import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/quiz/" : "/",
  plugins: [solid()],
});
