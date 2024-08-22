import React from 'react';
import './MainVideo.scss'; 


const MainVideo = ({ video }) => {
  const handleVideoError = (e) => {
    console.error('Video playback error:', e);
  };


  return (
    <div className="main">
      <video
        className="main__player"
        controls
        poster={video.image}
        src= {video.video}
        onError={handleVideoError}
      />
  
    </div>
  );
};


export default MainVideo;
