import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectMongoDB } from './db/connectMongoDB.js';
import pino from "pino-http";
import { Note } from "./models/note.js";
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';


const app = express();
const PORT = process.env.PORT ?? 3000;


app.use(logger);
app.use(express.json({
  limit: '100kb',
}));

app.use(cors());

app.use(notesRoutes);


app.use(pino());

// GET all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

// GET note by ID
app.get("/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(note);
});

// Test error
app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
