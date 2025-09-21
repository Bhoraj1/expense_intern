const TextArea = ({
  label,
  value,
  name,
  onChange,
  placeholder,
  required = false,
  rows = 3,
  className = "",
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-none focus:ring-2 focus:ring-primary-red ${className}`}
      />
    </div>
  );
};

export default TextArea;
