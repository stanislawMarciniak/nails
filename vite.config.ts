import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const viteConfig = defineConfig({
  plugins: [react()],
});

export default viteConfig;
