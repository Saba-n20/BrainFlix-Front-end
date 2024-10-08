import React from "react";
import './VideoItem.scss';
const VideoItem = ({video}) =>{
    return(
        <div  
          className="videoList__items" 
        >
          <img 
            src={video.thumbnail}
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