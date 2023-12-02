import React, { useEffect, useState } from "react";
import datashipping from "../../datafake/datafake/methodshipping.json";

const ChartTable = ({
  routes,
  methodshipping,
  dataSupply,
  dataConsumption,
}) => {
  const [values, setValues] = useState([]);
  console.log("routes", routes);
  console.log("methodshipping", methodshipping);
  console.log("dataSupply and length", dataSupply, dataSupply.length);
  console.log("dataConsumption", dataConsumption, dataConsumption.length);

  useEffect(() => {
    // Kiểm tra xem routes có giá trị hay không và có đủ phần tử hay không
    if (routes && routes.length > 0) {
      // Duyệt qua mảng routes
      routes.forEach((route) => {
        const [start, finish] = route;

        // Kiểm tra xem start và finish có giá trị hay không
        if (start && finish) {
          // Lấy giá trị từ datashipping
          const valueFromDatashipping =
            datashipping[start][finish][methodshipping];

          // Log giá trị
          console.log(valueFromDatashipping);

          // Đẩy giá trị vào mảng (nếu chưa có, khởi tạo mảng trước đó)
          setValues((prevValues) => [...prevValues, valueFromDatashipping]);
        }
      });
    }
  }, [routes, methodshipping]);

  console.log(values);

  const renderRows = () => {
    // Render rows based on dataSupply
    const rows = dataSupply.map((supply, supplyIndex) => (
      <tr
        key={`row-${supplyIndex}`}
        className="border-b-2 border-gray-800 font-medium">
        <td className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-800">
          {`A${supplyIndex + 1}`}
        </td>
        {renderColumns(supplyIndex)}
        <td className="whitespace-nowrap px-6 py-4">{supply.optionChoosed}</td>
      </tr>
    ));

    // Add the "Warehouse Capacity" row
    rows.push(
      <tr key="warehouse-capacity" className="border-b">
        <td className="whitespace-nowrap border-r px-6 py-4 font-medium border-gray-800">
          Warehouse Capacity
        </td>
        {dataConsumption.map((consumption, index) => (
          <td
            key={`warehouse-capacity-${index}`}
            className="whitespace-nowrap border-r border-gray-800 px-6 py-4">
            {consumption.optionChoosed}
          </td>
        ))}
        <td className="whitespace-nowrap px-6 py-4">
          {calculateTotalIntersection()}
        </td>
      </tr>
    );

    return rows;
  };

  const renderColumns = (supplyIndex) => {
    // Render columns based on dataConsumption and values
    return dataConsumption.map((consumption, consumptionIndex) => (
      <td
        key={`col-${consumptionIndex}`}
        className="whitespace-nowrap border-r border-gray-800 px-6 py-4">
        {consumptionIndex === supplyIndex
          ? values[consumptionIndex] || getRandomNumber()
          : getRandomNumber()}
      </td>
    ));
  };

  const calculateTotalIntersection = () => {
    // Convert optionChoosed values to numbers and calculate the total
    const totalSupply = dataSupply.reduce(
      (total, supply) => total + Number(supply.optionChoosed),
      0
    );
    const totalConsumption = dataConsumption.reduce(
      (total, consumption) => total + Number(consumption.optionChoosed),
      0
    );

    // If the totals are equal, display a single value; otherwise, format separately
    return totalSupply === totalConsumption
      ? totalSupply
      : `${totalConsumption} l ${totalSupply}`;
  };

  const getRandomNumber = () => {
    // Generate a random number between 3 and 20
    return Math.floor(Math.random() * (20 - 3 + 1) + 3);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="pb-3 font-bold">Chart</h1>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full border text-center text-sm font-medium">
                <thead className="border-b-2 border-gray-800 font-medium">
                  <tr>
                    <th
                      scope="col"
                      className="border-r px-6 py-4 border-gray-800"
                      rowSpan={2}>
                      Start
                    </th>
                    {dataConsumption.map((consumption, index) => (
                      <th
                        key={`header-${index}`}
                        scope="col"
                        className={`border-r border-b px-6 py-4 border-gray-800 ${
                          index === dataConsumption.length - 1
                            ? ""
                            : "border-gray-800"
                        }`}>
                        Finish {index + 1}
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-4" rowSpan={2}>
                      Consumption
                    </th>
                  </tr>
                  <tr>
                    {dataConsumption.map((_, index) => (
                      <th
                        key={`sub-header-${index}`}
                        scope="col"
                        className={`border-r px-6 py-4 border-gray-800 ${
                          index === dataConsumption.length - 1
                            ? ""
                            : "border-gray-800"
                        }`}>
                        B{index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartTable;
