import React, { useState } from "react";

const ShippingMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div>
      <label>Select Shipping Method:</label>
      <select value={selectedMethod} onChange={handleMethodChange}>
        <option value="">Choose a method</option>
        <option value="sea">Sea Route</option>
        <option value="air">Air Route</option>
        <option value="road">Road Route</option>
      </select>
      {selectedMethod && (
        <p>Selected method: {selectedMethod.toUpperCase()} Route</p>
      )}
    </div>
  );
};

export default ShippingMethod;
