import { getCollection } from 'astro:content';

const site = 'https://wordpress-offenbach.de';

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const urls = [
    { loc: '/', lastmod: new Date() },
    ...(posts.length ? [{ loc: '/blog/', lastmod: new Date(Math.max(...posts.map((p) => p.data.date.valueOf()))) }] : []),
    ...posts.map((p) => ({ loc: `/blog/${p.id}/`, lastmod: p.data.date })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${site}${u.loc}</loc>\n    <lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
