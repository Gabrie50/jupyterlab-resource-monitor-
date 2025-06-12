import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'JupyterlabResourceMonitor',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@jupyterlab/application',
        '@jupyterlab/apputils',
        '@lumino/widgets',
        '@lumino/disposable',
        '@lumino/signaling',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@jupyterlab/application': 'JupyterLabApplication',
          '@jupyterlab/apputils': 'JupyterLabAppUtils',
          '@lumino/widgets': 'LuminoWidgets',
          '@lumino/disposable': 'LuminoDisposable',
          '@lumino/signaling': 'LuminoSignaling',
        },
      },
    },
    outDir: 'dist',
  },
})
