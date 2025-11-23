/**
 * Vercel Serverless Function - Proxy for /api/clarify
 * 
 * This acts as a bridge between the HTTPS Vercel frontend and HTTP backend API.
 * Browsers block mixed content (HTTPS → HTTP), so this serverless function
 * proxies the request over the server side where mixed content isn't blocked.
 */

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Forward request to backend API
        const backendUrl = process.env.BACKEND_API_URL || 'http://146.190.129.92:8000';
        const response = await fetch(`${backendUrl}/api/clarify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        // Return response
        return res.status(response.status).json(data);
        
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ 
            error: 'Failed to contact backend API',
            details: error.message 
        });
    }
}

