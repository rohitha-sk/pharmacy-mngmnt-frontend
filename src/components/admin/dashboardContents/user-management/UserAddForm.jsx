/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';

function UserAddForm({ setUserAddForm, refreshUsers, setSuccessMessage }) {

    const [addUser, setAddUser] = useState({
            email: "",
            role: "",
            password: "",
        });
const [errors, setErrors] = useState({});


        const handleInputChange=(e)=>{
           const {id,value} = e.target;
           setAddUser((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        }


        const validateForm = () => {
            const newErrors = {};
    
            if (!addUser.email.trim()) {
                newErrors.email = "Email is required.";
            } else if (!/\S+@\S+\.\S+/.test(addUser.email)) {
                newErrors.email = "Invalid email format.";
            }
    
            if (!addUser.password) {
                newErrors.password = "Password is required.";
            } else if (addUser.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters.";
            }
    
            if (!addUser.role) {
                newErrors.role = "Role field is required.";
            } else if (!/^[a-zA-Z]+$/.test(addUser.role)) {
                newErrors.role = "Role must only contain letters.";
            }
    
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

    const handleSubmit = (e)=>{
        e.preventDefault();
            if (validateForm()) {
                console.log("Form submitted successfully", addUser);

                axios
                .post("http://localhost:5000/api/users/add_user", {
                    email: addUser.email,
                    role:addUser.role,
                    password: addUser.password
                })
                .then((response) => {
                    // Handle the success response
                    console.log("User added successfully:", response.data);
    
                    // Optionally clear the form data
                    setAddUser({ email: "", role: "", password: "" });
                    if (setSuccessMessage) {
                        setSuccessMessage("User Added successfully!");
                        // setTimeout(() => {
                        //   setSuccessMessage(""); // Clear success message after 3 seconds
                        // }, 4000);
                      }
                    setUserAddForm(false);
                    refreshUsers();
                   
                       
                      
                })
                .catch((error) => {
                    // Handle the error response
                    console.error("There was an error adding the user:", error);
                    alert("User adding failed. Please try again.");
                });


            }
    }


    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">Add New User</h3>

        <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={addUser.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Role Field */}
            <div className="mb-6">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                    Role
                </label>
                <input
                    id="role"
                    type="text"
                    value={addUser.role}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>

             {/* Password Field */}
             <div className="mb-6">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={addUser.password}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                  
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add
                </button>
            </div>
       
        </form>
    </div>
    );
}

export default UserAddForm;