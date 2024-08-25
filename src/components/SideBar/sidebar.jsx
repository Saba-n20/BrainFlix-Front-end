import React from 'react';
<<<<<<< HEAD
=======
import VideoItem from '../VideoItem/VideoItem';
>>>>>>> feature/Form
import './sidebar.scss';

const Sidebar = ({ videos, onVideoSelect }) => {
  return (
    <div className="sidebar">
      <h3 className='sidebar__title'>NEXT VIDEO</h3>
<<<<<<< HEAD
      {videos.map((video) => (
        <div 
          key={video.id} 
          className="sidebar__video-items" 
          onClick={() => onVideoSelect(video)}
        >
          <img 
            src={video.image} 
            alt={video.title} 
            className="sidebar__thumbnail" 
          />
          <div className="sidebar__video-info">
            <h3 className="sidebar__video-title">{video.title}</h3>
            <div className="sidebar__video-channel">{video.channel}</div>
          </div>
        </div>
      ))}
=======
      {videos.map((video) => {
        < VideoItem video={video} onVideoSelect={onVideoSelect}/>
        
    })}
>>>>>>> feature/Form
    </div>
  );
};


export default Sidebar;
