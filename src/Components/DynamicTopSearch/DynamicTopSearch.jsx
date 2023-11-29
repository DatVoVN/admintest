import React, { useState } from "react";
import TopSearch from "../SearchTop/TopSearch";

const DynamicTopSearch = ({ data }) => {
  const [numTopSearch, setNumTopSearch] = useState(0); // Số lượng TopSearch cần hiển thị
  const [showTopSearch, setShowTopSearch] = useState(false); // Hiển thị các TopSearch khi nhấn OK

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumTopSearch(value);
  };

  const handleOKClick = () => {
    setShowTopSearch(true); // Khi nhấn OK, hiển thị số lượng TopSearch tương ứng
  };

  const topSearchComponents = Array.from(
    { length: numTopSearch },
    (_, index) => <TopSearch key={index} data={data} />
  );

  return (
    <div>
      <input type="number" value={numTopSearch} onChange={handleInputChange} />
      <button onClick={handleOKClick}>OK</button>
      {showTopSearch &&
        topSearchComponents.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
    </div>
  );
};

export default DynamicTopSearch;
