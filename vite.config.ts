import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import ImageKit from 'imagekit'

dotenv.config()

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ''
})

const imagekitAuthHandler = (req: any, res: any) => {
  try {
    const auth = imagekit.getAuthenticationParameters()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(auth))
  } catch (e: any) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: e?.message || 'Auth error' }))
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'imagekit-auth-middleware',
      configureServer(server) {
        server.middlewares.use('/api/imagekit/auth', imagekitAuthHandler)
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/imagekit/auth', imagekitAuthHandler)
      }
    }
  ]
})
