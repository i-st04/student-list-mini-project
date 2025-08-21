import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
      scss:{ 
        api:'modern',
        //silenceDeprecations:["legacy-js-api"],
      }
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'https://cubes.rs', //pokusala sam preko import.meta.env.VITE_SERVER_URL ali nije mi htelo
        changeOrigin:true,
        secure:false,
        rewrite:(path)=> path.replace(/^\/api/, '/service'),
      }
    }
  }
})
