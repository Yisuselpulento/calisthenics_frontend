import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  optimizeDeps: {
    exclude: [
      "@ffmpeg/ffmpeg",
      "@ffmpeg/util",
    ],
  },

  build: {
    rollupOptions: {
      output: {
        // Vendors en chunks propios → se cachean entre deploys de tu código
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "socket-vendor": ["socket.io-client"],
        },
      },
    },
  },
});
