import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MyApp",
        short_name: "MyApp",
        description: "A Progressive Web App built with Vite and React.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
