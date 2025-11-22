import express from "express";
import cors from "cors";
import axios from "axios";
import 'dotenv/config';
import pino from "pino-http";

const app = express();
app.use(express.json());
app.use(cors());
app.use(pino());

const PORT = process.env.PORT ?? 3000;
const BASE_URL = "https://jsonplaceholder.typicode.com";

// GET /notes → отримуємо всі пости
app.get("/notes", async (req, res, next) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// GET /notes/:noteId → отримуємо один пост за id
app.get("/notes/:noteId", async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const response = await axios.get(`${BASE_URL}/posts/${noteId}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "Post not found" });
    } else {
      next(error);
    }
  }
});

// GET /test-error → штучна помилка для перевірки middleware
app.get("/test-error", (req, res) => {
  throw new Error("Test error");
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Middleware помилок
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
