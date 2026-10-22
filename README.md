# 🦒 GiraTek Feed — Portal de Noticias Autónomo

<p align="center">
  <img src="./assets/giratek-logo-v3.jpg?v=3" alt="GiraTek Logo" width="240" style="border-radius: 28px; box-shadow: 0 12px 35px rgba(16,185,129,0.35); border: 2px solid rgba(16,185,129,0.4);" />
</p>

> **GiraTek: Portal automatizado de noticias sobre Inteligencia Artificial, Videojuegos y Tecnología.**  
> Curado y sintetizado automáticamente por un agente en **n8n** potenciado por **Google Gemini AI**, con enlaces de fuente directa 100% verificados (0% errores 404), desplegado en **GitHub Pages** con costo de infraestructura $0.

🌐 **Sitio Web en Vivo:** [https://king1angel.github.io/tech-news/](https://king1angel.github.io/tech-news/)  
👤 **Autor:** [Ing. Angel Peña](https://github.com/King1Angel)

---

## 🏛️ Arquitectura del Sistema GiraTek

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        1. MOTOR GIRATEK EN N8N                         │
└────────────────────────────────────────────────────────────────────────┘
                                    │
  1. Cron Trigger                   │ Ejecuta cada 6 horas.
         │                          │
         ▼                          │
  2. RSS Feeds                      │ Ingesta de Xataka, TechCrunch, Eurogamer, GitHub.
         │                          │
         ▼                          │
  3. Nodo IA (Gemini 2.5)           │ Traduce, sintetiza, categoriza y conserva enlaces directos.
         │                          │
         ▼                          │
  4. GitHub API (Contents)          │ Hace commit automático de data/noticias.json en el repo.
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                    2. GITHUB & FRONTEND DISTRIBUIDO                    │
└────────────────────────────────────────────────────────────────────────┘
                                    │
  5. Repositorio (King1Angel)       │ Almacena el código y los datos versionados.
         │                          │
         ▼                          │
  6. GitHub Actions                 │ Despliegue estático continuo a GitHub Pages CDN.
         │                          │
         ▼                          │
  7. Frontend Web (HTML/Tailwind)   │ Fetch dinámico client-side (anti-caché) del JSON.
```

---

## ⚡ Características Principales

- **🦒 Identidad GiraTek:** Diseño visual cyberpunk y futurista con logotipo oficial y paleta en acentos cian y esmeralda.
- **🤖 Automatización Total:** Cero redacción manual. El agente n8n orquesta la lectura, procesamiento, traducción y publicación.
- **🔗 Enlaces Directos a Noticias:** Cada artículo redirige exactamente a su noticia original y no a la portada o categoría genérica.
- **💰 Costo de Infraestructura $0:** Sin base de datos relacional externa, sin servidores Node/Django de pago.
- **🎨 UI Moderna & Responsive:** Diseñada con Tailwind CSS, glassmorphism oscuro, filtros reactivos por categoría (IA, Gaming, Hardware, Software), buscador en tiempo real y modal de lectura extendida.
- **🔄 Anti-Caché Inteligente:** El frontend consulta `data/noticias.json?_t=[timestamp]` para reflejar los cambios de n8n al instante sin depender de la caché del navegador.
- **🛡️ Versionado Git:** Cada actualización de noticias genera un commit en el historial del repositorio con trazabilidad de cambios.

---

## 📂 Estructura del Proyecto

```text
tech-news/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Despliegue automatizado a GitHub Pages
├── assets/
│   └── giratek-logo.jpg            # Logotipo oficial de GiraTek
├── data/
│   └── noticias.json               # Almacén de datos JSON actualizado por n8n
├── index.html                      # Interfaz web responsiva en Tailwind CSS
├── n8n-workflow-tech-news.json     # Workflow completo listo para importar en n8n
└── README.md                       # Documentación técnica
```

---

## 🛠️ Puesta en Marcha

### 1. Configurar tu Token de GitHub (PAT)
Para que n8n pueda escribir en este repositorio:
1. Ve a tu cuenta de GitHub: **Settings > Developer Settings > Personal access tokens > Tokens (classic)**.
2. Genera un nuevo token con permisos marcados para: `repo` (Full control of private repositories / public repositories).
3. Copia el token generado.

### 2. Importar el Flujo en n8n
1. Abre tu instancia de n8n.
2. Ve a **Workflows > Import from File** y selecciona `n8n-workflow-tech-news.json`.
3. En el nodo **Gemini AI Synthesizer**: conecta tus credenciales de Google Gemini API.
4. En los nodos **Obtener SHA Actual de GitHub** y **GitHub API - Actualizar noticias.json**:
   - Reemplaza `TU_GITHUB_PERSONAL_ACCESS_TOKEN` por tu token PAT real.
5. Haz clic en **Test Step** para probar la ejecución y luego activa el switch **Active** del workflow.

---

## 👨‍💻 Autor

**Ing. Angel Peña**
- 🐙 **GitHub:** [@King1Angel](https://github.com/King1Angel)
