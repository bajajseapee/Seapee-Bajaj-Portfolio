import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {SITE_URL_ORIGIN, SEO_ROUTES} from './src/config/siteConfig';

function syncSeoAssetsPlugin(): Plugin {
  const generateFiles = () => {
    const publicDir = path.resolve(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, {recursive: true});
    }

    const today = new Date().toISOString().split('T')[0];
    const urlsXml = Object.keys(SEO_ROUTES)
      .map((routePath) => {
        const loc =
          routePath === '/'
            ? `${SITE_URL_ORIGIN}/`
            : `${SITE_URL_ORIGIN}${routePath}`;
        const priority =
          routePath === '/'
            ? '1.0'
            : ['/about', '/services', '/case-studies', '/work'].includes(routePath)
            ? '0.9'
            : routePath === '/book'
            ? '0.7'
            : '0.8';
        const changefreq =
          routePath === '/' || routePath === '/writing' ? 'weekly' : 'monthly';
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
      })
      .join('\n');

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>\n`;
    const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL_ORIGIN}/sitemap.xml\n`;

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf-8');
  };

  return {
    name: 'sync-seo-assets',
    buildStart() {
      generateFiles();
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      Object.values(SEO_ROUTES).forEach((route) => {
        const canonicalUrl =
          route.path === '/'
            ? `${SITE_URL_ORIGIN}/`
            : `${SITE_URL_ORIGIN}${route.path}`;

        let routeHtml = baseHtml
          .replace(
            /<title>[\s\S]*?<\/title>/,
            `<title>${route.title.replace(/&/g, '&amp;')}</title>`
          )
          .replace(
            /<meta name="title" content="[^"]*" \/>/,
            `<meta name="title" content="${route.title.replace(/&/g, '&amp;')}" />`
          )
          .replace(
            /<meta name="description" content="[^"]*" \/>/,
            `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
          )
          .replace(
            /<link rel="canonical" href="[^"]*" \/>/,
            `<link rel="canonical" href="${canonicalUrl}" />`
          )
          .replace(
            /<meta property="og:url" content="[^"]*" \/>/,
            `<meta property="og:url" content="${canonicalUrl}" />`
          )
          .replace(
            /<meta property="og:title" content="[^"]*" \/>/,
            `<meta property="og:title" content="${route.title.replace(/&/g, '&amp;')}" />`
          )
          .replace(
            /<meta property="og:description" content="[^"]*" \/>/,
            `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
          )
          .replace(
            /<meta name="twitter:url" content="[^"]*" \/>/,
            `<meta name="twitter:url" content="${canonicalUrl}" />`
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*" \/>/,
            `<meta name="twitter:title" content="${route.title.replace(/&/g, '&amp;')}" />`
          )
          .replace(
            /<meta name="twitter:description" content="[^"]*" \/>/,
            `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
          );

        if (route.path === '/') {
          fs.writeFileSync(indexHtmlPath, routeHtml, 'utf-8');
        } else {
          const cleanSlug = route.path.replace(/^\/+|\/+$/g, '');
          const htmlFilePath = path.join(distDir, `${cleanSlug}.html`);
          fs.mkdirSync(path.dirname(htmlFilePath), {recursive: true});
          fs.writeFileSync(htmlFilePath, routeHtml, 'utf-8');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), syncSeoAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'next/image': path.resolve(__dirname, 'src/components/NextImage.tsx'),
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
