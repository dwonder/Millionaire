import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { azureLeaderboardService } from './azureStorageService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Routes for Azure Database Storage Leaderboard
  app.get('/api/leaderboard', async (_req, res) => {
    try {
      const top10 = await azureLeaderboardService.getTopScores(10);
      const status = azureLeaderboardService.getStatus();
      res.json({
        success: true,
        leaderboard: top10,
        status,
      });
    } catch (error: any) {
      console.error('[API /api/leaderboard GET] Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.post('/api/leaderboard', async (req, res) => {
    try {
      const { playerName, score, scoreValue, questionLevel, isWinner, date, title, attempts } = req.body;

      if (!playerName || typeof score === 'undefined') {
        return res.status(400).json({ success: false, error: 'Missing playerName or score' });
      }

      const computedScoreValue =
        typeof scoreValue === 'number' && !isNaN(scoreValue)
          ? scoreValue
          : parseInt(String(score).replace(/[^0-9]/g, ''), 10) || 0;

      const result = await azureLeaderboardService.addScore({
        playerName: String(playerName).trim().slice(0, 35) || 'Anonymous Agent',
        score: String(score),
        scoreValue: computedScoreValue,
        questionLevel: Number(questionLevel) || 0,
        isWinner: Boolean(isWinner),
        date: date || new Date().toISOString(),
        title: title || 'Cybersecurity Contestant',
        attempts: Number(attempts) || undefined,
      });

      res.json({
        success: true,
        ...result,
      });
    } catch (error: any) {
      console.error('[API /api/leaderboard POST] Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  app.get('/api/leaderboard/status', (_req, res) => {
    res.json({
      success: true,
      status: azureLeaderboardService.getStatus(),
    });
  });

  app.post('/api/leaderboard/reset', (_req, res) => {
    const top10 = azureLeaderboardService.resetToDefaults();
    res.json({
      success: true,
      message: 'Leaderboard reset to default cybersecurity champions',
      top10,
    });
  });

  // Vite development middleware or static production serve
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use((req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Cyber Millionaire server running at http://0.0.0.0:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
