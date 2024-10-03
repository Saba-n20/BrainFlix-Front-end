import React, { useState } from 'react';
import likes from "../../Assets/Icons/likes.svg";
import likesFilled from "../../Assets/Images/likesFilled.png";
import views from "../../Assets/Icons/views.svg";
import "./VideoDescription.scss";

const VideoDescription = ({ video }) => {
  const initialLikes = video.likes ?? 0; 
  const initialViews = video.views ?? 0;
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div className="main__section">
      <h1 className="main__title">{video.title}</h1>
      <div className="main__details">
        <div className="main__channel-date">
          <h2 className="main__channel">by: {video.channel}</h2>
          <div className="main__timestamp">
            {new Date(video.timestamp).toLocaleString()}
          </div>
        </div>
        <div className="main__views-likes">
          <div className="main__views">
            <img className="main__views-icon" src={views} alt="Views" />
            <div className="main__views-num">{initialViews}</div>
          </div>
          <div className="main__likes" onClick={handleLikeClick}>
            <img
              className="main__likes-icon"
              src={liked ? likesFilled : likes}
              alt="Likes"
            />
            <div className="main__likes-num">{likesCount}</div>
          </div>
        </div>
      </div>
      <div className="main__description">
        <div className="main__text">{video.description}</div>
      </div>
    </div>
  );
};

export default VideoDescription;
