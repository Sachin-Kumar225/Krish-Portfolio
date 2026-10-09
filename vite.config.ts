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

function blogSeoPlugin(): Plugin {
  return {
    name: 'blog-seo-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url || '/', 'http://localhost');
        const pathname = urlObj.pathname;

        const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
        const host = req.headers.host || 'localhost:3000';
        const baseUrl = `${proto}://${host}`;

        // 1. Dynamic sitemap.xml
        if (pathname === '/sitemap.xml') {
          try {
            const blogData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/blog.json'), 'utf8'));
            const today = new Date().toISOString().split('T')[0];
            let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
            xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
            xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
            xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
            xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '    <priority>1.0</priority>\n';
            xml += '  </url>\n';

            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/blog</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += '    <changefreq>daily</changefreq>\n';
            xml += '    <priority>0.9</priority>\n';
            xml += '  </url>\n';

            Object.keys(blogData).forEach(slug => {
              const post = blogData[slug];
              const postMod = post.isoModified ? post.isoModified.split('T')[0] : (post.isoDate ? post.isoDate.split('T')[0] : today);
              const postImg = `${baseUrl}${post.featuredImage || '/user-profile-image.jpeg'}`;
              const safeTitle = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

              xml += '  <url>\n';
              xml += `    <loc>${baseUrl}/blog/${slug}</loc>\n`;
              xml += `    <lastmod>${postMod}</lastmod>\n`;
              xml += '    <changefreq>monthly</changefreq>\n';
              xml += '    <priority>0.8</priority>\n';
              xml += '    <image:image>\n';
              xml += `      <image:loc>${postImg}</image:loc>\n`;
              xml += `      <image:title>${safeTitle}</image:title>\n`;
              xml += '    </image:image>\n';
              xml += '  </url>\n';
            });

            xml += '</urlset>\n';

            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.statusCode = 200;
            res.end(xml);
            return;
          } catch (err) {
            console.error('Error generating dynamic sitemap:', err);
            return next();
          }
        }

        // 2. Dynamic robots.txt
        if (pathname === '/robots.txt') {
          const txt = `User-agent: *
Allow: /
Allow: /blog
Allow: /blog/*

Sitemap: ${baseUrl}/sitemap.xml
`;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.statusCode = 200;
          res.end(txt);
          return;
        }

        // 3. Blog List (/blog) and Article (/blog/:slug) Direct URLs
        if (pathname === '/blog' || pathname.startsWith('/blog/')) {
          try {
            const blogData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/blog.json'), 'utf8'));
            let html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

            const isArticle = pathname.startsWith('/blog/') && pathname.length > 6;
            const slug = isArticle ? pathname.replace('/blog/', '').replace(/\/$/, '') : '';
            const article = isArticle ? blogData[slug] : null;

            if (isArticle && article) {
              const pageTitle = `${article.title} — Krish Kumar`;
              const pageDesc = article.shortDescription || article.tagline;
              const pageUrl = `${baseUrl}/blog/${slug}`;
              const pageImg = `${baseUrl}${article.featuredImage || '/user-profile-image.jpeg'}`;

              // Replace Title, Meta Description, Canonical, Robots, OpenGraph, and Twitter in one clean block
              const headSeoBlockRegex = /<title>[\s\S]*?<meta name="theme-color" content="#ffffff" \/>/;
              const seoMetaBlock = `<title>${pageTitle}</title>
  <meta name="description" content="${pageDesc.replace(/"/g, '&quot;')}" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${article.title.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${pageDesc.replace(/"/g, '&quot;')}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${pageImg}" />
  <meta property="og:site_name" content="Krish Kumar — Portfolio &amp; Blog" />
  <meta property="article:published_time" content="${article.isoDate || '2025-10-18T09:00:00+00:00'}" />
  <meta property="article:modified_time" content="${article.isoModified || '2026-09-26T14:30:00+00:00'}" />
  <meta property="article:author" content="${(article.author && article.author.name) || 'Krish Kumar'}" />
  <meta property="article:section" content="${article.category}" />
  ${(article.tags || []).map((t: string) => `<meta property="article:tag" content="${t}" />`).join('\n  ')}
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${article.title.replace(/"/g, '&quot;')}" />
  <meta name="twitter:description" content="${pageDesc.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${pageImg}" />
  <meta name="theme-color" content="#ffffff" />`;

              html = html.replace(headSeoBlockRegex, seoMetaBlock);

              // BlogPosting Schema.org Structured Data
              const schemaData = {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": pageUrl
                },
                "headline": article.title,
                "description": pageDesc,
                "image": [pageImg],
                "datePublished": article.isoDate || "2025-10-18T09:00:00+00:00",
                "dateModified": article.isoModified || "2026-09-26T14:30:00+00:00",
                "author": {
                  "@type": "Person",
                  "name": (article.author && article.author.name) || "Krish Kumar",
                  "jobTitle": (article.author && article.author.role) || "Digital Marketer & Creative Strategist",
                  "url": `${baseUrl}/`
                },
                "publisher": {
                  "@type": "Person",
                  "name": "Krish Kumar",
                  "url": `${baseUrl}/`,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/user-profile-image.jpeg`
                  }
                },
                "articleSection": article.category,
                "keywords": (article.tags || []).join(", ")
              };

              html = html.replace(/<script id="schemaStructuredData" type="application\/ld\+json">.*?<\/script>/s, `<script id="schemaStructuredData" type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n</script>`);

              // Pre-populate article content in DOM for crawlers
              function renderBlocks(content: any[]): string {
                if (!Array.isArray(content)) return '';
                return content.map(block => {
                  if (block.type === 'lead') {
                    return `<p class="lead-p">${block.text}</p>`;
                  } else if (block.type === 'heading') {
                    const tag = block.level === 3 ? 'h3' : 'h2';
                    return `<${tag}>${block.text}</${tag}>`;
                  } else if (block.type === 'paragraph') {
                    return `<p>${block.text}</p>`;
                  } else if (block.type === 'callout') {
                    return `<div class="article-callout-box"><div class="callout-title">✦ ${block.title}</div><p class="callout-body">${block.text}</p></div>`;
                  } else if (block.type === 'quote') {
                    return `<div class="article-quote-box"><blockquote>“${block.quote}”</blockquote>${block.author ? `<cite>— ${block.author}</cite>` : ''}</div>`;
                  } else if (block.type === 'list') {
                    const items = (block.items || []).map((item: string) => `<li>${item}</li>`).join('');
                    return `<ul class="article-bullets">${items}</ul>`;
                  }
                  return '';
                }).join('\n');
              }

              html = html.replace('<div class="article-category-badge" id="artCategoryBadge">Growth & Acquisition</div>', `<div class="article-category-badge" id="artCategoryBadge">${article.category}</div>`);
              html = html.replace('<h1 class="article-main-title" id="artTitle">How to Scale Meta Ads to 3.5x ROAS in 2026: A Blueprint for Creative Testing</h1>', `<h1 class="article-main-title" id="artTitle">${article.title}</h1>`);
              html = html.replace('<p class="article-main-tagline" id="artTagline">Why dynamic creative iteration, first-party signal telemetry, and message-scent landing pages are outperforming broad interest hacking.</p>', `<p class="article-main-tagline" id="artTagline">${article.tagline}</p>`);
              html = html.replace('<span id="artDate">October 18, 2025</span>', `<span id="artDate">${article.date}</span>`);
              html = html.replace('<span id="artReadTime">7 min read</span>', `<span id="artReadTime">${article.readTime}</span>`);
              html = html.replace('<div class="featured-badge-pill" id="artCoverBadge">Paid Media Strategy</div>', `<div class="featured-badge-pill" id="artCoverBadge">${article.coverBadge || article.category}</div>`);
              html = html.replace('<div class="article-body-content" id="artBody">', `<div class="article-body-content" id="artBody">\n${renderBlocks(article.content)}`);

              // Pre-activate article view
              html = html.replace('<div class="article-page-view" id="articlePageView" aria-hidden="true" role="dialog" aria-modal="true">', '<div class="article-page-view active" id="articlePageView" aria-hidden="false" role="dialog" aria-modal="true">');
              html = html.replace('<body>', '<body class="article-view-open">');

              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.statusCode = 200;
              res.end(html);
              return;
            } else if (!isArticle) {
              // Blog list view (/blog)
              const pageTitle = 'Blog & Insights — Krish Kumar';
              const pageDesc = 'In-depth articles and blueprints on Meta Ads ROAS, design tokens in Figma, conversion optimization, and AI workflows by Krish Kumar.';
              const pageUrl = `${baseUrl}/blog`;
              const pageImg = `${baseUrl}/user-profile-image.jpeg`;

              const headSeoBlockRegex = /<title>[\s\S]*?<meta name="theme-color" content="#ffffff" \/>/;
              const blogSeoBlock = `<title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}" />
  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${pageTitle}" />
  <meta property="og:description" content="${pageDesc}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${pageImg}" />
  <meta property="og:site_name" content="Krish Kumar — Portfolio &amp; Blog" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${pageTitle}" />
  <meta name="twitter:description" content="${pageDesc}" />
  <meta name="twitter:image" content="${pageImg}" />
  <meta name="theme-color" content="#ffffff" />`;

              html = html.replace(headSeoBlockRegex, blogSeoBlock);

              const schemaData = {
                "@context": "https://schema.org",
                "@type": "Blog",
                "@id": `${pageUrl}#blog`,
                "name": "Krish Kumar Insights & Blog",
                "description": pageDesc,
                "url": pageUrl,
                "author": {
                  "@type": "Person",
                  "name": "Krish Kumar",
                  "url": `${baseUrl}/`
                }
              };

              html = html.replace(/<script id="schemaStructuredData" type="application\/ld\+json">.*?<\/script>/s, `<script id="schemaStructuredData" type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n</script>`);

              // Pre-activate blog page view
              html = html.replace('<div class="blog-page-view" id="blogPageView" aria-hidden="true" role="dialog" aria-modal="true">', '<div class="blog-page-view active" id="blogPageView" aria-hidden="false" role="dialog" aria-modal="true">');
              html = html.replace('<body>', '<body class="blog-view-open">');

              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.statusCode = 200;
              res.end(html);
              return;
            }
          } catch (err) {
            console.error('Error in blog SEO middleware:', err);
            return next();
          }
        }

        return next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), heroUploadPlugin(), blogSeoPlugin()],
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
