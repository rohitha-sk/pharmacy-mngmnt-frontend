/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";


function UpdateForm({ setForm, userId, refreshUsers, setSuccessMessage }) {

    const [email, setEmail] = useState(''); 
    const [role, setRole] = useState('');

    useEffect(() => {
        // Fetch user details using the userId
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/get_user/${userId}`);
                const { email, role } = response.data;
                setEmail(email); // Set the email
                setRole(role); // Set the role
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    const handleUpdate = (e) => {
        e.preventDefault();
    
        axios
            .put(`http://localhost:5000/api/users/update_user/${userId}`, { email, role })
            .then(() => {
                setForm(false); // Close the form
                refreshUsers(); // Trigger re-fetching of user data
                // setSuccessMessage("successfully updated User Data!");
                if (setSuccessMessage) {
                    setSuccessMessage("Successfully updated user data!");
                    setTimeout(() => {
                      setSuccessMessage(""); // Clear success message after 3 seconds
                    }, 3000);
                  }
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };


    return (
   <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">Update User</h3>

        <form onSubmit={handleUpdate}>
            {/* Email Field */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Role Field */}
            <div className="mb-6">
                <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
                    Role
                </label>
                <input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                  
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update
                </button>
            </div>
       
        </form>
    </div>)
   
}

export default UpdateForm;
