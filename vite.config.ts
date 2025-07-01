import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    // 设置路径别名，这表示使用符号 “@” 来代替项目根目录下的 src 目录路径
    alias: {
      '@': path.resolve(__dirname, './src')  // resolve() 表示合并目录得到一个绝对路径
    },
  },
  assetsInclude: ['**/*.md'], // 将 .md 文件视为静态资源
  // 确保 glob 导入工作正常
  optimizeDeps: {
    exclude: ['@/assets/_posts/*.md']
  }
})
