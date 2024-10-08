import React from 'react';
import './MainVideo.scss'; 

const MainVideo = ({ video }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  console.log('Video object:', video);
  const videoSrc = `http://localhost:8081/video/${video.video}`;

  const handleVideoLoaded = () => {
    setLoading(false);
    setError(false);
  };

  const handleVideoError = (e) => {
    console.error('Video playback error:', e);
    setLoading(false);
    setError(true);
    alert(`Error loading video: ${videoSrc}`);
  };

  return (
    <div className="main">
      {loading && !error && <div className="loading">Loading video...</div>}
      {error && <div className="error">Error loading video. Please try again later.</div>}
      <video
        className="main__player"
        controls
        poster={video.thumbnail}
        src={videoSrc}
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
      />
    </div>
  );
};

export default MainVideo;
