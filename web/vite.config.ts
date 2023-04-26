import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        globalVars: {
          primary1: '#312520', //"#622a1d",
          primary2: '#493131', //#60281e',
          primary3: '#392f41', //'#9d2933',
          primary4: '#665757', //'#c3272b',
          primary5: '#3d3b4f', //'#bf242a',
          primary6: '#c91f37',
          second1: '#f3f9f1',
          second2: '#e0eee8',
          second3: '#e0f0e9',
          second4: '#c0ebd7',
          second5: '#bbcdc5',
          second6: '#c2ccd0',
          second7: '#bacac6',
          second8: '#808080'
        }
      }
    }
  }
})
