import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';



const app = express();
const PORT: number = 8080;

app.use(express.json());
app.use(cors({
  credentials: true
}));

// Proxy route: /proxy?target=https://example.com
app.get('/proxy', async (req: Request, res: Response): Promise<any> => {
  // Cast target query explicitly as a string
  const targetUrl = req.query.target as string | undefined;

  // 1. Validate that the parameter exists
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing required "target" URL parameter.' });
  }

  // 2. Security validation
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid URL format. Target must start with http:// or https://' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers as Record<string, string>
    });
    const result = await response.text();
    console.info(`Forwarded request to: ${targetUrl} with status: ${response.status}`);
    console.log(result);
    let data: null | Record<string, string> = null;

    try {
      data = JSON.parse(result);
    } catch (parseError) {
      console.warn('Failed to parse response as JSON:', parseError);
      return res.status(401).json(parseError);
    }

    return res.status(response.status).json(data);
  } catch (error: any) {
    return res.status(502).json({
      error: 'Failed to fetch from target server.',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`TypeScript proxy server running on http://localhost:${PORT}`);
});



// Force exit the process when Ctrl + C is pressed
process.on('SIGINT', () => {
  console.log('\nShutting down proxy server gracefully...');
  process.exit(0);
});

// Force exit if the terminal process environment closes
process.on('SIGTERM', () => {
  process.exit(0);
});

// kill -9 $(lsof -t -i:8080)