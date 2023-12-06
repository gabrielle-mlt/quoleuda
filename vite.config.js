import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import path from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    contactEmail: JSON.stringify('quoleuda@gmail.com')
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')]
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@plugins', replacement: fileURLToPath(new URL('./src/plugins', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@resources', replacement: fileURLToPath(new URL('./src/resources', import.meta.url)) },
      { find: '@stores', replacement: fileURLToPath(new URL('./src/stores', import.meta.url)) },
      { find: '@pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
      { find: '@iconsets', replacement: fileURLToPath(new URL('./src/iconsets', import.meta.url)) }
    ]
  }
})
