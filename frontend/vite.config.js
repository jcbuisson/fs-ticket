import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
   return {
      plugins: [
      ],
      server: {
         port: 8000,
         open: true,
         proxy: {
            '^/api/.*': {
               target: 'http://localhost:3000',
               ws: true,
               secure: false,
               changeOrigin: true,
            },
         }
      },
   }
})
