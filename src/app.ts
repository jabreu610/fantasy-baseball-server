import express from 'express';
import asyncHandler from 'express-async-handler';
import graphqlHTTP from 'express-graphql';

import schema from './schema';
import rootValue from './resolvers';

const PORT = process.env.PORT;

(async (): Promise<void> => {
  const app = express();
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
