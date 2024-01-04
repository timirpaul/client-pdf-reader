import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { multiUploadFiles } from "../Firebase/uploadFirebase";

const MultiFileUploadCard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [firebaseFileURLs, setFirebaseFileURLs] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      // Upload files to Firebase
      multiUploadFiles(files, setFirebaseFileURLs, setFileNames).then((res) => {
        if (res.success) setUploaded(true);
      });
    }
  }, [files]);

  //   useEffect(() => {
  //     if (firebaseFileURLs.length > 0) {
  //       console.log("urls", firebaseFileURLs);
  //       
  //       submitHandler();
  //     }
  //   }, [firebaseFileURLs]);

  useEffect(() => {
    if (uploaded) submitHandler();
  }, [uploaded]);

//   useEffect(() => {
    
//   }, []);

  const submitHandler = async () => {
    try {
      const formDataArray = files.map((file, index) => {
        return {
          file,
          email,
          name: fileNames[index],
          firebaseFileURL: firebaseFileURLs[index],
        };
      });

      const promises = formDataArray.map(async (formData) => {
        const data = new FormData();
        data.append("upload-file", formData.file);
        data.append("email", formData.email);
        data.append("name", formData.name);
        data.append("firebaseFileURL", formData.firebaseFileURL);

        const res = await axios.post("/router/upload", data);
        console.log(res);
      });

      await Promise.all(promises);
      navigate("/search");
      alert("CVs successfully uploaded");
    } catch (error) {
      console.log(error);
    } finally {
      setUploaded(false);
    }
  };

  //   console.log("files.length",files.length);
  //   console.log("fileNames",fileNames);
  //   console.log("firebaseFileURLs",firebaseFileURLs);
  //   console.log("uploaded",uploaded);

  return (
    <>
      <div>
        <form>
          <div className="mb-3">
            <label  className="form-label">
              Upload CVs
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              onChange={(e) => {
                setFiles([...files, ...Array.from(e.target.files)]);
              }}
              multiple
            />
            {firebaseFileURLs.length > 0 && (
              <div className="text-success m-2">
                ✅ Files Uploaded successfully
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default MultiFileUploadCard;
