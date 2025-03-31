import React, { useState, useEffect } from "react";
import PhotoGrid from "../components/PhotoGrid";
import UploadModal from "../components/UploadModal";
import "./Home.css";

function Home({ user, isAuthenticated }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [photos, setPhotos] = useState([""]);
  
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "GET",
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPhotos(data);
      
      } else {
        alert("Fetch failed");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error Fetching file. Please try again.");
    }
  };

  
  

  // const [photos, setPhotos] = useState([
  //   // Add more sample data for better grid display
  //   {
  //     id: "3",
  //     userId: "user3",
  //     username: "travelgram",
  //     title: "Mountain hiking",
  //     description: "Weekend adventure in the Alps",
  //     imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  //     likes: ["user1", "user4"],
  //     comments: [],
  //     createdAt: "2025-03-27T10:00:00Z",
  //   },
  //   {
  //     id: "4",
  //     userId: "user4",
  //     username: "foodie",
  //     title: "Homemade pasta",
  //     description: "First attempt at making fresh pasta from scratch",
  //     imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  //     likes: ["user2"],
  //     comments: [],
  //     createdAt: "2025-03-26T19:15:00Z",
  //   },
  // ]);

  const handleUpload = (newPhoto) => {
//    setPhotos([newPhoto, ...photos]);
    fetchPosts();
    setShowUploadModal(false);
  };

  return (
    <div className="home-page">
      {isAuthenticated && (
        <div className="upload-container">
          <button
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            <span className="plus-icon">+</span> Create Pin
          </button>
        </div>
      )}

      { photos.length > 1 ? (<PhotoGrid photos={photos} user={user} />) : ("")};
      

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