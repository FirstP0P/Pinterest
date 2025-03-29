import { useState } from "react";

function UploadModal({ user, onClose, onUpload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !imageFile) return;

    // Here you would upload to your backend
    // In a real app, you'd use FormData and fetch/axios

    // For now, let's simulate it with a local object
    const newPhoto = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      title,
      description,
      imageUrl: previewUrl, // In a real app, this would be the URL from your server
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    onUpload(newPhoto);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <h2>Upload a Photo</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
