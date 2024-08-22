import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import './sidebar.scss';

const Sidebar = ({ videos, onVideoSelect }) => {
  return (
    <div className="sidebar">
      <h3 className='sidebar__title'>NEXT VIDEO</h3>
      {videos.map((video) => {
        < VideoItem video={video} onVideoSelect={onVideoSelect}/>
        
    })}
    </div>
  );
};


export default Sidebar;
