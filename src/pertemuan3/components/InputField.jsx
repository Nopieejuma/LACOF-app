export default function InputField({ label, type, placeholder, value, onChange, options = [] }) {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>

      {type === "select" ? (
        <select 
          className="w-full p-2 border border-gray-300 rounded" 
          value={value} 
          onChange={onChange}
        >
          <option value="">Pilih {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      )}
    </div>
  );
}
