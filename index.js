import { connectToMongoDb } from './db/connectToMongoDb.js';
import { startServer } from './server.js';

await connectToMongoDb();
startServer();
