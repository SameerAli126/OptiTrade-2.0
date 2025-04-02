// Filepath: E:\WEB JS\fyp\opti-trade\src\components\accounts\Signup.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, verifyOTP } from "./accounts/services/authService";
import SignupForm from "./accounts/components/SignupForm.jsx";
import VerifyOtpForm from "./accounts/components/VerifyOtpForm.jsx";
import "../App.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        showPassword: false,
        showConfirmPassword: false,
        otpSent: false,
        otp: "",
        otpEmail: ""
    });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await signup({ u_name: name, email, u_pass: password });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Signup failed: " + errorData.message);
                return;
            }

            setFormData(prev => ({
                ...prev,
                otpSent: true,
                otpEmail: email
            }));

        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again later.");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await verifyOTP(formData.otpEmail, formData.otp);

            if (!response.ok) {
                const errorData = await response.json();
                alert("Verification failed: " + errorData.message);
                return;
            }

            alert("Email verified successfully! You can now login.");
            navigate("/login");
        } catch (error) {
            console.error("Error during OTP verification:", error);
            alert("An error occurred during verification. Please try again.");
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-full md:w-1/2 flex items-center justify-center px-6">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        {formData.otpSent ? "Verify Email" : "Sign Up for OptiTrade"}
                    </h2>

                    {formData.otpSent ? (
                        <VerifyOtpForm
                            otp={formData.otp}
                            setOtp={(value) => setFormData(prev => ({ ...prev, otp: value }))}
                            otpEmail={formData.otpEmail}
                            onSubmit={handleVerifyOtp}
                        />
                    ) : (
                        <SignupForm
                            {...formData}
                            setName={(value) => setFormData(prev => ({ ...prev, name: value }))}
                            setEmail={(value) => setFormData(prev => ({ ...prev, email: value }))}
                            setPassword={(value) => setFormData(prev => ({ ...prev, password: value }))}
                            setConfirmPassword={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
                            setTermsAccepted={(value) => setFormData(prev => ({ ...prev, termsAccepted: value }))}
                            setShowPassword={(value) => setFormData(prev => ({ ...prev, showPassword: value }))}
                            setShowConfirmPassword={(value) => setFormData(prev => ({ ...prev, showConfirmPassword: value }))}
                            onSubmit={handleSignup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;