import React from "react";
import "./AccessForbidden.scss";
export const AccessForbidden = () => {
  return (
    <div className="access_forbidden">
      {" "}
      <div className="scene body">
        {" "}
        <div className="overlay"></div> <div className="overlay"></div>{" "}
        <div className="overlay"></div> <div className="overlay"></div>{" "}
        <span className="bg-403">403</span>{" "}
        <div className="text">
          {" "}
          <span className="hero-text"></span>{" "}
          <span className="msg">
            {" "}
            can't let <span>you</span> in.
          </span>{" "}
          <span className="support">
            {" "}
            <span>unexpected?</span> <a href="facebook.com">contact support</a>{" "}
          </span>{" "}
        </div>{" "}
        <div className="lock"></div>{" "}
      </div>{" "}
    </div>
  );
};
