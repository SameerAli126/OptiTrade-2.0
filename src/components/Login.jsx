import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './dashboard/new-dashboard/contexts/AuthContext.jsx';
import { requestPasswordReset, verifyResetOTP } from "./accounts/services/authService";
import FormField from "./accounts/components/FormField";
import PasswordField from "./accounts/components/PasswordField";
import ForgotPasswordForm from "./accounts/components/ForgotPasswordForm";
import LoginImage from "../assets/img/LoginImage.jpg";
import { LOGIN } from '../config/apiEndpoints';
import "../App.css";

// Dummy account for offline development
const DUMMY_CREDENTIALS = {
    email: 'dev@example.com',
    password: 'devpassword',
    token: 'dummy-token',
    user: {
        id: 'dev-user',
        u_name: 'Developer',
        email: 'dev@example.com'
    }
};

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
    const { login } = useAuth();
    const isDev = process.env.NODE_ENV === 'development';

    const handleLogin = async (e) => {
        e.preventDefault();
        // Attempt real login first
        try {
            const response = await fetch(`/api${LOGIN}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, u_pass: formData.password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token, {
                    id: data.user.id,
                    u_name: data.user.u_name,
                    email: data.user.email
                });
                navigate("/dashboard");
                return;
            }
            // If server responded but credentials invalid, show error
            const errorText = await response.text();
            console.warn('Login failed:', errorText);
            alert('Login failed: ' + errorText);
        } catch (error) {
            console.error('Login error:', error);
            // Fallback to dummy in development when offline
            if (isDev && (formData.email === DUMMY_CREDENTIALS.email && formData.password === DUMMY_CREDENTIALS.password)) {
                console.info('Using dummy credentials for offline login');
                login(DUMMY_CREDENTIALS.token, DUMMY_CREDENTIALS.user);
                navigate("/dashboard");
            } else {
                alert('Unable to reach server. Please check your network or try again later.');
            }
        }
    };

    const handlePasswordResetRequest = async (e) => {
        e.preventDefault();
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
                 style={{ backgroundImage: 'url("/path/to/image.jpg")' }}>
                <div className="flex items-center justify-center w-full bg-gray-200 text-gray-700 text-2xl font-semibold">
                    <img src={LoginImage} alt="LoginImage" />
                </div>
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
                            stages={{ showResetForm: view === 'reset' }}
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
