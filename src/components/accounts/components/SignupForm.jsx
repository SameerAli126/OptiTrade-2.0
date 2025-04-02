// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\components\SignupForm.jsx

import FormField from "./FormField.jsx";
import PasswordField from "./PasswordField.jsx";

const SignupForm = ({
                        name,
                        email,
                        password,
                        confirmPassword,
                        termsAccepted,
                        showPassword,
                        showConfirmPassword,
                        setName,
                        setEmail,
                        setPassword,
                        setConfirmPassword,
                        setTermsAccepted,
                        setShowPassword,
                        setShowConfirmPassword,
                        onSubmit
                    }) => (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FormField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
        />

        <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />

        <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
        />

        <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
        />

        <div className="flex items-center">
            <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I have read all the terms and conditions
            </label>
        </div>

        <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            Sign Up
        </button>
    </form>
);

export default SignupForm;