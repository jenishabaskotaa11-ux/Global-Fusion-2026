import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          cultures: path.resolve(__dirname, 'cultures.html'),
          schedule: path.resolve(__dirname, 'schedule.html'),
          activities: path.resolve(__dirname, 'activities.html'),
          competitions: path.resolve(__dirname, 'competitions.html'),
          registration: path.resolve(__dirname, 'registration.html'),
          quiz: path.resolve(__dirname, 'quiz.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          news: path.resolve(__dirname, 'news.html'),
          resources: path.resolve(__dirname, 'resources.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          feedback: path.resolve(__dirname, 'feedback.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
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
