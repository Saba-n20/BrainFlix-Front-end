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
  const { videoid } = useParams();
  const [videoToLoadid, setvideoToLoadid] = useState(null);

  useEffect(() => {
    // console.log("videoid:", videoid);

    const fetchVideoData = async () => {
      try {
        const videoListResponse = await axios.get(
          `${API_BASE_URL}${endpoint}?api_key=${API_KEY}`
        );
        console.log("Video List Response:", videoListResponse.data);
        const videos = videoListResponse.data;
        setVideoList(videos);
        setvideoToLoadid(videoid? videoid:videos[0].id);

        if (videoid) {
          const currentVideoResponse = await axios.get(
            `${API_BASE_URL}${endpoint}${videoid}?api_key=${API_KEY}`
          );

          setCurrentVideo(currentVideoResponse.data);
        } else if (videos.length > 0) {
          const defaultVideoId = videos[0].id;
          const defaultVideoResponse = await axios.get(
            `${API_BASE_URL}${endpoint}${defaultVideoId}?api_key=${API_KEY}`
          );
          console.log("Default Video Response:", defaultVideoResponse.data);
          setCurrentVideo(defaultVideoResponse.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err);
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
          },
        }
      );

      const addedComment = response.data;
      const updatedVideo = {
        ...currentVideo,
        comments: [...currentVideo.comments, addedComment],
      };
      setCurrentVideo(updatedVideo);

      setVideoList((prevList) =>
        prevList.map((video) =>
          video.id === currentVideo.id ? updatedVideo : video
        )
      );
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err);
    }
  };

  const filteredVideoList = videoList.filter((video) => video.id !== videoToLoadid);
  if (!currentVideo || !videoList || !filteredVideoList || !videoToLoadid) {
    return <p>loading...</p>;
  }
  return (
    <div className="homepage">
      <Header title="BrainFlix" />
      {error && <p>Error: {error.message}</p>}
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
                  //   onVideoSelect={handleVideoSelect}
                  setCurrentVideo={setCurrentVideo}
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
