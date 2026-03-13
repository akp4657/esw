'use strict';

const fs = require('fs');
const upath = require('upath');

const distPath = upath.resolve(__dirname, '../dist');
const baseUrl = (process.env.SITE_BASE_URL || 'https://eswwrestling.com').replace(/\/$/, '');
const lastmod = new Date().toISOString().split('T')[0];

const pages = [
    '',
    'roster.html',
    'history.html',
    'hostesw.html',
    'fundraising.html',
    'sponsorships.html',
    'store.html',
    'bwa.html'
];

const sitemapUrls = pages
    .map((path) => {
        const loc = path ? `${baseUrl}/${path}` : baseUrl;
        return `    <url>\n        <loc>${loc}</loc>\n        <lastmod>${lastmod}</lastmod>\n    </url>`;
    })
    .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
}
fs.writeFileSync(upath.join(distPath, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(upath.join(distPath, 'robots.txt'), robotsTxt);
