import React from "react";
import { useAuth } from "react-oidc-context";
import "./navbar.css";
// import { uploadToS3 } ; // Import your S3 function
import { useState } from "react";
import UploadButton from "../UploadButton"; // Import your UploadButton component

const Navbar = ({ signIn, signOut }) => {
  const auth = useAuth();

  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileUrl = await uploadToS3(file);
      console.log("File uploaded successfully:", fileUrl);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="assets/pinterest_logo.png" alt="Pinterest" />
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Explore</a>
        </li>
        <li>
          {auth.isAuthenticated ? (
            <>
              <button onClick={signOut}>Sign Out</button>
              <span className="user-info">Hello,</span>
              {/* Upload Button */}
              <UploadButton
                onUpload={(url) => console.log("File uploaded to:", url)}
                onClose={() => console.log("Upload modal closed")}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
