/**
 * Vercel Serverless Function - Proxy for /api/results/{jobId}
 * 
 * Proxies result polling requests to the backend API
 */

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { jobId } = req.query;

    if (!jobId) {
        return res.status(400).json({ error: 'Job ID is required' });
    }

    try {
        const backendUrl = process.env.BACKEND_API_URL || 'http://146.190.129.92:8000';
        const response = await fetch(`${backendUrl}/api/results/${jobId}`);

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

