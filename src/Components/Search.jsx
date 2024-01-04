import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
// import "../App.css";
import { Link } from "react-router-dom";
import DeleteAll from "./DeleteAll";

const url = "/router/all";
const searchUrl = "/router/search";
const Search = () => {
  // console.log(process.env.REACT_APP_DATA);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await axios.get(url);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
    
  }, []);
 
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(search);
      const res = await axios.post(searchUrl, { search  });
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  console.log(data);
  // console.log(search);
  return (
    <>
      <div className="container">
        <div className="card ">
          <div className="card-body m-3 ">
            <Link
              to={"/"}
              className=" btn btn-primary m-3"
              style={{ float: "right", width: "200px" }}
            >
              Upload CV
            </Link>

            <h1>Search CV</h1>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="search any skill keywords"
                  id="formFileDisabled"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  //   disabled
                />
                <button className=" btn btn-primary m-3" type="submit">
                  Search
                </button>
              </div>
            </form>

            <div className="row">
            <DeleteAll dataList={data}/>
              {data?.length > 0
                ? data?.map((item, i) => (
                    <div className="col-6 col-md-3 m-3">
                      <Card
                        key={item._id}
                        name={item.name}
                        filePath={item.file}
                        email={item.email}
                      />
                    </div>
                  ))
                : "Not Found"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
