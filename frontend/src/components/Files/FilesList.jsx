import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import API_URL from "../../utils/constansts";
const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  //   const downloadFile = async (id, path, mimetype) => {
  //     try {
  //       const result = await axios.get(`${API_URL}/download/${id}`, {
  //         responseType: "blob",
  //       });
  //       const split = path.split("/");
  //       const filename = split[split.length - 1];
  //       setErrorMsg("");
  //       return download(result.data, filename, mimetype);
  //     } catch (error) {
  //       if (error.response && error.response.status === 400) {
  //         setErrorMsg("Error while downloading file. Try again later");
  //       }
  //     }
  //   };

  // const downloadFile = async (id, path, mimetype) => {
  //   const url = `${API_URL}/download/${id}`;
  //   console.log("Downloading from URL:", url); // Debug: log the full URL
  //   try {
  //     const result = await axios.get(url, { responseType: "blob" });
  //     const filename = path.split("/").pop();
  //     return download(result.data, filename, mimetype);
  //   } catch (error) {
  //     console.error("Download error:", error.response || error); // Log the error
  //     setErrorMsg("Error while downloading file. Try again later");
  //   }
  // };

  const downloadFile = async (id, path, mimetype) => {
    const url = `${API_URL}/download/:${id}`;
    console.log("Downloading from URL:", url); // Debug: log the full URL
    try {
      const result = await axios.get(url, { responseType: "blob" });
      const filename = path.split("/").pop();
      return download(result.data, filename, mimetype);
    } catch (error) {
      console.error("Download error:", error.response || error); // Log the error
      setErrorMsg("Error while downloading file. Try again later");
    }
  };

  // return (
  //   <>
  //     <div className="files-container">
  //       {errorMsg && <p className="errorMsg">{errorMsg}</p>}
  //       <table className="files-table">
  //         <thead>
  //           <tr>
  //             <th>Title</th>
  //             <th>Description</th>
  //             <th>Download File</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filesList.length > 0 ? (
  //             filesList.map(
  //               ({ _id, title, description, file_path, file_mimetype }) => (
  //                 <tr key={_id}>
  //                   <td className="file-title">{title}</td>
  //                   <td className="file-description">{description}</td>
  //                   <td>
  //                     <a
  //                       href="#/"
  //                       onClick={() =>
  //                         downloadFile(_id, file_path, file_mimetype)
  //                       }
  //                     >
  //                       Download
  //                     </a>
  //                   </td>
  //                 </tr>
  //               )
  //             )
  //           ) : (
  //             <tr>
  //               <td colSpan={3} style={{ fontWeight: "300" }}>
  //                 No files found. Please add some.
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </>
  // );

  const handleDeleteFile = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/:${id}`);
      setFilesList(filesList.filter((file) => file._id !== id)); // Update UI
      alert("File deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.response || error);
      setErrorMsg("Error while deleting file. Try again later");
    }
  };

  return (
    <>
      <div className="files-container">
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <table className="files-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Download File</th>
              <th>Delete File</th> {/* Added delete column */}
            </tr>
          </thead>
          <tbody>
            {filesList.length > 0 ? (
              filesList.map(
                ({ _id, title, description, file_path, file_mimetype }) => (
                  <tr key={_id}>
                    <td className="file-title">{title}</td>
                    <td className="file-description">{description}</td>
                    <td>
                      <a
                        href="#/"
                        onClick={() =>
                          downloadFile(_id, file_path, file_mimetype)
                        }
                      >
                        Download
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteFile(_id)}>
                        Delete
                      </button>{" "}
                      {/* Delete button */}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={4} style={{ fontWeight: "300" }}>
                  No files found. Please add some.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FilesList;
