// Filepath: E:\WEB JS\fyp\opti-trade\src\components\DashHeader.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="flex flex-col lg:flex-row items-center justify-between py-7 px-4 lg:px-20">
            <div className="flex items-center justify-between w-full lg:w-auto">
                <h1 className="font-semibold text-3xl lg:text-4xl text-black">OptiTrade</h1>
                <div className="lg:hidden flex items-center">
                    <Link to="/signup">
                        <button className="flex items-center justify-center w-28 h-10 rounded-full border border-white font-semibold text-lg bg-black text-white mr-3">
                            Sign up
                        </button>
                    </Link>
                    <button
                        type="button"
                        aria-label="Drawer Menu Button"
                        className="text-black"
                        onClick={toggleMenu}
                    >
                        ☰
                    </button>
                </div>
            </div>
            <div className={`flex-col lg:flex-row gap-4 mt-4 lg:mt-0 ${isOpen ? 'flex' : 'hidden'} lg:flex lg:gap-16 bg-lime p-4 lg:p-0 lg:ml-0`} style={{ alignSelf: 'flex-start' }}>
                <nav className="flex flex-col lg:flex-row gap-4 lg:gap-16">
                    <Link to="/" className="font-montserrat text-xl lg:text-2xl font-semibold text-black no-underline">Home</Link>
                    <Link to="/trading" className="font-montserrat text-xl lg:text-2xl font-semibold text-black no-underline">Trading</Link>
                    <Link to="/screener" className="font-montserrat text-xl lg:text-2xl font-semibold text-black no-underline">Screener</Link>
                    <Link to="/learn" className="font-montserrat text-xl lg:text-2xl font-semibold text-black no-underline">Learn</Link>
                    <Link to="/about" className="font-montserrat text-xl lg:text-2xl font-semibold text-black no-underline">About</Link>
                </nav>
                {!token && (
                    <Link to="/login" className="font-montserrat text-xl lg:text-2xl font-semibold text-black no-underline lg:hidden">
                        Log in
                    </Link>
                )}
            </div>
            <div className="hidden lg:flex gap-3 mt-4 lg:mt-0">
                {token ? (
                    <button
                        className="flex items-center justify-center w-28 lg:w-32 h-10 lg:h-11 rounded-full border border-black font-semibold text-lg bg-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="flex items-center justify-center w-28 lg:w-32 h-10 lg:h-11 rounded-full border border-black font-semibold text-lg bg-black text-white">
                                Log in
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="flex items-center justify-center w-28 lg:w-32 h-10 lg:h-11 rounded-full border border-white font-semibold text-lg bg-black text-white">
                                Sign up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
