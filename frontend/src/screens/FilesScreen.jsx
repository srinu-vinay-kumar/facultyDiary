import React, { useState } from "react";
import { GoFileSymlinkFile } from "react-icons/go";
import Header from "../components/Header";

const FilesScreen = () => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    setUploadFiles(Array.from(event.target.files));
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    console.log(
      "Selected files:",
      uploadFiles.map((file) => file.name)
    );
    // Perform file upload logic here, such as sending files to a server
    setUploadFiles([]);
  };

  // Function to handle file drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  // Function to handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setUploadFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    setDragOver(false);
  };

  // Function to cancel file upload
  const cancelUpload = () => {
    setUploadFiles([]);
  };

  return (
    <>
      <Header />
      <div
        className={`upload-box container ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* upload icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-file-earmark-arrow-up upload-icon"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
        </svg>

        <input
          type="file"
          onChange={handleFileSelect}
          multiple
          className="input-field"
          //accept="application/pdf" // Add this if you want to restrict file types to PDFs
        />

        <div>
          <button onClick={handleFileUpload} className="upload-btn">
            Upload
          </button>
          {/* cancel icon */}
          {uploadFiles.length > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
              onClick={cancelUpload}
              className="cancel-icon"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          )}
        </div>
        <div className="file-list">
          {uploadFiles.map((file, index) => (
            <div key={index} className="file-item">
              <GoFileSymlinkFile className="file-icon" />
              <span className="file-name">{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilesScreen;
