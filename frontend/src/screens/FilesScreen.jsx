// packages import
import React, { useEffect, useState } from "react";
import { GoFileSymlinkFile } from "react-icons/go";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// components import
import Header from "../components/Header";

const FilesScreen = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:8000/get-files");
    console.log(result.data.data);
    setAllFiles(result.data.data);
  };

  const submitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:8000/upload-files",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(result);
  };

  return (
    <>
      <Header />

      <div className="forrrm">
        <Form className="form-control" onSubmit={submitFile}>
          <Form.Group>
            <br />
            <Form.Control
              type="text"
              placeholder="title"
              className=""
              required
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <br />
            <Form.Control
              type="file"
              accept="application"
              required
              onChange={(e) => setFile(e.target.files[0])}
            ></Form.Control>
            <br />
          </Form.Group>

          <Button type="submit">Upload</Button>
        </Form>
      </div>

      <div className="uploaded">
        <h4>Files</h4>
        <div className="output-div">
          {allFiles == null
            ? ""
            : allFiles.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title: {data.title}</h6>
                    <Button>Show Pdf</Button>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default FilesScreen;
