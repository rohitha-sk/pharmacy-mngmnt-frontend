import React, { useState } from 'react';
import { FaSignOutAlt, FaUserCircle, FaChevronDown, FaHome } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoIosHome } from 'react-icons/io';
import { RiMedicineBottleLine } from "react-icons/ri";
import { HiTruck } from "react-icons/hi2";


function Dashboard() {

  const navigate = useNavigate();  
  const userEmail = localStorage.getItem('email') || "Unknown"; 


  // eslint-disable-next-line no-unused-vars
  const handleNavigateHome = () => {
    navigate('/admin/home',{ state: userEmail });  // Navigates to the /admin/home route
  };
  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    console.log("User logged out");

    // Redirect to the login page (or any other route)
    navigate('/', { state: { successMessage: "You have logged out successfully!" } });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-slate-700 text-white p-4 flex justify-between items-center relative">
        <h1 className="text-xl font-bold">Dashboard</h1>
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
                    <span>{userEmail}</span>
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
        <aside className="w-64 bg-sky-600 text-white flex flex-col">
          <ul className="flex-grow p-4 space-y-2">
            {/* <li className="hover:bg-gray-700 px-3 py-2 rounded">
            <FaHome className="text-white" /><button onClick={handleNavigateHome} className="text-white">Home</button>
            </li> */}

          <Link to="/admin/home">
            <li className="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
            <IoIosHome className="text-white" />
          <span>Home</span>
          </li>
          </Link>

            <Link to="/admin/display_users">
            <li className="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
            <FaUser className="text-white" />
          <span>User Management</span>
          </li>
            </Link>
            <Link to="/admin/display_stock_items">
            <li className="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
            <RiMedicineBottleLine  className="text-white" />
          <span>Stock management</span>
          </li>
            </Link>
            <Link to="/admin/reorder_items">
            <li className="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
            <HiTruck  className="text-white" />
          <span>Purchasing Items</span>
          </li>
            </Link>
            <Link to="/admin/settings">
            <li className="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
            <IoSettings  className="text-white" />
          <span>Settings</span>
          </li>
            </Link>
           
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-6">
          <div className="grid gap-4 p-4">
            {/* Render dynamic content based on route */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
