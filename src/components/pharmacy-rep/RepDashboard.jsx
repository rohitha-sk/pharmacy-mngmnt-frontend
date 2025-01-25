import React, { useState } from 'react';
import { FaSignOutAlt, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function RepDashboard() {
    const location = useLocation();
    const userEmail = location.state?.email || "Unknown"; // Default to "Unknown" if email is not passed
    const navigate = useNavigate();  // Hook for navigation

    // State to manage dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('authToken');
        console.log("User logged out");

        // Redirect to the login page (or any other route)
        navigate('/', { state: { successMessage: "You have logged out successfully!" } });
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
                <h1 className="text-xl font-bold">Pharmacy Rep Dashboard</h1>
                {/* Profile and Dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        <FaUserCircle className="text-2xl" />
                        <span>{userEmail}</span>
                        <FaChevronDown className="text-sm" />
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg">
                            <ul className="py-2">
                                {/* Profile Option */}
                                <li>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                                        onClick={() => alert("Go to Profile")}
                                    >
                                        <FaUserCircle className="text-lg" />
                                        <span>Profile</span>
                                    </button>
                                </li>
                                <hr className="border-gray-200 my-1" />
                                {/* Logout Option */}
                                <li>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100"
                                        onClick={handleLogout}  // Call handleLogout on click
                                    >
                                        <FaSignOutAlt className="text-lg" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white flex flex-col">
                    <div className="p-4 font-bold text-lg border-b border-gray-700">
                        Sidebar
                    </div>
                    <ul className="flex-grow p-4 space-y-2">
                        <li className="hover:bg-gray-700 px-3 py-2 rounded">
                            <a href="#">Home</a>
                        </li>
                        <li className="hover:bg-gray-700 px-3 py-2 rounded">
                            <a href="#">Profile</a>
                        </li>
                        <li className="hover:bg-gray-700 px-3 py-2 rounded">
                            <a href="#">Settings</a>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-grow bg-gray-100 p-6">
                    <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
                    <p className="text-gray-700">
                        This is the main content area. Add your content here.
                    </p>
                </main>
            </div>
        </div>
    );
}

export default RepDashboard;
