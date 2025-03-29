import PhotoCard from "./PhotoCard";

function PhotoGrid({ photos, user }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} user={user} />
      ))}
    </div>
  );
}

export default PhotoGrid;
