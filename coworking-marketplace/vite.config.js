import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'https://assessment-new-branch.onrender.com'
    }
  }
});


// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

