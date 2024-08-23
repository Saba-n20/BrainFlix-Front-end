import React from "react";
import upload__video from "../../Assets/Images/Upload-video-preview.jpg";
import publish from "../../Assets/Icons/publish.svg";
import "./UploadVideo.scss";

const UploadVideo = () => {
  return (
    <div className="upload">
      <h1 className="upload__title">Upload Video</h1>
      <div className="upload__container">
        <div className="upload__thumbnail">
          <h2 className="upload__thumbnail-title">VIDEO THUMBNAIL</h2>
          <img
            className="upload__img"
            src={upload__video}
            alt="Upload Video Preview"
          />
        </div>
        <div className="upload__video">
          <label className="upload__title-txt-label">
            TITLE YOUR VIDEO
            <input type="text" className="upload__title-video-txt" placeholder="Add a title to your video"></input>
          </label>
          <label className="upload__des-txt-label">
            ADD A VIDEO DESCRIPTION
            <textarea className="upload__des-video-txt"placeholder="Add a description to your video" />
          </label>
        </div>
      </div>
      <div className="upload__buttons">
        
          <button type="submit" className="upload__btn-cancel">
            CANCEL
          </button>
        
      
          <button type="submit" className="upload__btn-publish">
            <img
              className="upload__publish-icon"
              src={publish}
              alt="Publish Icon"
            />
            PUBLISH
          </button>
        
      </div>
    </div>
  );
};

export default UploadVideo;
