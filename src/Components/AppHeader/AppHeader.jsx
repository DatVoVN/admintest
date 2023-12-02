import React from "react";
import "./AppHeader.css";
import logo from "./logo - nền trắng - ngang.png";
const AppHeader = () => {
  return (
    <div className="AppHeader">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="link">
        <ul>
          <li>
            <button>
              <a href="/">Home</a>
            </button>
          </li>
          <li>
            <button>
              <a href="/btvt">Bài Toán Vận Tải</a>
            </button>
          </li>
          <li>
            <button>
              <a href="/maps">Map</a>
            </button>
          </li>
        </ul>
      </div>
      <div className="login_div">
        <button className="login">Login</button>
        <button className="sign_up">Signup</button>
      </div>
    </div>
  );
};

export default AppHeader;
