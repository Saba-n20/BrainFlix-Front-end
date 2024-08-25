import React from "react";
import Header from '../../components/Header/Header'
import './VideoUpload.scss';
import UploadVideo from "../../components/UploadVideo/UploadVideo";
const VideoUpload = () =>{
    return (
        <div className="videoupload">
          <Header title="BrainFlix" />
          <UploadVideo  />
        </div>
      );
}
export default VideoUpload;