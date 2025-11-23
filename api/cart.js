/**
 * Vercel Serverless Function - Proxy for /api/cart
 * 
 * Proxies cart submission requests to the backend API
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const backendUrl = process.env.BACKEND_API_URL || 'http://146.190.129.92:8000';
        const response = await fetch(`${backendUrl}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(response.status).json(data);
        
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ 
            error: 'Failed to contact backend API',
            details: error.message 
        });
    }
}

