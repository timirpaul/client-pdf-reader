import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
// import "../App.css";
import { Link } from "react-router-dom";
import DeleteAll from "./DeleteAll";

const url = `${process.env.REACT_APP_PROXY}/router/all`;
const searchUrl = `${process.env.REACT_APP_PROXY}/router/search`;
const Search = () => {
  // console.log(process.env.REACT_APP_DATA);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (search === "") return fetchData();
      // console.log("search", search);
      const res = await axios.post(searchUrl, { search });
      // console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(data);
  // console.log(process.env.REACT_APP_PROXY);
  // console.log("search",search);
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

            {loading ? (
              "Loading... "
            ) : (
              <div className="row">
                <DeleteAll dataList={data} />
                {data?.length > 0
                  ? data?.map((item, i) => (
                      <div className="col-6 col-md-3 m-3" key={item._id}>
                        <Card
                          name={item.name}
                          filePath={item.file}
                          email={item.email}
                        />
                      </div>
                    ))
                  : "No CV Found"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
