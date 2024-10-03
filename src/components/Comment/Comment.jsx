import React, { useState } from "react";
import likeIcon from "../../Assets/Icons/likes.svg";
import deleteIcon from "../../Assets/Icons/delete.svg";
import likesFilled from "../../Assets/Images/likesFilled.png";
import axios from "axios"; // Import axios
import "./Comment.scss";

const Comment = ({ comment, videoId, onDelete }) => {
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async () => {
    if (liked) return; // Prevent multiple likes

    try {
      const response = await axios.post(
        `http://localhost:8081/videos/${videoId}/comments/${comment.id}/like`
      );

      if (response.data && response.data.likes !== undefined) {
        // Update the local state with the new likes count
        setLikesCount(response.data.likes);
        setLiked(true); // Mark the comment as liked
      } else {
        console.error('Unexpected response structure:', response.data);
      }
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  return (
    <div className="comment__container">
      <div className="comment__avatar-info">
        <div className="comment__avatar">{comment.name[0]}</div>
        <div className="comment__info">
          <div className="comment__name">
            <h3>{comment.name}</h3>
          </div>
          <div className="comment__timestamp">
            {new Date(comment.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="comment__text">{comment.comment}</div>
      <div className="comment__actions">
        <div className="comment__like" onClick={handleLikeClick}>
          <img className="comment__icon" src={liked ? likesFilled : likeIcon} alt={liked ? "Unlike" : "Like"} />
          <span>{likesCount}</span>
        </div>
        <div className="comment__delete" onClick={() => onDelete(comment.id)}>
          <img className="comment__icon" src={deleteIcon} alt="Delete" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
