import React, { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteFile } from "../Firebase/uploadFirebase";

const deleteURL = "/router/delete";

const DeleteAll = ({ dataList }) => {
  const navigate = useNavigate();


  const deleteData = async (data) => {
    try {
      await axios.delete(deleteURL, { data });
      console.log(data.name);
      deleteFile(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllData = (e) => {
    e.preventDefault();
    try {
      dataList?.map((item, i) => {
        // console.log("_Id:", item._id);
        // console.log("name:", item.name);
        // console.log("file:", item.file);

        const res = deleteData(item);
        console.log(res);
        
      });
      alert("All CV successfully Deleted");
        navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-3">
        <button className=" btn btn-danger m-3" onClick={deleteAllData}>
          Delete
        </button>
      </div>
    </>
  );
};
export default DeleteAll;
