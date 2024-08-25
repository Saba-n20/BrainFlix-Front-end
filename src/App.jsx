<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import MainVideo from "./components/MainVideo/MainVideo";
import SideBar from "./components/SideBar/sidebar";
import Header from "./components/Header/Header";
import Comments from "./components/Comments/Comments";
import data from "./Assets/Data/video-details.json";
import VideoDescription from "./components/VideoDescription/VideoDescripton";
import Form from "./components/Form/Form";
import "./App.scss";

const App = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    setVideoList(data);
    if (data.length > 0) {
      setCurrentVideo(data[0]); // first video as the current video
    }
  }, []);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };

  const handleAddComment = (newComment) => {
    if (!currentVideo) return;

    // Update the current video's comments
    const updatedVideo = {
      ...currentVideo,
      comments: [...currentVideo.comments, newComment],
    };

    setCurrentVideo(updatedVideo);

    setVideoList(
      videoList.map((video) =>
        video.id === currentVideo.id ? updatedVideo : video
      )
    );
  };

  const filteredVideoList = videoList.filter(
    (video) => video.id !== currentVideo?.id
  );

  return (
    <div className="app">
      <Header title="BrainFlix" />
      {currentVideo && <MainVideo video={currentVideo} />}
      <div className="app__des-comments-next">
        <div className="app__des-comments">
          {currentVideo && <VideoDescription video={currentVideo} />}
          {currentVideo && (
            <>
              <div className="app__comments-number">
                <h2>{currentVideo.comments.length} Comments</h2>
              </div>
              <Form onAddComment={handleAddComment} video={currentVideo} />
              <Comments comments={currentVideo.comments} />
            </>
          )}
        </div>
        <div className="app__sidebar-section">
        {videoList.length > 0 && (
          <SideBar
            videos={filteredVideoList}
            onVideoSelect={handleVideoSelect}
          />
        )}
        </div>
      </div>
    </div>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import VideoUpload from './pages/VideoUpload/VideoUpload'

import "./App.scss";

const App = () => {
 
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
        <Route path="/videos/:videoid" element={<HomePage />} />
        <Route path='/upload' element={<VideoUpload />}></Route>
			</Routes>
		</BrowserRouter>
>>>>>>> feature/Form
  );
};

export default App;
