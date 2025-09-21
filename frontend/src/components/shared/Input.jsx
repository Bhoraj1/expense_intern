import { useState } from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  validationType,
  ...props
}) => {
  const [error, setError] = useState("");

  const handleKeyPress = (e) => {
    if (
      type === "number" &&
      !/[0-9.-]/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "Tab",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }

    if (
      validationType === "date" &&
      !/[0-9-]/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "Tab",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleBlur = (e) => {
    if (validationType === "date") {
      const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
      if (!regex.test(e.target.value)) {
        setError("Invalid date format! Use YYYY-MM-DD.");
      } else {
        setError("");
      }
    }
  };

  const handleWheel = (e) => {
    if (type === "number") {
      e.target.blur();
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        onWheel={handleWheel}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-primary-red"
          } 
          ${
            type === "number"
              ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              : ""
          } 
          ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
