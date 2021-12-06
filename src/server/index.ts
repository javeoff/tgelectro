import path from 'path';
import express from 'express';
import next from 'next';
import Knex from 'knex';

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3_001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

export const knex = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3_306,
    user: 'root',
    password: 'root',
    database: 'tglegard',
  },
});

app
  .prepare()
  .then(() => {
    const server = express();
    const staticPath = path.join(__dirname, '../assets');

    server.use(
      '/static',
      express.static(staticPath, {
        maxAge: '30d',
        immutable: true,
      }),
    );

    server.get('*', (req, res): void => {
      (async () => {
        await handler(req, res);
      })();
    });

    const startServer = (): void => {
      server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${port}`);
      });
    };

    startServer();

    return undefined;
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
