import { useState } from "react";
import PhotoGrid from "../components/PhotoGrid";
import UploadModal from "../components/UploadModal";

function Home({ user, isAuthenticated }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [photos, setPhotos] = useState([
    // Sample data
    {
      id: "1",
      userId: "user1",
      username: "user1",
      title: "Beautiful sunset",
      description: "Captured this amazing sunset at the beach.",
      imageUrl: "assets/download_1.jpeg",
      likes: ["user2"],
      comments: [
        {
          id: "1",
          userId: "user2",
          username: "user2",
          text: "Gorgeous!",
          createdAt: "2025-03-28T18:30:00Z",
        },
      ],
      createdAt: "2025-03-28T18:00:00Z",
    },
    {
      id: "2",
      userId: "user2",
      username: "user2",
      title: "My new plant",
      description: "Just added this beauty to my collection.",
      imageUrl: "assets/download_2.jpeg",
      likes: [],
      comments: [],
      createdAt: "2025-03-28T17:00:00Z",
    },
  ]);

  const handleUpload = (newPhoto) => {
    setPhotos([newPhoto, ...photos]);
  };

  return (
    <div className="home-page">
      {isAuthenticated && (
        <div className="upload-container">
          <button
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            + Upload Photo
          </button>
        </div>
      )}

      <PhotoGrid photos={photos} user={user} />

      {showUploadModal && (
        <UploadModal
          user={user}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

export default Home;
