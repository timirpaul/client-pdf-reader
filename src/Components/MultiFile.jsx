import React, { useState } from "react";
import UploadCard from "./UploadCard";

const MultiFile = () => {
  const [cardCount, setCardCount] = useState(1); // Initial count

  const handleInputChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setCardCount(isNaN(count) ? 0 : count);
  };

  return (
    <>
      <div>
        <label>
          Enter the number of Inputs:
          <input
            className="form-control"
            type="number"
            value={cardCount}
            onChange={handleInputChange}
          />
        </label>
        {[...Array(cardCount)].map((_, index) => (
          <UploadCard />
        ))}
      </div>
    </>
  );
};

export default MultiFile;
