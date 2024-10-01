import React, { useState } from "react";
import Addcomment from "../../Assets/Icons/add_comment.svg";
import avatar from "../../Assets/Images/Mohan-muruge.jpg";
import "./Form.scss";

const Form = ({ onAddComment, video }) => {
  // State to hold the current comment input
  const [comment, setComment] = useState("");

  // Handler to update comment state as the user types
  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  // Handler for submitting the comment
  const handleSubmitComment = () => {
    // Check if the comment is empty
    if (comment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }

    // Create a new comment object
    const newComment = {
      name: "Mohan Muruge", // Replace with dynamic user name if needed
      comment: comment.trim(),
    };

    // Call the onAddComment function passed as a prop
    onAddComment(newComment)
      .then(() => {
        // Clear the input field after successful submission
        setComment(""); 
      })
      .catch((err) => {
        // Log any errors and show an alert to the user
        console.error("Error adding comment:", err);
        alert("Failed to add comment. Please try again.");
      });
  };

  return (
    <div className="form">
      <div className="form__container">
        <div className="form__avatar">
          {/* Display user avatar */}
          <img className="form__avatar-image" src={avatar} alt="Mohan Muruge" />
        </div>
        <div className="form__input">
          <label className="form__input-label">JOIN THE CONVERSATION</label>
          <div className="form__txt-btn">
            {/* Textarea for comment input */}
            <textarea
              className="form__input-txt"
              value={comment}
              onChange={handleInputChange}
              placeholder="Add new comment"
            />
            {/* Button to submit the comment */}
            <button className="form__button" onClick={handleSubmitComment}>
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
