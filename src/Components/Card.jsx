import React from "react";
import "../App.css";

const Card = ({ name, filePath, email }) => {
  // console.log(filePath);
 
  return (
    <>
      {/* <div className="card " > */}
        {/* <div className="card-body m-3"> */}
          <div className="card m-3" style={{ width: "18rem", height:"12rem"}}>
            <div className="card-body " style={{margin:"5px"}}>
              <h6 className="card-text con">{name}</h6>
              <h6 className="card-text con">{email}</h6>
              <a className="con" href={filePath} target="display">
                <button className=" btn btn-primary m-3">Check Resume</button>
              </a>
            </div>
          </div>
        {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Card;
