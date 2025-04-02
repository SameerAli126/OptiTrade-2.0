// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\components\FormField.jsx

const FormField = ({ label, type, value, onChange, placeholder, required = true }) => (
    <div>
        <label htmlFor={label.toLowerCase()} className="sr-only">
            {label}
        </label>
        <input
            id={label.toLowerCase()}
            name={label.toLowerCase()}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
    </div>
);

export default FormField;