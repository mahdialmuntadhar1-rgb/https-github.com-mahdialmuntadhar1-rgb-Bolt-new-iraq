import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    '__DIRECTORY_URL__':  JSON.stringify(process.env.VITE_SUPABASE_URL  || 'https://mxxaxhrtccomkazpvthn.supabase.co'),
    '__DIRECTORY_KEY__':  JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || ''),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
