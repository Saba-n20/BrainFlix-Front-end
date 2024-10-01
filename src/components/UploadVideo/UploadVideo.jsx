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

  const handlePublishClick = async (e) => {
    e.preventDefault(); 

    // Prepare video data
    const videoData = {
      title,
      description,
      channel: "Cornelia Currey",
      views: "1,261,703",
      likes: "729,753",
      duration: "26:13",
      image: 'http://localhost:8081/images/image3.jpg',
      video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
      uploadDate: new Date().toISOString(),
      comments: [
      {
        id: "7ba106bf-e74a-4c21-b59e-c485a30eea45",
        name: "Giovana Silva",
        comment: "Can't wait to try some of these gastronomic delights in my own kitchen. Keep those delicious discoveries coming!",
        likes: 0,
        timestamp: 1700633862000
      },
      {
        id: "921f0e8d-f9d1-44db-b4a2-a2718339891e",
        name: "Daniel Lesage",
        comment: "Your exploration of various cuisines and the intricate details behind each dish is both informative and mouthwatering. I've learned so much about the artistry of cooking.",
        likes: 0,
        timestamp: 1700547462000
      },
      {
        id: "f7b9027b-e407-45fa-98f3-7d8a308ddf7c",
        name: "Sharon Santos",
        comment: "I'm already planning a culinary adventure inspired by your recommendations. Thanks for taking us on this delicious journey!",
        likes: 3,
        timestamp: 1700461062000
      }
    ]
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
    <form className="upload" onSubmit={handlePublishClick}>
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
