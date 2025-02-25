import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./env",
  plugins: [react()],
  preview: {
    allowedHosts: ["candidate-search-2-po6w.onrender.com"],
  },
});
