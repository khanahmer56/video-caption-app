"use client";
import React, { useState, useRef, useEffect } from "react";

const FormContainer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const videoRef = useRef(null);

  const handleAddCaption = () => {
    setCaptions([
      ...captions,
      { time: parseFloat(currentTime), text: currentCaption },
    ]);
    setCurrentCaption("");
    setCurrentTime("");
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    const caption = captions.find(
      (c) => currentTime >= c.time && currentTime < c.time + 2
    );
    if (caption) {
      document.getElementById("caption-display").innerText = caption.text;
    } else {
      document.getElementById("caption-display").innerText = "";
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }
  }, [captions]);
  return (
    <div>
      {" "}
      <div>
        <input
          type="text"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter caption"
          value={currentCaption}
          onChange={(e) => setCurrentCaption(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter timestamp (seconds)"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
        />
      </div>
      <button onClick={handleAddCaption}>Add Caption</button>
      {videoUrl && (
        <div>
          <video ref={videoRef} controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div id="caption-display" className="caption"></div>
        </div>
      )}
      <div>
        <h2>Captions</h2>
        <ul>
          {captions.map((caption, index) => (
            <li key={index}>
              {caption.time}s: {caption.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormContainer;
