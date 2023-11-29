import React from "react";
import TopSearch from "../SearchTop/TopSearch";
import BottomSearch from "../BottomSearch/BottomSearch";
import ShippingMethod from "../ShippingMethod/ShippingMethod";
import DynamicTopSearch from "../DynamicTopSearch/DynamicTopSearch";

const Data = () => {
  const data = [
    { name: "Kho1", code: "10" },
    { name: "Kho2", code: "20" },
  ];

  return (
    <div>
      <DynamicTopSearch data={data} />
      <ShippingMethod />
      <DynamicTopSearch data={data} />
    </div>
  );
};

export default Data;
