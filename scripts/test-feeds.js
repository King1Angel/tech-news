const https = require('https');

async function testAllFeeds() {
  const feeds = [
    { name: 'Xataka (Tecnología)', url: 'https://feeds.feedburner.com/xataka', cat: 'tecnologia' },
    { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', cat: 'ia' },
    { name: 'Eurogamer (Gaming)', url: 'https://www.eurogamer.net/feed', cat: 'gaming' },
    { name: 'GitHub Blog (Dev/Software)', url: 'https://github.blog/feed/', cat: 'software' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', cat: 'tecnologia' },
    { name: 'Genbeta (Software/IA)', url: 'https://feeds.feedburner.com/genbeta', cat: 'software' }
  ];

  console.log('--- INICIANDO PRUEBAS DE FEEDS Y EXTRACCIÓN DE ENLACES VERDADEROS ---');

  for (const f of feeds) {
    try {
      const res = await fetch(f.url, { 
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } 
      });
      const text = await res.text();
      
      // Match items
      const items = text.match(/<item[\s\S]*?<\/item>/gi) || [];
      console.log(`\n📡 Feed: ${f.name} [Status: ${res.status}] -> ${items.length} artículos encontrados`);
      
      for (let i = 0; i < Math.min(2, items.length); i++) {
        const item = items[i];
        
        // Extract title
        const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : 'Sin título';
        
        // Extract links: check feedburner:origLink first, then link, then guid
        const origLinkMatch = item.match(/<feedburner:origLink>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/feedburner:origLink>/i);
        const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
        const guidMatch = item.match(/<guid[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/guid>/i);
        
        let link = '';
        if (origLinkMatch && origLinkMatch[1]) link = origLinkMatch[1].trim();
        else if (linkMatch && linkMatch[1]) link = linkMatch[1].trim();
        else if (guidMatch && guidMatch[1] && guidMatch[1].startsWith('http')) link = guidMatch[1].trim();

        // Extract image if available
        let imageUrl = '';
        const mediaMatch = item.match(/<(?:media:content|enclosure)[^>]*url=["']([^"']+)["']/i);
        if (mediaMatch) imageUrl = mediaMatch[1];
        
        // Clean URL
        link = link.replace(/<!\[CDATA\[|\]\]>/g, '').trim();

        // Now test if the URL really resolves and doesn't return 404
        let httpStatus = 0;
        let finalUrl = link;
        try {
          const checkRes = await fetch(link, {
            method: 'GET',
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
            redirect: 'follow'
          });
          httpStatus = checkRes.status;
          finalUrl = checkRes.url;
        } catch (err) {
          httpStatus = 'FAIL: ' + err.message;
        }

        console.log(`  [Artículo ${i+1}]`);
        console.log(`    Título: ${title.slice(0, 60)}...`);
        console.log(`    Link extraído: ${link}`);
        console.log(`    Status HTTP: ${httpStatus} ${httpStatus === 200 ? '✅ (VÁLIDO)' : '❌ (ERROR)'}`);
        if (finalUrl !== link) {
          console.log(`    Redirección final: ${finalUrl}`);
        }
      }
    } catch (e) {
      console.error(`Error procesando feed ${f.name}:`, e.message);
    }
  }
}

testAllFeeds();
