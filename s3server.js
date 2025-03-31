import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import multer from "multer";

dotenv.config(); // Load environment variables

// AWS S3 Config
const s3 = new S3Client({
  region: process.env.VITE_AWS_REGION, // Example: "eu-north-1"
  endpoint: `https://s3.${process.env.VITE_AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// Multer middleware for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function uploadToS3(file) {
  try {
    if (!file) throw new Error("No file provided");

    // Generate unique filename
    const fileExtension = file.originalname.split(".").pop();
    const uniqueName = `${crypto.randomUUID()}.${fileExtension}`;

    // Upload to S3
    const params = {
      Bucket: process.env.VITE_AWS_BUCKET_NAME,
      Key: uniqueName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return {
      success: true,
      fileUrl: `https://${process.env.VITE_AWS_BUCKET_NAME}.s3.${process.env.VITE_AWS_REGION}.amazonaws.com/${uniqueName}`,
      filename: uniqueName,
    };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    console.log("Bucket Name:", process.env.VITE_AWS_BUCKET_NAME);
    throw new Error("Upload failed");
  }
}

export function uploadMiddleware() {
  return upload.single("file");
}
