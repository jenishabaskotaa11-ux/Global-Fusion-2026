import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          legacy_about: path.resolve(__dirname, 'about.html'),
          legacy_activities: path.resolve(__dirname, 'activities.html'),
          legacy_competitions: path.resolve(__dirname, 'competitions.html'),
          legacy_contact: path.resolve(__dirname, 'contact.html'),
          legacy_cultures: path.resolve(__dirname, 'cultures.html'),
          legacy_dashboard: path.resolve(__dirname, 'dashboard.html'),
          legacy_faq: path.resolve(__dirname, 'faq.html'),
          legacy_feedback: path.resolve(__dirname, 'feedback.html'),
          legacy_gallery: path.resolve(__dirname, 'gallery.html'),
          legacy_index: path.resolve(__dirname, 'index.html'),
          legacy_news: path.resolve(__dirname, 'news.html'),
          legacy_quiz: path.resolve(__dirname, 'quiz.html'),
          legacy_registration: path.resolve(__dirname, 'registration.html'),
          legacy_resources: path.resolve(__dirname, 'resources.html'),
          legacy_schedule: path.resolve(__dirname, 'schedule.html'),
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
