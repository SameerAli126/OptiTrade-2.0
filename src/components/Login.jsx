// src/components/accounts/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Corrected import path for useAuth
import { useAuth } from './dashboard/new-dashboard/contexts/AuthContext.jsx';
import { requestPasswordReset, verifyResetOTP } from "./accounts/services/authService";
// Assuming authService is in the same 'accounts' folder
import FormField from "./accounts/components/FormField";
import PasswordField from "./accounts/components/PasswordField";
import ForgotPasswordForm from "./accounts/components/ForgotPasswordForm";
import LoginImage from "../assets/img/LoginImage.jpg";
import "../App.css";

const Login = () => {
    const [view, setView] = useState('login'); // 'login' | 'forgot'
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
        rememberMe: false,
        resetEmail: "",
        resetOTP: "",
        newPassword: ""
    });

    const navigate = useNavigate();
    const { login } = useAuth(); // This hook MUST come from the SAME AuthContext instance that wraps ContextProvider

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login.jsx: handleLogin initiated with email:", formData.email);
        try {
            // Ensure your Vite proxy is configured for `/api_v1/login` if you're using it,
            // OR use the direct URL if CORS is fixed on the server.
            const response = await fetch("https://archlinux.tail9023a4.ts.net/login", {
                // const response = await fetch("/api_v1/login", { // Example if using Vite proxy
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, u_pass: formData.password }),
            });

            const data = await response.json();
            console.log("Login.jsx: API response received, status:", response.status, "data:", data);

            if (response.ok && data.token && data.user) {
                console.log("Login.jsx: Login successful, calling AuthContext.login with token and user data.");
                // The login function from useAuth() will update the state in the AuthContext instance
                login(data.token, {
                    id: data.user.id,
                    u_name: data.user.u_name,
                    email: data.user.email
                });
                console.log("Login.jsx: Navigating to /dashboard.");
                navigate("/dashboard");
            } else {
                const errorMessage = data.message || "Login failed. Please check your credentials or API response.";
                console.error("Login.jsx: Login failed.", errorMessage, "Response data:", data);
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Login.jsx: Login error during fetch or processing:', error);
            alert("An error occurred during login. Please try again.");
        }
    };

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
        // ... (rest of function - ensure paths within authService are correct)
        try {
            const response = await requestPasswordReset(formData.resetEmail);
            if (!response.ok) throw new Error(await response.text());
            setView('reset');
        } catch (error) {
            console.error('Password reset error:', error);
            alert("Failed to send OTP. Please check your email.");
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        // ... (rest of function - ensure paths within authService are correct)
        try {
            const response = await verifyResetOTP(
                formData.resetEmail,
                formData.resetOTP,
                formData.newPassword
            );

            if (!response.ok) throw new Error(await response.text());
            alert("Password reset successfully! Please login with your new password.");
            setView('login');
        } catch (error) {
            console.error('Password reset error:', error);
            alert("Failed to reset password. Please check the OTP and try again.");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Side Image */}
            <div className="hidden md:flex w-1/2 bg-cover bg-no-repeat bg-center"
                 style={{ backgroundImage: `url(${LoginImage})` }}> {/* Use the imported LoginImage */}
                {/* Removed redundant div and img tag if LoginImage is used as background */}
            </div>

            {/* Right Side Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        {view === 'login' ? 'Log in to OptiTrade' : 'Reset Password'}
                    </h2>

                    {view === 'login' ? (
                        <form onSubmit={handleLogin} className="mt-8 space-y-6">
                            <FormField
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />

                            <PasswordField
                                label="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                showPassword={formData.showPassword}
                                setShowPassword={(val) => setFormData({ ...formData, showPassword: val })}
                            />

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                    Keep me logged in for up to 30 days
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                            >
                                Log In
                            </button>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setView('forgot')}
                                    className="text-sm text-green-600 hover:text-green-500"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </form>
                    ) : (
                        <ForgotPasswordForm
                            stages={{ showResetForm: view === 'reset' }} // Assuming 'reset' is the correct stage key
                            email={formData.resetEmail}
                            otp={formData.resetOTP}
                            newPassword={formData.newPassword}
                            setEmail={(val) => setFormData({ ...formData, resetEmail: val })}
                            setOtp={(val) => setFormData({ ...formData, resetOTP: val })}
                            setNewPassword={(val) => setFormData({ ...formData, newPassword: val })}
                            onSubmitRequest={handlePasswordResetRequest}
                            onSubmitReset={handlePasswordReset}
                            onBackToLogin={() => setView('login')}
                        />
                    )}

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Not on OptiTrade?{" "}
                        <a href="/signup" className="font-medium text-green-600 hover:text-green-500">
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;