import React, { useEffect, useState } from "react";

const InputCapacity = ({ warehouseCapacityOptions, onChange }) => {
  const [options, setOptions] = useState([]);
  // console.log("Received warehouseCapacity:", warehouseCapacityOptions);
  // const options = Array.from(
  //   { length: warehouseCapacityOptions?.split(" ")[0] },
  //   (_, index) => index + 1
  // );
  useEffect(() => {
    // console.log(11);
    if (warehouseCapacityOptions) {
      setOptions(
        Array.from(
          { length: warehouseCapacityOptions?.split(" ")[0] },
          (_, index) => ++index
        )
      );
    }
  }, [warehouseCapacityOptions]);
  return (
    <div className="w-1/3 pl-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="selectCapacity"
        >
          Capacity
        </label>
        <select
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          id="selectCapacity"
          placeholder="Select Capacity"
          onChange={onChange}
        >
          <option value="">Select Capacity</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputCapacity;
