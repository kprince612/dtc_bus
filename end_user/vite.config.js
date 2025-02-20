import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["qrcode.react"], // Ensure Vite processes qrcode.react correctly
  },
  server: {
    port: 5173, // Default Vite port, change if needed
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Shorter import paths
    },
  },
});
