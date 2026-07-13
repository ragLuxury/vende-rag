import { createServer } from 'node:http';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import nextEnv from '@next/env';
import next from 'next';

const { loadEnvConfig } = nextEnv;

const currentDir = dirname(fileURLToPath(import.meta.url));
loadEnvConfig(currentDir, false);

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const hostname = process.env.HOSTNAME ?? '0.0.0.0';

const app = next({ dev: false, dir: currentDir });
const handle = app.getRequestHandler();

void app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, hostname, () => {
      console.log(`> Server listening on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
