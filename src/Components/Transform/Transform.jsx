import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";
import InputCapacity from "./InputCapacity";
import data from "../../datafake/datafake/data.json";
import ChartTable from "./ChartTable";
import Select from "react-select";

const Transform = () => {
  const [shippingMethod, setShippingMethod] = useState(null);

  const [inputFieldsAbove, setInputFieldsAbove] = useState([
    {
      name: "",
      capacity: 0,
      warehouseCodeResult: "",
      optionChoosed: 0,
    },
  ]);
  const [inputCapacitiesAbove, setInputCapacitiesAbove] = useState([]);

  const [inputFieldsBelow, setInputFieldsBelow] = useState([
    {
      name: "",
      capacity: 0,
      warehouseCodeResult: "",
      optionChoosed: 0,
    },
  ]);
  const [inputCapacitiesBelow, setInputCapacitiesBelow] = useState([]);

  const [routes, setRoutes] = useState([]);
  const [dataSupply, setDataSupply] = useState([]);
  const [dataConsumption, setDataConsumption] = useState([]);

  const handleAddClickAbove = () => {
    setShippingMethod(null);

    setInputFieldsAbove([
      ...inputFieldsAbove,
      { name: "", capacity: 0, warehouseCodeResult: "", optionChoosed: 0 }, // Add optionChoosed field
    ]);
    setInputCapacitiesAbove([...inputCapacitiesAbove, 0]);
  };

  const handleAddClickBelow = () => {
    setShippingMethod(null);

    setInputFieldsBelow([
      ...inputFieldsBelow,
      { name: "", capacity: 0, warehouseCodeResult: "", optionChoosed: 0 }, // Add optionChoosed field
    ]);
    setInputCapacitiesBelow([...inputCapacitiesBelow, 0]);
  };

  const handleInputChangeAbove = (index, field, value) => {
    const newInputs = [...inputFieldsAbove];
    newInputs[index][field] = value;

    const indexValue = data.warehouses.findIndex(
      (item) => item.name === value.trim()
    );
    if (indexValue !== -1) {
      newInputs[index].warehouseCodeResult = data.warehouses[indexValue].code;
      newInputs[index].capacity = data.warehouses[indexValue].capacity;
    } else {
      newInputs[index].warehouseCodeResult = "";
    }
    setInputFieldsAbove(newInputs);
  };

  const handleCapacityChangeAbove = (index, value) => {
    const newCapacities = [...inputCapacitiesAbove];
    newCapacities[index] = value;

    const temp = [...inputFieldsAbove];
    temp[index].optionChoosed = value;
    setInputFieldsAbove(temp);
    setInputCapacitiesAbove(newCapacities);
  };

  const handleInputChangeBelow = (index, field, value) => {
    const newInputs = [...inputFieldsBelow];
    newInputs[index][field] = value;

    const indexValue = data.warehouses.findIndex(
      (item) => item.name === value.trim()
    );
    if (indexValue !== -1) {
      newInputs[index].warehouseCodeResult = data.warehouses[indexValue].code;
      newInputs[index].capacity = data.warehouses[indexValue].capacity;
    } else {
      newInputs[index].warehouseCodeResult = "";
    }

    setInputFieldsBelow(newInputs);
  };

  const handleCapacityChangeBelow = (index, value) => {
    const newCapacities = [...inputCapacitiesBelow];
    newCapacities[index] = value;

    const temp = [...inputFieldsBelow];
    temp[index].optionChoosed = value;
    setInputFieldsBelow(temp);
    setInputCapacitiesBelow(newCapacities);
  };

  const options = [
    { value: "", label: "Choose Route" },
    { value: "road", label: "Road" },
    {
      value: "waterway",
      label: "Sea Route",
    },
    {
      value: "airway",
      label: "Air Route",
    },
  ];
  useEffect(() => {
    if (shippingMethod) {
      const supplyData = [];
      const consumptionData = [...dataConsumption]; // Copy the existing dataConsumption

      inputFieldsAbove.forEach((aboveField, index) => {
        supplyData.push({
          code: aboveField.warehouseCodeResult,
          capacity: inputCapacitiesAbove[index],
        });
      });

      inputFieldsBelow.forEach((belowField, index) => {
        consumptionData.push({
          code: belowField.warehouseCodeResult,
          capacity: inputCapacitiesBelow[index],
        });
      });

      setDataSupply(supplyData);
      setDataConsumption(consumptionData);

      const routes = [];
      inputFieldsAbove.forEach((aboveField) => {
        inputFieldsBelow.forEach((belowField) => {
          routes.push([
            aboveField.warehouseCodeResult,
            belowField.warehouseCodeResult,
          ]);
        });
      });

      setRoutes(routes);
    } else {
      // If shippingMethod is not selected, clear the data
      setDataSupply([]);
      setDataConsumption([]);
      setRoutes([]);
    }
  }, [
    shippingMethod,
    inputFieldsAbove,
    inputFieldsBelow,
    inputCapacitiesAbove,
    inputCapacitiesBelow,
  ]);

  // Hàm xử lý khi chọn phương thức vận chuyển
  const handleShippingMethodChange = (selectedOption) => {
    setShippingMethod(selectedOption);
  };

  return (
    <div className="container p-10 bg-opacity-40 bg-gray-300 shadow-md rounded-lg border border-gray-300">
      <iframe
        title="External Website"
        src="http://reshmat.ru/transportation_problem_lp.html" // Đặt URL của website bạn muốn nhúng ở đây
        width="100%"
        height="600px"
        frameBorder="0"></iframe>
    </div>
  );
};

export default Transform;
