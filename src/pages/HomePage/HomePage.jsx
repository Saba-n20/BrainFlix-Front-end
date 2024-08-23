import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainVideo from "../components/MainVideo/MainVideo";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Comments from "../components/Comments/Comments";
import VideoDescription from "../components/VideoDescription/VideoDescription";
import Form from "../components/Form/Form";
import "./HomePage.scss";

const API_BASE_URL = "https://unit-3-project-api-0a5620414506.herokuapp.com/";
const API_KEY = "bad8b207-28f3-4bb9-9ecc-70c59b264008";
const endpoint = "videos/";

const HomePage = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { videoid } = useParams();
  const [videoToLoadid, setVideoToLoadid] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        // Fetch the list of videos
        const videoListResponse = await axios.get(
          `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`
        );
        const videos = videoListResponse.data;
        setVideoList(videos);
        const idToLoad = videoid || (videos.length > 0 ? videos[0].id : null);
        setVideoToLoadid(idToLoad);

        // Fetch the current video details
        if (idToLoad) {
          const currentVideoResponse = await axios.get(
            `${API_BASE_URL}${endpoint}${idToLoad}?api_key=${API_KEY}`
          );
          setCurrentVideo(currentVideoResponse.data);
        } else {
          setCurrentVideo(null);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoid]);

  const handleVideoSelect = async (video) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${endpoint}${video.id}?api_key=${API_KEY}`
      );
      setCurrentVideo(response.data);
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
        newComment,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}` 
          },
        }
      );
  
      const addedComment = response.data;
      setCurrentVideo((prevVideo) => ({
        ...prevVideo,
        comments: [...prevVideo.comments, addedComment],
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
      throw err; // Re-throw error to handle in the component
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
