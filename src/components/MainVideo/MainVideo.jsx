import React from 'react';
import './MainVideo.scss'; // Make sure you have this file for styling

const MainVideo = ({ video }) => {
  const [loading, setLoading] = React.useState(true);

  const handleVideoLoaded = () => {
    setLoading(false);
  };

  const handleVideoError = (e) => {
    console.error('Video playback error:', e);
  };

  return (
    <div className="main">
      {loading && <div className="loading">Loading video...</div>}
      <video
        className="main__player"
        controls
        poster={video.image}
        src={`http://localhost:8081/video/video.mp4`}
        onLoadedData={handleVideoLoaded}
        onError={handleVideoError}
      />
    </div>
  );
};

export default MainVideo;
