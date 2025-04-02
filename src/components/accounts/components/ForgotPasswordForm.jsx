// src/components/accounts/components/ForgotPasswordForm.jsx
import FormField from "./FormField";
import PasswordField from "./PasswordField";

const ForgotPasswordForm = ({
                                stages,
                                email,
                                otp,
                                newPassword,
                                setEmail,
                                setOtp,
                                setNewPassword,
                                onSubmitRequest,
                                onSubmitReset,
                                onBackToLogin
                            }) => {
    if (stages.showResetForm) {
        return (
            <form onSubmit={onSubmitReset} className="space-y-6">
                <FormField
                    label="OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                />

                <PasswordField
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    showPassword={false}
                    setShowPassword={() => {}}
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                >
                    Reset Password
                </button>

                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-sm text-green-600 hover:text-green-500 w-full text-center"
                >
                    Back to Login
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={onSubmitRequest} className="space-y-6">
            <FormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />

            <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
            >
                Send OTP
            </button>

            <button
                type="button"
                onClick={onBackToLogin}
                className="text-sm text-green-600 hover:text-green-500 w-full text-center"
            >
                Back to Login
            </button>
        </form>
    );
};

export default ForgotPasswordForm;