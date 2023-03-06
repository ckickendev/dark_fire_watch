import React from "react";
import "./loading.scss";

export const Loading = () => {
  return (
    <div className="overlay_utils">
      <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
