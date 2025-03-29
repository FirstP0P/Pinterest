import { useState } from "react";

function PhotoCard({ photo, user }) {
  const [liked, setLiked] = useState(photo.likes.includes(user?.id));
  const [likesCount, setLikesCount] = useState(photo.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = () => {
    if (!user) return;

    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);

    // Here you would call your API to update likes
    // updateLike(photo.id, user.id, !liked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    // Here you would call your API to add the comment
    // addComment(photo.id, user.id, comment);

    // For now, let's just update the local state
    photo.comments.push({
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      text: comment,
      createdAt: new Date().toISOString(),
    });

    setComment("");
  };

  return (
    <div className="photo-card">
      <img src={photo.imageUrl} alt={photo.title} className="photo-image" />

      <div className="photo-info">
        <h3>{photo.title}</h3>
        <p className="photo-description">{photo.description}</p>

        <div className="photo-actions">
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            ♥ {likesCount}
          </button>

          <button
            className="comment-button"
            onClick={() => setShowComments(!showComments)}
          >
            💬 {photo.comments.length}
          </button>
        </div>

        {showComments && (
          <div className="comments-section">
            <h4>Comments</h4>

            {photo.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <strong>{comment.username}</strong>: {comment.text}
              </div>
            ))}

            {user && (
              <form onSubmit={handleComment} className="comment-form">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button type="submit">Post</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCard;
