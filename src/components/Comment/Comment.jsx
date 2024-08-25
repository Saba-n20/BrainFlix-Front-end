import React from "react";
import "./Comment.scss";

const Comment = ({ comment }) => {
  return (
    <div  className="comment__container">
      <div className="comment__avatar-info">
        <div className="comment__avatar"></div>
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
    </div>
  );
};
export default Comment
