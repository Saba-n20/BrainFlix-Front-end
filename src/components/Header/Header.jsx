import React from "react";
import "./Header.scss";
import logo from "../../Assets/Logo/BrainFlix-logo.svg";
import search from "../../Assets/Icons/search.svg";
import upload from "../../Assets/Icons/upload.svg";
import avatar from "../../Assets/Images/Mohan-muruge.jpg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="brainFlix" className="header__logo-image" />
        </div>
        <div className="header__search">
          <div className="header__search-bar-wrapper">
            <img
              className="header__search-icon"
              src={search}
              alt="Search Icon"
            />
            <input
              className="header__search-bar"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="header__avatar-mobile">
            <img
              className="header__avatar-image-mobile"
              src={avatar}
              alt="Mohan-muruge"
            />
          </div>
        </div>
        <div className="header__button-avatar-tablet">
          <div className="header__button-icon">
            <button className="header__button">
              <img
                className="header__upload-icon"
                src={upload}
                alt="Upload Icon"
              />
              Upload
            </button>
          </div>
          <div className="header__avatar-tablet">
            <img
              className="header__avatar-image-tablet"
              src={avatar}
              alt="Mohan-muruge"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
