import React, { useState } from "react";
import upload__video from "../../Assets/Images/Upload-video-preview.jpg";
import publish from "../../Assets/Icons/publish.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UploadVideo.scss";


const API_BASE_URL = "http://localhost:8081/"; 
const endpoint = "videos/";

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handlePublishClick = async () => {
    // Prepare video data
    const videoData = {
      title,
      description,
      image: 'http://localhost:8081/images/image3.jpg',
      uploadDate: new Date().toISOString(),
    };

    try {
      // Combine base URL and endpoint
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await axios.post(url, videoData);
      console.log('Response:', response.data);

      // Handle successful upload
      const confirmAction = window.confirm(
        'Your video is uploaded successfully. Do you want to go to the home page?'
      );

      if (confirmAction) {
        navigate('/'); // Redirect to the Home page
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    }
  };

  const handleCancelClick = () => {
    navigate('/'); // Redirect to the Home page
  };

  return (
    <form className="upload">
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
            <input
              type="text"
              className="upload__title-video-txt"
              placeholder="Add a title to your video"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="upload__des-txt-label">
            ADD A VIDEO DESCRIPTION
            <textarea
              className="upload__des-video-txt"
              placeholder="Add a description to your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="upload__buttons">
        <button
          type="button"
          className="upload__btn-cancel"
          onClick={handleCancelClick}
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="upload__btn-publish"
          onClick={handlePublishClick}
        >
          <img
            className="upload__publish-icon"
            src={publish}
            alt="Publish Icon"
          />
          PUBLISH
        </button>
      </div>
    </form>
  );
};

export default UploadVideo;
