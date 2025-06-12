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
      entry: path.resolve(__dirname, 'src/index.tsx'), // seu arquivo de entrada
      name: 'JupyterlabResourceMonitor',
      formats: ['es'], // formato ES Modules, que o JupyterLab aceita
      fileName: 'index',
    },
    rollupOptions: {
      // Essas dependências o JupyterLab já fornece, não deve embutir
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
