import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainVideo from "../../components/MainVideo/MainVideo";
import SideBar from "../../components/SideBar/sidebar";
import Header from "../../components/Header/Header";
import Comments from "../../components/Comments/Comments";
import VideoDescription from "../../components/VideoDescription/VideoDescription";
import Form from "../../components/Form/Form";
import "./HomePage.scss";

const API_BASE_URL = "http://localhost:8081/";
const endpoint = "videos/";

const HomePage = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { videoid } = useParams();
  const [videoToLoadid, setVideoToLoadid] = useState(null);

  useEffect(() => {
    const fetchVideoList = async () => {
      setLoading(true);
      try {
        const videoListResponse = await axios.get(`${API_BASE_URL}${endpoint}`);
        const videos = videoListResponse.data;
        setVideoList(videos);
        const idToLoad = videoid || (videos.length > 0 ? videos[0].id : null);
        setVideoToLoadid(idToLoad);
      } catch (err) {
        console.error("Fetch Video List Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoList();
  }, [videoid]);

  useEffect(() => {
    const fetchCurrentVideo = async () => {
      if (!videoToLoadid) return;

      setLoading(true);
      try {
        const currentVideoResponse = await axios.get(
          `${API_BASE_URL}${endpoint}${videoToLoadid}`
        );
        setCurrentVideo(currentVideoResponse.data);
      } catch (err) {
        console.error("Fetch Current Video Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentVideo();
  }, [videoToLoadid]);

  const handleVideoSelect = async (video) => {
    setVideoToLoadid(video.id);
  };

  const handleAddComment = async (newComment) => {
    if (!currentVideo) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}${endpoint}${currentVideo.id}/comments`,
        newComment
      );

      const addedComment = response.data;
      setCurrentVideo((prevVideo) => ({
        ...prevVideo,
        comments: [...prevVideo.comments, addedComment],
      }));
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const deleteUrl = `${API_BASE_URL}${endpoint}${currentVideo.id}/comments/${commentId}`;
    console.log('Delete URL:', deleteUrl);

    try {
      await axios.delete(deleteUrl);
      const updatedComments = currentVideo.comments.filter((comment) => comment.id !== commentId);
      setCurrentVideo((prev) => ({ ...prev, comments: updatedComments }));
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="HomePage">
      <Header />
      <div className="mainContent">
        {currentVideo && (
          <>
            <MainVideo video={currentVideo} />
            <VideoDescription video={currentVideo} />
            <Comments 
              comments={currentVideo.comments} 
              onDelete={handleDeleteComment} 
            />
            <Form onAddComment={handleAddComment} />
          </>
        )}
        <SideBar videos={videoList} onVideoSelect={handleVideoSelect} />
      </div>
    </div>
  );
};

export default HomePage;
