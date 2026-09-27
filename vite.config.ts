import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function heroUploadPlugin(): Plugin {
  return {
    name: 'hero-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-hero', (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', () => {
          try {
            const { dataUrl, filename } = JSON.parse(body);
            if (!dataUrl) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'No dataUrl provided' }));
              return;
            }

            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            // Save to public/ and src/assets/images/
            const publicDir = path.resolve(__dirname, 'public');
            const imagesDir = path.resolve(__dirname, 'src/assets/images');
            if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
            if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

            fs.writeFileSync(path.join(publicDir, 'user-profile-image.jpeg'), buffer);
            fs.writeFileSync(path.join(publicDir, 'krish_hero.jpg'), buffer);
            fs.writeFileSync(path.join(imagesDir, 'user-profile-image.jpeg'), buffer);

            // Trigger build_portfolio.cjs to sync index.html
            exec('node scripts/build_portfolio.cjs', (error) => {
              if (error) {
                console.error('Error rebuilding portfolio after image upload:', error);
              } else {
                console.log('Successfully rebuilt portfolio with new user photo!');
              }
            });

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Image saved and portfolio rebuilt successfully!' }));
          } catch (err) {
            console.error('Upload error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to process upload' }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), heroUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
