import React, { useState } from "react";
import upload__video from "../../Assets/Images/Upload-video-preview.jpg";
import publish from "../../Assets/Icons/publish.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadModal from "../../components/Modal/UploadModal/UploadModal.jsx"; // Import UploadModal
import "./UploadVideo.scss";

const API_BASE_URL = "http://localhost:8081/";
const endpoint = "videos/";

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(upload__video);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handlePublishClick = async (e) => {
    e.preventDefault();

    if (!selectedVideo || !selectedThumbnail) {
      alert('Please select both a video file and a thumbnail.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedVideo);
    formData.append('thumbnail', selectedThumbnail);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('channel', 'Cornelia Currey');
    formData.append('views', '1,261,703');
    formData.append('likes', '729,753');
    formData.append('duration', '26:13');
    formData.append('uploadDate', new Date().toISOString());

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setModalOpen(true); // Open modal after successful upload
    } catch (error) {
      const errorMessage = error.response?.data || 'Failed to upload video. Please try again.';
      alert(errorMessage);
    }
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === 'video') {
      if (file) {
        setSelectedVideo(file);
        const videoThumbnailUrl = URL.createObjectURL(file);
        setThumbnailUrl(videoThumbnailUrl);
      }
    } else if (e.target.name === 'thumbnail') {
      if (file) {
        setSelectedThumbnail(file);
        const thumbnailUrl = URL.createObjectURL(file);
        setThumbnailUrl(thumbnailUrl);
      }
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    navigate('/'); // Redirect to the home page
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <form className="upload" onSubmit={handlePublishClick}>
      <h1 className="upload__title">Upload Video</h1>
      <div className="upload__container">
        <div className="upload__thumbnail">
          <h2 className="upload__thumbnail-title">VIDEO THUMBNAIL</h2>
          <img className="upload__img" src={thumbnailUrl} alt="Upload Video Preview" />
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
              required
            />
          </label>
          <label className="upload__des-txt-label">
            ADD A VIDEO DESCRIPTION
            <textarea
              className="upload__des-video-txt"
              placeholder="Add a description to your video"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <div className="upload__video-image">
            <div className="upload__video-part">
              <label className="upload__video-file-label">
                Choose Your Video:
                <input
                  type="file"
                  className="upload__video-input"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
            <div className="upload__thumbnail">
              <label className="upload__thumbnail-file-label">
                Choose Your Thumbnail:
                <input
                  type="file"
                  className="upload__thumbnail-input"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
          </div>
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
            alt="Publish"
          />
          PUBLISH
        </button>
      </div>

      {/* UploadModal Component */}
      <UploadModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title="Success!"
        message="Your video has been uploaded successfully. Do you want to go to the home page?"
        onConfirm={handleModalConfirm}
      />
    </form>
  );
};

export default UploadVideo;
