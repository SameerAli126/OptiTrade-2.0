// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\components\PasswordField.jsx

import { useState } from "react";

const PasswordField = ({ label, value, onChange, showPassword, setShowPassword }) => (
    <div className="relative">
        <label htmlFor={label.toLowerCase()} className="sr-only">
            {label}
        </label>
        <input
            id={label.toLowerCase()}
            name={label.toLowerCase()}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            required
            placeholder={label}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bg-inherit inset-y-0 right-0 flex items-center text-gray-500"
        >
            {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
    </div>
);

export default PasswordField;