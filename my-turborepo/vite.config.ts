import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      pwaAssets: {
        disabled: false,
        config: true,
      },
      workbox: {
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: 60000000
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ['**/*'],
      manifest: {
        name: 'KHUSAN',
        short_name: 'KHUSAN',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        description: 'KHU campus umbrella sharing app',
        lang: 'en',
        dir: 'ltr',
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'any',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ],
        screenshots: [
          {
            src: 'screen1.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'screen2.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'screen3.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'screen4.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
          {
            src: 'screen5.png',
            sizes: '1920x1080',
            type: 'image/png',
          },
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: 'KHUSAN',
            url: '/',
            description: 'KHUSAN',
          },
        ],
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      src: '/src',
      '@': path.resolve(__dirname, './src'),
    },
  },
})
