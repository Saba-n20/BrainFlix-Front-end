import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
<<<<<<< HEAD
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
=======
import { Link } from 'react-router-dom';
import './SideBar.scss';
const SideBar = ({ videos, setCurrentVideo }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar__title">NEXT VIDEO</h3>
      {videos.map((video) => {
        return (
          <Link key= {video.id} to={`/videos/${video.id}`}>
            <VideoItem video={video} setCurrentVideo={setCurrentVideo} />
          </Link>
        );
      })}
>>>>>>> feature/VideoItem
    </div>
  );
};
export default SideBar;