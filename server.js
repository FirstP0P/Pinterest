import express from "express";
import { uploadToS3, uploadMiddleware, getPosts } from "./s3server.js";
import cors from "cors";
import { dynamodb } from "./dynamodb.js";
import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Upload image to S3 + save metadata to DynamoDB
app.post("/upload", uploadMiddleware(), async (req, res) => {
  try {
    const postData = {
      userId: req.body.userId,
      username: req.body.username,
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt,
      likes: req.body.likes ? JSON.parse(req.body.likes) : [],
      comments: req.body.comments ? JSON.parse(req.body.comments) : [],
    };

    const result = await uploadToS3(req.file, postData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like/Unlike a post
app.post("/like", async (req, res) => {
  const { postId, userId, liked } = req.body;

  try {
    const postData = await dynamodb.send(
      new GetCommand({ TableName: "Posts", Key: { id: postId } })
    );

    const existingLikes = postData.Item.likes || [];
    let updatedLikes;

    if (liked) {
      // Add like
      updatedLikes = [...new Set([...existingLikes, userId])];
    } else {
      // Remove like
      updatedLikes = existingLikes.filter((id) => id !== userId);
    }

    await dynamodb.send(
      new UpdateCommand({
        TableName: "Posts",
        Key: { id: postId },
        UpdateExpression: "SET likes = :likes",
        ExpressionAttributeValues: {
          ":likes": updatedLikes,
        },
      })
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ success: false, error: "Failed to update likes" });
  }
});

// Add a comment
app.post("/comment", async (req, res) => {
  const { postId, userId, username, text } = req.body;

//   if (!postId || !userId || !username || !text) {
//   return res.status(400).json({ error: "Missing required fields" });
// }

  const comment = {
    id: crypto.randomUUID(),
    userId,
    username,
    text,
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamodb.send(
      new UpdateCommand({
        TableName: "Posts",
        Key: { id: postId },
        UpdateExpression: "SET comments = list_append(if_not_exists(comments, :empty), :comment)",
        ExpressionAttributeValues: {
          ":comment": [comment],
          ":empty": [],
        },
      }),
      { removeUndefinedValues: true }
    );

    res.json({ success: true, comment });
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ success: false, error: "Failed to add comment" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
