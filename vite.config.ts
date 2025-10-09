import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: ['@vite/client', '@vite/env']
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    // Enhanced build optimizations
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        },
        // Optimize chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    // Performance optimizations
    reportCompressedSize: false,
    assetsInlineLimit: 4096
  },
  server: {
    port: 3000,
    host: true,
    // Development optimizations
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 4173,
    host: true
  },
  // CSS optimization
  css: {
    devSourcemap: false
  }
});
