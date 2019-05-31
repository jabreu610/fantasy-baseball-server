import express from 'express';
import asyncHandler from 'express-async-handler';
import graphqlHTTP from 'express-graphql';

import schema from './schema';
import rootValue from './resolvers';
import db from './db';

const PORT = process.env.PORT;
const shutdown = async (): Promise<void> => {
  await db.close();
  console.log('Cleanup complete');
  process.exit(0);
};

(async (): Promise<void> => {
  const app = express();
  db.init();
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('SIGUSR2', shutdown);
  app.get(
    '/',
    asyncHandler(
      async (req, res): Promise<void> => {
        res.send('Hello World');
      }
    )
  );
  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true,
    })
  );
  await app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
})();
