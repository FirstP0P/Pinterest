import { useState, useEffect } from "react";
import PhotoGrid from "../components/PhotoGrid";

function Profile({ user, isAuthenticated }) {
  const [photos, setPhotos] = useState([""]);
    
    const fetchPosts = async () => {
        const response = await fetch("http://localhost:5000/posts", {
          method: "GET",
        });
        
        const data = await response.json();
        const filteredPosts = data.filter(post => post.userId === user?.profile["sub"] );
      //  console.log("Filtered Posts:", filteredPosts);
         setPhotos(filteredPosts);
    
    };
  
    
    useEffect(() => {
      fetchPosts();
    }, []);  

  useEffect(() => {
    if (!isAuthenticated) return;

  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="home-page">

      { photos.length > 0 ? (<PhotoGrid photos={photos} user={user} />) : ("No photos found")};
      
    </div>
  );
}

export default Profile;
