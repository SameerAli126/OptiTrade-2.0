// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\services\authService.js
import { SIGNUP, VERIFY_OTP, FORGOT_PASSWORD, VERIFY_RESET_OTP } from '../../../config/apiEndpoints';
export const signup = async (userData) => {
    const response = await fetch(`/api${SIGNUP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response;
};

export const verifyOTP = async (email, otp) => {
    const response = await fetch(`/api${VERIFY_OTP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    });
    return response;
};

export const requestPasswordReset = async (email) => {
    const response = await fetch(`/api${FORGOT_PASSWORD}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    return response;
};

// In src/components/accounts/services/authService.js
export const verifyResetOTP = async (email, otp, newPassword) => {
    const response = await fetch(`/api${VERIFY_RESET_OTP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            otp,
            new_password: newPassword // Match backend's expected parameter name
        }),
    });
    return response;
};