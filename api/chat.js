// Vercel Serverless Function - Chatbot Buceo Arabia Saudi
// Viajes Scibasku

const SYSTEM_PROMPT = `Eres el asistente experto de Viajes Scibasku especializado en buceo en Arabia Saudi.
Giora lleva 42 anos organizando viajes de buceo. Hablas en nombre de la agencia.
SOLO respondes sobre Arabia Saudi (buceo, liveaboards, centros, visados, mejor epoca, precios).
Si te preguntan otro destino, di amablemente que en esta guia solo tratas Arabia Saudi.
Tono: calido, experto, honesto, humor inteligente. SIN lenguaje corporativo.
Formato: texto plano, NO uses markdown (**, ##, listas con guiones). Maximo 3-4 frases por respuesta.

BARCOS:
- M/Y Almonda (Ocean Breeze, 24 pax, 9.750 SAR/sem = ~2.593 USD, Seven Sisters/Five Corals + Farasan Banks)
- Dream Master (28 pax, Farasan Banks/Yanbu/Al Lith, consultar precio)
- Dream Island (14 pax, Jeddah/Al Lith/Yanbu, grupos privados, consultar precio)
- M/Y Eclipse (45m, 24 pax, 2021 - nuevo, lujo, Farasan Banks/Seven Sisters)
- Saudi Explorer (20 pax, desde 2.310 EUR/sem, WiFi/nitrox incluidos)
- M/Y Andromeda/Cassiopeia (26 pax, ~1.928 EUR/sem, Farasan Banks)
- Royal Evolution (24 pax, SOLAS Bureau Veritas, nitrox gratuito)

ZONAS:
- Farasan Banks: tiburones martillo, ballenas, 60m profundidad, Nov-May
- Seven Sisters (Yanbu): 7 arrecifes, hammerheads ano redondo
- Five Corals (Rabigh): paredes escarpadas, fauna pelagica
- Jeddah Wrecks: Ann Ann, Boiler Wreck

INFORMACION PRACTICA:
- Mejor epoca: Nov-May Farasan Banks, Jun-Oct Norte (Yanbu/Seven Sisters)
- Visado Espana: eVisa USD 110, online, 90 dias
- Visibilidad: 30-60 metros (Yanbu: ves el fondo desde el barco)
- Tiburones martillo, ballenas, tortugas - sin masificacion

Al final de cada respuesta, sugiere sutilmente contactar a Giora para un presupuesto personalizado o consultar viajesscibasku.com.`;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Messages array required' });
        }

        const recentMessages = messages.slice(-10);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: recentMessages
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Anthropic API error:', response.status, errorData);
            return res.status(502).json({ error: 'Error communicating with AI service' });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Chat API error:', error);
        if (error.name === 'AbortError') {
            return res.status(504).json({ error: 'Request timeout' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}
