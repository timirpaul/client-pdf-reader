import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../Firebase/uploadFirebase";

const UploadCard = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [email, setEmail] = useState("");
  const [firebaseFileURL, setFirebaseFileURL] = useState(null);
  const [uploadBtn, setUploadBtn] = useState(true);

  useEffect(() => {
    if (!(file === null)) {
      uploadFile(file, setFirebaseFileURL ,setFileName);
      console.log(uploadBtn);
      console.log(firebaseFileURL);
    }
    // return ()=>{ }
  }, [file]);

  // useEffect(() => {
  //   if(!(file === null)){
  //    uploadFile(file).then((url)=>{
  //     setFirebaseFileURL(url)
  //   })}
  //   // return ()=>{ }
  // }, [file]);

  useEffect(() => {
    if (!(firebaseFileURL === null)) {
      console.log("url", firebaseFileURL);
      setUploadBtn(false);
      console.log(uploadBtn);
      submitHandler()
    }
  }, [firebaseFileURL]);

  useEffect(() => {
    setUploadBtn(true);
  }, []);

  const submitHandler = async (e) => {
    // e.preventDefault();

    try {
      const data = new FormData();
      data.append("upload-file", file);
      data.append("email", email);
      data.append("name", fileName);
      data.append("firebaseFileURL", firebaseFileURL);

      const res = await axios.post("/router/upload", data);
      console.log(res);
      alert("CV successfully Upload");
      // navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="container">
        <div className="card ">
          <div className="card-body m-3 ">
            <Link
              to={"/search"}
              className=" btn btn-primary m-3"
              style={{ float: "right", width: "200px" }}
            >
              Search
            </Link> */}
            {/* <h1>Upload CV</h1> */}
            <div>
              <form onSubmit={submitHandler}>
                {/* <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}
                <div className="mb-3">
                  <label for="formFileDisabled" className="form-label">
                    Upload CV
                    
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name=""
                    id="formFileDisabled"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    //   disabled
                  />
                  {firebaseFileURL ? (
                    <div className="text-success m-2">
                     ✅ File Uploaded successfully
                    </div>
                  ) : (
                    ""
                  )}

                  {/* <button
                    className=" btn btn-primary m-3"
                    id="btn1"
                    type="submit"
                    disabled={uploadBtn}
                  >
                    Upload
                  </button> */}
                </div>
              </form>
            </div>
          {/* </div>
        </div>
      </div> */}
    </>
  );
};

export default UploadCard;
