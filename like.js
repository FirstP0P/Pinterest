// routes/like.js
import express from "express";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { dynamodb } from "./dynamodb.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { postId, userId, liked } = req.body;

  try {
    const updateParams = {
      TableName: "Posts",
      Key: { id: postId },
      UpdateExpression: liked
        ? "SET likes = list_append(if_not_exists(likes, :empty), :user)"
        : "SET likes = list_remove(likes, :index)",
      ExpressionAttributeValues: {
        ":user": [userId],
        ":empty": [],
      },
      ReturnValues: "ALL_NEW",
    };

    if (!liked) {
      const post = await dynamodb.send(
        new GetCommand({ TableName: "Posts", Key: { id: postId } })
      );

      const index = post.Item.likes.indexOf(userId);
      if (index > -1) {
        updateParams.ExpressionAttributeValues[":index"] = [index];
      } else {
        return res.json({ success: true, message: "User not in like list" });
      }
    }

    await dynamodb.send(new UpdateCommand(updateParams));
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to update likes" });
  }
});

export default router;
