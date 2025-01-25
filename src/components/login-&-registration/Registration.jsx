/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {
    const backgroundStyle = {
        backgroundImage: 'url("/images/pill1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const [regData, setRegData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();  // To navigate after success

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setRegData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!regData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(regData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!regData.password) {
            newErrors.password = "Password is required.";
        } else if (regData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!regData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required.";
        } else if (regData.password !== regData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
    
        // Validate the form before proceeding
        if (validateForm()) {
            console.log("Form submitted successfully", regData);
    
            // Send the POST request with form data using axios
            axios
                .post("http://localhost:5000/api/users/register", {
                    email: regData.email,
                    password: regData.password
                })
                .then((response) => {
                    // Handle the success response
                    console.log("User registered successfully:", response.data);
    
                    // Optionally clear the form data
                    setRegData({ email: "", password: "", confirmPassword: "" });
    
                    // Navigate to the login page with a success message
                    navigate('/', { state: { successMessage: "Registration successful! Please login." } });
                })
                .catch((error) => {
                    // Handle the error response
                    console.error("There was an error registering the user:", error);
                    alert("Registration failed. Please try again.");
                });
        }
    };
    

    return (
        <div style={backgroundStyle}>
            <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                                errors.email ? 'border-red-500' : 'focus:ring-blue-300'
                            }`}
                            value={regData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label> 
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                                errors.password ? 'border-red-500' : 'focus:ring-blue-300'
                            }`}
                            value={regData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
                                errors.confirmPassword ? 'border-red-500' : 'focus:ring-blue-300'
                            }`}
                            value={regData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Already Have an account?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Registration;
