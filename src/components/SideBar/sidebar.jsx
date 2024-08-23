import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import { Link } from 'react-router-dom';
import './SideBar.scss';
const SideBar = ({ videos, setCurrentVideo }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar__title">NEXT VIDEO</h3>
      {videos.map((video) => {
        return (
          <Link to={`/videos/${video.id}`}>
            <VideoItem video={video} setCurrentVideo={setCurrentVideo} />
          </Link>
        );
      })}
    </div>
  );
};
export default SideBar;