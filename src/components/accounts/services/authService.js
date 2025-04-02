// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\services\authService.js

export const signup = async (userData) => {
    const response = await fetch("https://archlinux.tail9023a4.ts.net/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response;
};

export const verifyOTP = async (email, otp) => {
    const response = await fetch("https://archlinux.tail9023a4.ts.net/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    });
    return response;
};

export const requestPasswordReset = async (email) => {
    const response = await fetch("https://archlinux.tail9023a4.ts.net/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    return response;
};

// In src/components/accounts/services/authService.js
export const verifyResetOTP = async (email, otp, newPassword) => {
    const response = await fetch("https://archlinux.tail9023a4.ts.net/verify-reset-otp", {
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