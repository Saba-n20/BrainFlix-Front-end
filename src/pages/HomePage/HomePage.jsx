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

  // Effect to fetch the list of videos
  useEffect(() => {
    const fetchVideoList = async () => {
      setLoading(true);
      try {
        const videoListResponse = await axios.get(
          `${API_BASE_URL}${endpoint}`
        );
        const videos = videoListResponse.data;
        setVideoList(videos);
        const idToLoad = videoid || (videos.length > 0 ? videos[0].id : null);//*
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

  //fetch current video details based on videoToLoadid
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
    try {
      const response = await axios.get(
        `${API_BASE_URL}${endpoint}${video.id}`
      );
      setCurrentVideo(response.data);
      setVideoToLoadid(video.id); 
    } catch (err) {
      console.error("Error selecting video:", err);
      setError(err);
    }
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
        comments: [...prevVideo.comments, addedComment]
      }));

      setVideoList((prevList) =>
        prevList.map((video) =>
          video.id === currentVideo.id
            ? { ...currentVideo, comments: [...currentVideo.comments, addedComment] }
            : video
        )
      );
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err);
      throw err; 
    }
  };

  const filteredVideoList = videoList.filter((video) => video.id !== videoToLoadid);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="homepage">
      <Header title="BrainFlix" />
      {currentVideo ? (
        <>
          <MainVideo video={currentVideo} />
          <div className="homepage__des-comments-next">
            <div className="homepage__des-comments">
              <VideoDescription video={currentVideo} />
              <div className="homepage__comments-number">
                <h2>{currentVideo.comments.length} Comments</h2>
              </div>
              <Form onAddComment={handleAddComment} video={currentVideo} />
              <Comments comments={currentVideo.comments} />
            </div>
            <div className="homepage__sidebar-section">
              <SideBar
                videos={filteredVideoList}
                onVideoSelect={handleVideoSelect}
              />
            </div>
          </div>
        </>
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
};

export default HomePage;
