// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\components\VerifyOtpForm.jsx

import FormField from "./FormField.jsx";

const VerifyOtpForm = ({ otp, setOtp, otpEmail, onSubmit }) => (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FormField
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
        />

        <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
            Verify OTP
        </button>

        <p className="text-center text-sm text-gray-600">
            A verification OTP has been sent to {otpEmail}
        </p>
    </form>
);

export default VerifyOtpForm;