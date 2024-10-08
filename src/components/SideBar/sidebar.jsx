import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import { Link } from 'react-router-dom';
import './SideBar.scss';

const SideBar = ({ videos }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar__title">NEXT VIDEO</h3>
      {videos.map((video, index) => (
        <Link to={`/videos/${video.id}`} key={video.id || index}>
          <VideoItem video={video} />
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
