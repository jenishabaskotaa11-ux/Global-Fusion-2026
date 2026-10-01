import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {cpSync} from 'node:fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    publicDir: false,
    plugins: [react(), tailwindcss(), {
      name: 'copy-static-website-files',
      closeBundle() {
        // Keep runtime audio, fallback images, and classic scripts at their original URLs.
        for (const folder of ['css', 'js', 'assets']) {
          cpSync(path.resolve(__dirname, folder), path.resolve(__dirname, 'dist', folder), {recursive: true});
        }
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          legacy_index: path.resolve(__dirname, 'index.html'),
          index: path.resolve(__dirname, 'html/index.html'),
          about: path.resolve(__dirname, 'html/about.html'),
          cultures: path.resolve(__dirname, 'html/cultures.html'),
          schedule: path.resolve(__dirname, 'html/schedule.html'),
          activities: path.resolve(__dirname, 'html/activities.html'),
          competitions: path.resolve(__dirname, 'html/competitions.html'),
          registration: path.resolve(__dirname, 'html/registration.html'),
          quiz: path.resolve(__dirname, 'html/quiz.html'),
          gallery: path.resolve(__dirname, 'html/gallery.html'),
          news: path.resolve(__dirname, 'html/news.html'),
          resources: path.resolve(__dirname, 'html/resources.html'),
          faq: path.resolve(__dirname, 'html/faq.html'),
          contact: path.resolve(__dirname, 'html/contact.html'),
          feedback: path.resolve(__dirname, 'html/feedback.html'),
          dashboard: path.resolve(__dirname, 'html/dashboard.html'),
        },
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
