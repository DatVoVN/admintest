import React, { useState } from "react";

const TopSearch = ({ data }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [displayedData, setDisplayedData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [capacityInput, setCapacityInput] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleOKClick = () => {
    const userInput = inputValue.toLowerCase();
    const filteredData = data.filter((item) =>
      item[searchType].toLowerCase().includes(userInput)
    );

    setSearchResults(filteredData);
    setShowResults(true);
  };

  const handleResultSelection = (selectedData) => {
    setDisplayedData(selectedData);
    setShowResults(false);
    setCapacityInput("");
  };

  const handleCapacityInputChange = (e) => {
    setCapacityInput(e.target.value);
  };

  return (
    <div>
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="name">Search by Name</option>
        <option value="code">Search by Code</option>
      </select>
      <input
        type="text"
        placeholder={`Enter ${searchType === "name" ? "Name" : "Code"}`}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleOKClick}>OK</button>

      {showResults && (
        <div>
          {searchResults.map((result) => (
            <div key={result.code}>
              <p>Name: {result.name}</p>
              <p>Code: {result.code}</p>
              <button onClick={() => handleResultSelection(result)}>
                Select
              </button>
            </div>
          ))}
        </div>
      )}

      {displayedData && (
        <div>
          <h2>Displayed Data</h2>
          <p>Name: {displayedData.name}</p>
          <p>Code: {displayedData.code}</p>
          <input
            type="text"
            placeholder="Enter Capacity"
            value={capacityInput}
            onChange={handleCapacityInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default TopSearch;
