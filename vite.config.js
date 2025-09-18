import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"https://github.com/HarshalPatil-1214/first-git-demo",
  plugins: [react()],
})
