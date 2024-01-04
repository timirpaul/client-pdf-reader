import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MultiFile from "./MultiFile";
import UploadCard from "./UploadCard";

const Home = () => {
  return (
    <div className="container">
      <div className="card ">
        <div className="card-body m-3 ">
          <Link
            to={"/search"}
            className=" btn btn-primary m-3"
            style={{ float: "right", width: "200px" }}
          >
            Search
          </Link>
          <h1>Upload CV</h1>
          {/* <UploadCard/> */}
          <MultiFile/>
        </div>
      </div>
    </div>
  );
};

export default Home;
