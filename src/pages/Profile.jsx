import { useState, useEffect } from "react";
import PhotoGrid from "../components/PhotoGrid";

function Profile({ user, isAuthenticated }) {
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Here you would fetch the user's photos from your API
    // For now, let's use mock data
    setUserPhotos([
      {
        id: "3",
        userId: user.id,
        username: user.username,
        title: "My workspace",
        description: "Where the magic happens.",
        imageUrl: "/api/placeholder/500/400",
        likes: ["user1"],
        comments: [
          {
            id: "2",
            userId: "user1",
            username: "user1",
            text: "Nice setup!",
            createdAt: "2025-03-29T10:00:00Z",
          },
        ],
        createdAt: "2025-03-29T09:00:00Z",
      },
    ]);
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>{user.username}'s Photos</h2>
      </div>

      {userPhotos.length > 0 ? (
        <PhotoGrid photos={userPhotos} user={user} />
      ) : (
        <div className="no-photos">
          <p>You haven't uploaded any photos yet.</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
