# Arabia Saudi - Guia de Buceo | Viajes Scibasku

Landing page interactiva para buceo en Arabia Saudi con chatbot IA, catalogo de 7 liveaboards y directorio de centros de buceo.

## URLs

| Recurso | URL |
|---------|-----|
| Web Joomla | https://viajesscibasku.com/buceo/119-arabia-saudi.html |
| App Vercel | https://viajes-scibasku-arabia-saudi.vercel.app |
| Chatbot interactivo | https://viajes-scibasku-arabia-saudi.vercel.app/chat.html |

## Estructura

```
public/
  index.html      # Landing page React 18 + Tailwind CDN
  chat.html        # Chatbot + barcos + centros (embebido en Joomla via iframe)
api/
  chat.js          # Serverless function (Haiku 4.5, 1024 tokens, 15s timeout)
vercel.json        # Rewrites + headers iframe
```

## 7 Liveaboards verificados

| Barco | Operador | Email | Precio/semana |
|-------|----------|-------|---------------|
| M/Y Almonda | Ocean Breeze Liveaboards | info@oceanbreeze-liveaboards.com | ~2.593 USD |
| Dream Master | Dream Divers | Eric@dreamdiver.sa | Consultar |
| Dream Island | Dream Divers | Eric@dreamdiver.sa | Consultar |
| M/Y Eclipse | Eclipse Red Sea | info@eclipse-redsea.com | Consultar |
| Saudi Explorer | La Compagnia del Mar Rosso | info@mar-rosso.it | 2.310 EUR |
| M/Y Andromeda | Cassiopeia Safari | info@cassiopeiasafari.com | 1.928 EUR |
| Royal Evolution | Royal Evolution | royalevolution.com | Consultar |

## Zonas de buceo

- **Farasan Banks** (sur, Al Lith) - Tiburones martillo, Nov-May, 60m
- **Seven Sisters** (Yanbu) - 7 arrecifes, todo el ano, 40m
- **Five Corals** (Rabigh) - Fauna pelagica, Nov-May, 35m
- **Jeddah Wrecks** (Jeddah) - Pecios historicos, Oct-May, 25m

## Variables de entorno

```
ANTHROPIC_API_KEY   # Clave API Anthropic (modelo: claude-haiku-4-5-20251001)
```

## Deploy

```bash
npx vercel --prod
npx vercel alias scibasku-arabia-saudi.vercel.app viajes-scibasku-arabia-saudi.vercel.app
```

## Fecha

Febrero 2026 - v1.0