import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Debug plugin to track module exports and identify allInputs issue
    {
      name: 'debug-exports',
      buildEnd() {
        this.warn('=== DEBUG: Module IDs in build ===');
        this.warn(JSON.stringify(this.getModuleIds()));
      },
      transform(code, id) {
        // Track validation-related modules
        if (id.includes('validation') || id.includes('ValidationEngine') || id.includes('ValidationRuleFactory')) {
          this.warn(`=== DEBUG: Processing validation module: ${id} ===`);
          this.warn(`Code length: ${code.length}`);
          if (code.includes('allInputs')) {
            this.warn('✓ allInputs found in code');
          } else {
            this.warn('✗ allInputs NOT found in code');
          }
        }
        return null;
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Debug build configuration
  logLevel: 'debug',
  build: {
    // Temporarily disable minification to isolate the issue
    minify: false,
    rollupOptions: {
      output: {
        // Preserve function names for debugging
        generatedCode: {
          preset: 'es2015',
          constBindings: false
        }
      }
    }
  }
}));
