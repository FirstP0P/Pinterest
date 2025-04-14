// routes/comment.js
import express from "express";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamodb } from "./dynamodb.js";
import crypto from "crypto";

const router = express.Router();

router.post("/", async (req, res) => {
  const { postId, userId, username, text } = req.body;

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
      })
    );

    res.json({ success: true, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to add comment" });
  }
});

export default router;
