import React from "react";

const MainS2 = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header Section */}
            <header className="bg-blue-500 text-white py-4 shadow-lg">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold">Frame 3 Design</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Add your specific layout content here */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Title of Section
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Add descriptive text, images, or other elements based on the PNG design.
                    </p>

                    {/* Example Buttons */}
                    <div className="mt-4 flex space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Button 1
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            Button 2
                        </button>
                    </div>

                    {/* Example Card/Box */}
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
                        <h3 className="text-lg font-semibold">Card Title</h3>
                        <p className="text-sm text-gray-500">
                            Supporting text for the card. Add as per your design.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">© 2024 Your Company Name. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainS2;
