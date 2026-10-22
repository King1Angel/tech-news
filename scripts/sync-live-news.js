const fs = require('fs');
const path = require('path');

// RSS Feeds configuration
const FEEDS = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    categoria: 'Inteligencia Artificial',
    categoria_slug: 'ia',
    defaultImg: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Xataka',
    url: 'https://feeds.feedburner.com/xataka',
    categoria: 'Tecnología',
    categoria_slug: 'tecnologia',
    defaultImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Eurogamer',
    url: 'https://www.eurogamer.net/feed',
    categoria: 'Videojuegos',
    categoria_slug: 'gaming',
    defaultImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'GitHub Blog',
    url: 'https://github.blog/feed/',
    categoria: 'Software & Dev',
    categoria_slug: 'software',
    defaultImg: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: '3DJuegos',
    url: 'https://www.3djuegos.com/universo/rss/rss.php',
    categoria: 'Videojuegos',
    categoria_slug: 'gaming',
    defaultImg: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Genbeta',
    url: 'https://www.genbeta.com/feedburner.xml',
    categoria: 'Software & Dev',
    categoria_slug: 'software',
    defaultImg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  }
];

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

async function verifyUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      redirect: 'follow'
    });
    return { ok: res.status >= 200 && res.status < 400, status: res.status, finalUrl: res.url };
  } catch (err) {
    return { ok: false, status: err.message, finalUrl: url };
  }
}

async function fetchFeed(feedConfig) {
  try {
    const res = await fetch(feedConfig.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`[WARN] Feed ${feedConfig.name} respondió con código ${res.status}`);
      return [];
    }

    const xml = await res.text();
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    const parsed = [];

    for (const itemXml of items.slice(0, 5)) {
      // Title
      const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      let title = titleMatch ? cleanHtml(titleMatch[1]) : '';
      if (!title) continue;

      // Link: Prioritize feedburner:origLink, then direct link, then guid if URL
      const origMatch = itemXml.match(/<feedburner:origLink>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/feedburner:origLink>/i);
      const linkMatch = itemXml.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      const guidMatch = itemXml.match(/<guid[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/guid>/i);

      let link = '';
      if (origMatch && origMatch[1]) link = origMatch[1].trim();
      else if (linkMatch && linkMatch[1]) link = linkMatch[1].trim();
      else if (guidMatch && guidMatch[1] && guidMatch[1].trim().startsWith('http')) link = guidMatch[1].trim();

      link = link.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
      if (!link || !link.startsWith('http')) continue;

      // Snippet / description
      const descMatch = itemXml.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
      const contentMatch = itemXml.match(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/i);
      let snippet = cleanHtml(descMatch ? descMatch[1] : (contentMatch ? contentMatch[1] : ''));
      if (snippet.length > 350) snippet = snippet.slice(0, 350) + '...';

      // Pub date
      const dateMatch = itemXml.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
      let pubDate = dateMatch ? new Date(dateMatch[1].trim()) : new Date();
      if (isNaN(pubDate.getTime())) pubDate = new Date();

      // Media / Image
      let image = '';
      const mediaMatch = itemXml.match(/<(?:media:content|enclosure)[^>]*url=["']([^"']+)["']/i);
      if (mediaMatch && mediaMatch[1] && !mediaMatch[1].endsWith('.mp3')) {
        image = mediaMatch[1];
      }

      parsed.push({
        title,
        link,
        snippet,
        pubDate,
        image: image || feedConfig.defaultImg,
        source: feedConfig.name,
        categoria: feedConfig.categoria,
        categoria_slug: feedConfig.categoria_slug
      });
    }

    return parsed;
  } catch (err) {
    console.error(`Error en feed ${feedConfig.name}:`, err.message);
    return [];
  }
}

async function main() {
  console.log('=== GiraTek: Extrayendo y Validando Enlaces Reales de Noticias ===\n');

  const allArticles = [];

  for (const feed of FEEDS) {
    console.log(`Buscando noticias de: ${feed.name}...`);
    const items = await fetchFeed(feed);
    allArticles.push(...items);
  }

  console.log(`\nTotal recolectado: ${allArticles.length} noticias.`);
  console.log('Iniciando verificación HTTP de cada enlace para descartar 404s...\n');

  const verifiedArticles = [];

  for (const art of allArticles) {
    process.stdout.write(`Verificando [${art.source}] "${art.title.slice(0, 35)}..." -> `);
    const check = await verifyUrl(art.link);
    if (check.ok) {
      console.log(`✅ ${check.status} (${check.finalUrl.slice(0, 50)}...)`);
      art.link = check.finalUrl; // Store the exact final resolved link
      verifiedArticles.push(art);
    } else {
      console.log(`❌ ERROR ${check.status} - Descartado`);
    }
  }

  console.log(`\nArtículos 100% verificados sin 404: ${verifiedArticles.length}`);

  // Select the top 10 diverse articles across categories
  const selected = [];
  const categoriesCount = { ia: 0, gaming: 0, tecnologia: 0, software: 0 };
  
  for (const art of verifiedArticles) {
    if (categoriesCount[art.categoria_slug] < 3 && selected.length < 10) {
      categoriesCount[art.categoria_slug]++;
      selected.push(art);
    }
  }

  // Format into final GiraTek JSON structure
  const formattedNews = selected.map((art, idx) => {
    // Determine tags
    const tags = [art.categoria.split(' ')[0]];
    if (art.title.toLowerCase().includes('ai') || art.title.toLowerCase().includes('claude') || art.title.toLowerCase().includes('ia')) tags.push('IA');
    if (art.title.toLowerCase().includes('game') || art.title.toLowerCase().includes('juego') || art.categoria_slug === 'gaming') tags.push('Gaming');
    if (art.title.toLowerCase().includes('seguridad') || art.title.toLowerCase().includes('vulnerabilidad')) tags.push('Seguridad');
    if (art.title.toLowerCase().includes('git') || art.title.toLowerCase().includes('copilot') || art.title.toLowerCase().includes('code')) tags.push('Dev');
    if (tags.length < 3) tags.push(art.source);

    const dateFormatted = art.pubDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

    return {
      id: `news-${art.pubDate.toISOString().slice(0, 10).replace(/-/g, '')}-${String(idx + 1).padStart(2, '0')}`,
      titulo: art.title,
      categoria: art.categoria,
      categoria_slug: art.categoria_slug,
      destacada: idx === 0, // First article is hero/featured
      resumen: art.snippet || `${art.title}. Cobertura tecnológica curada automáticamente por el motor GiraTek.`,
      contenido_extendido: `Reporte original publicado por ${art.source}. Para acceder a todos los análisis técnicos, entrevistas y material multimedia adicional, consulta la cobertura completa en el enlace oficial de la fuente original.`,
      imagen: art.image,
      fecha: dateFormatted,
      tiempo_lectura: `${Math.max(2, Math.min(5, Math.ceil(art.title.length / 25)))} min`,
      fuente_nombre: art.source,
      fuente_url: art.link,
      tags: [...new Set(tags)]
    };
  });

  const finalJson = {
    ultima_actualizacion: new Date().toISOString(),
    agente: "GiraTek Autonomous News Engine v2.5 (Gemini AI + Direct Feed Resolver)",
    total: formattedNews.length,
    noticias: formattedNews
  };

  const outputPath = path.resolve(__dirname, '../data/noticias.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalJson, null, 2), 'utf-8');
  console.log(`\n🎉 Archivo actualizado con éxito en: ${outputPath}`);
  console.log(`Total noticias generadas: ${formattedNews.length}`);
}

main();
