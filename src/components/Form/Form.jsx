import React, { useState } from "react";
import Addcomment from "../../Assets/Icons/add_comment.svg";
import avatar from "../../Assets/Images/Mohan-muruge.jpg";
import "./Form.scss";

const Form = ({ onAddComment, video }) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }

    const newComment = {
      //a unique id based on timestamp
      id: Date.now().toString(),
      // Assuming a static name for the example :)
      name: "Mohan Muruge", 
      comment,
      likes: 0,
      timestamp: Date.now(),
    };

    onAddComment(newComment);
    setComment(""); // Clear the input field after submission
  };

  return (
    <div className="form">
      <div className="form__container">
        <div className="form__avatar">
          <img className="form__avatar-image" src={avatar} alt="Mohan muruge" />
        </div>
        <div className="form__input">
          <label className="form__input-label">JOIN THE CONVERSATION</label>
          <div className="form__txt-btn">
            <input
              className="form__input-txt"
              type="text"
              value={comment}
              onChange={handleInputChange}
              placeholder="Add new comment"
            />
            <button className="form__button" onClick={handleClick}>
              <img
                className="form__comment-icon"
                src={Addcomment}
                alt="Add Comment"
              />
              COMMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
