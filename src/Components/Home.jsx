import React from "react";
import { Link} from "react-router-dom";
import MultiFileUploadCard from "./MultiFileUploadCard";

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

          <MultiFileUploadCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
