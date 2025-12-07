import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);

app.use(
  express.json({
    type: ['application/json'],
    limit: '100kb',
  })
);

app.use(cors());

// ---- ROUTES ----
app.use('/api', notesRouter);

// ---- NOT FOUND ----
app.use(notFoundHandler);

// ---- CELEBRATE ERRORS ----
app.use(errors());

// ---- GLOBAL ERROR HANDLER ----
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
