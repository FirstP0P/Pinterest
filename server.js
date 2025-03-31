import express from "express";
import multer from "multer";
import { uploadToS3, uploadMiddleware } from "./s3server.js";
import cors from "cors";

// Multer middleware (for handling file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

app.post("/upload", uploadMiddleware(), async (req, res) => {
  try {
    const result = await uploadToS3(req.file);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
