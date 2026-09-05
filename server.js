import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta dist (gerada pelo build do Vite)
// Se dist ainda não tiver sido gerada, serve a partir da raiz
const distPath = path.join(__dirname, 'dist');
const staticPath = fs.existsSync(distPath) ? distPath : __dirname;

app.use(express.static(staticPath));

// Redireciona todas as demais rotas para o index.html
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
