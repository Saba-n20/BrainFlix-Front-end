import likes from "../../Assets/Icons/likes.svg";
import views from "../../Assets/Icons/views.svg";
import "./VideoDescription.scss";

const VideoDescription = ({ video }) => {
  return (
    <>
      <div className="main__section">
        <h1 className="main__title">{video.title}</h1>
        <div className="main__details">
          <div className="main__channel-date">
            <h2 className="main__channel">by: {video.channel}</h2>
            <div className="main__timestamp">
              {new Date(video.timestamp).toLocaleString()}
            </div>
          </div>
          <div className="main__views-likes">
            <div className="main__views">
              <img className="main__views-icon" src={views} alt="Views" />
              <div className="main__views-num">{video.views}</div>
            </div>
            <div className="main__likes">
              <img className="main__likes-icon" src={likes} alt="Likes" />
              <div className="main__likes-num">{video.likes}</div>
            </div>
          </div>
        </div>
        <div className="main__description">
          <div className="main__text">{video.description}</div>
        </div>
      </div>
    </>
  );
};
export default VideoDescription;
