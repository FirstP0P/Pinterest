import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaEllipsisH } from "react-icons/fa";
import "./PhotoCard.css";

function PhotoCard({ photo, user }) {
 // const [likes, setLikes] = useState(photo.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(photo?.likes?.includes(user?.profile["sub"]));
  const [likesCount, setLikesCount] = useState(photo?.likes?.length);
  const [comments, setComments] = useState(photo?.comments || []);

  const handleLike = async () => {
  if (!user) return;

  const newLiked = !liked;
  setLiked(newLiked);
  setLikesCount(newLiked ? likesCount + 1 : likesCount - 1);

  try {
    await fetch("http://localhost:5000/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: photo.id,
        userId: user?.profile["sub"],
        liked: newLiked,
      }),
    });
  } catch (error) {
    console.error("Like error:", error);
  }
};

const handleComment = async (e) => {
  e.preventDefault();
  if (!comment.trim() || !user) return;

  try {
    const res = await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: photo.id,
        userId: user?.profile["sub"],
        username: user?.profile["cognito:username"],
        text: comment,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setComments([...comments, data.comment]);
      setComment("");
    }
  } catch (error) {
    console.error("Comment error:", error);
  }
};

  return (
    <div className="photo-card">
      <div className="photo-image-container">
        <img src={photo.imageUrl} alt={photo.title} className="photo-image" />
        <div className="photo-overlay">
          <div className="overlay-actions">
            <button className="save-button">Save</button>
            <button className="more-options">
              <FaEllipsisH />
            </button>
          </div>
        </div>
      </div>

      <div className="photo-info">
        <h3 className="photo-title">{photo.title}</h3>
        <p className="photo-description">{photo.description}</p>

        <div className="photo-meta">
          <div className="photo-author">
    
          </div>

          <div className="photo-actions">
            <button
              className={`action-button like-button ${likesCount ? "liked" : ""}`}
              onClick={handleLike}
            >
              {likesCount ? <FaHeart /> : <FaRegHeart />}
              <span>{likesCount}</span>
            </button>

            <button
              className="action-button comment-button"
              onClick={() => setShowComments(!showComments)}
            >
              <FaComment />
              <span>{comments?.length}</span>
            </button>
          </div>
        </div>

        {showComments && (
          <div className="comments-section">
            <h4 className="comments-title">Comments</h4>

            <div className="comments-list">
              {photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <div className="comment-avatar">{comment.username.charAt(0).toUpperCase()}</div>
                    <div className="comment-content">
                      <strong className="comment-username">{comment.username}</strong>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet</p>
              )}
            </div>

            {user && (
              <form onSubmit={handleComment} className="comment-form">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
                <button type="submit" className="comment-submit">Post</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCard;