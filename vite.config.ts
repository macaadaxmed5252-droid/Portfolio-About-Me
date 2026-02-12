import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // Waxaan ka dhignay localhost si uu u muujiyo hal link oo qura
    host: "localhost", 
    port: 5252,
    strictPort: false, // KAN AYAA XALKA AH: Waxay ku khasbaysaa Vite inuu isticmaalo 8080 oo kaliya
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));