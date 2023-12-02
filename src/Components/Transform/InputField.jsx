// InputField.js
import React from "react";

const InputField = ({ labelText, placeholder, disabled, value, onChange }) => {
  return (
    <div className="flex-grow mr-4">
      <label className="block text-gray-700 text-sm mb-2" htmlFor={labelText}>
        {labelText}
      </label>
      <input
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        type="text"
        id={labelText}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
