import React from "react";
import './VideoItem.scss';
const VideoItem = ({video, setCurrentVideo}) =>{
    return(
        <div 
          key={video.id} 
          className="videoList__items" 
          onClick={() => setCurrentVideo(video)}
        >
          <img 
            src={video.image}
            alt={video.title} 
            className="videoList__thumbnail" 
          />
          <div className="videoList__info">
            <h3 className="videoList__title">{video.title}</h3>
            <div className="videoList__channel">{video.channel}</div>
          </div>
        </div>
    )
}
export default VideoItem;