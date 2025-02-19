// Filepath: E:\WEB JS\fyp\opti-trade\src\components\Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ConnectionCheck from "./ConnectionCheck.jsx";
import LoginImage from "../assets/img/LoginImage.jpg";
import { useAuth } from './dashboard/new-dashboard/contexts/AuthContext'; // Import useAuth
import "../App.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure login from useAuth


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://archlinux.tail9023a4.ts.net/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, u_pass: password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Use the actual user data structure from your API response
                login(data.token, {
                    id: data.user.id, // Ensure this matches your API response
                    u_name: data.user.u_name,
                    email: data.user.email
                });
                navigate("/dashboard");
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    return (
        <div className="flex h-screen">
            {/* Left Side Image */}
            <div className="hidden md:flex w-1/2 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/path/to/image.jpg")' }}>
                <div className="flex items-center justify-center w-full bg-gray-200 text-gray-700 text-2xl font-semibold">
                    <img src={LoginImage} alt="LoginImage"/>
                </div>
            </div>

            {/* Right Side Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Log in to OptiTrade
                    </h2>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute bg-inherit inset-y-0 right-0 flex items-center text-gray-500 "
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Keep me logged in for up to 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Log In
                        </button>

                        <div className="flex items-center justify-between mt-4">
                            <button
                                type="button"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900"
                            >
                                I Need Help
                            </button>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="h-px bg-gray-300 w-full"></div>
                            <span className="mx-2 text-gray-500 text-sm">or</span>
                            <div className="h-px bg-gray-300 w-full"></div>
                        </div>

                        {/* Commenting out the "Log in with passkeys" button */}
                        {/* <button
                            type="button"
                            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Log in with passkeys
                        </button> */}
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Not on OptiTrade?{" "}
                        <a
                            href="/signup"
                            className="font-medium text-green-600 hover:text-green-500"
                        >
                            Create an account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
