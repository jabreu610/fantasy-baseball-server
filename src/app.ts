import express from 'express';
import asyncHandler from 'express-async-handler';

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
  await app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
})();
