import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "../../axiosConfig"; 


function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const successMessage = location.state?.successMessage; // Get success message from location state
    const [showMessage, setShowMessage] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [id]: value, // Update 'email' or 'password' based on the id
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send credentials to backend API
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email: login.email,
                password: login.password,
            });
    
            console.log(response.data);

            if (response.data.token) {
                // const { token, role, email } = response.data.user;
                const { token, user } = response.data;
                const { role, email } = user;
    
                // Store the token in localStorage
                localStorage.setItem("authToken", token);
                localStorage.setItem("role", role);  // Store the role as well
                localStorage.setItem("email", email); // Store the email
    
                console.log("Token stored successfully:", token);
    
                // Redirect based on the role
                if (role === "customer") {
                    navigate("/customer-homepage", { state: { email } });
                } else if (role === "admin") {
                    navigate("/admin/home", { state: { email } });
                } else if (role === "pharmacy-rep") {
                    navigate("/rep-dashboard", { state: { email } });
                } else {
                    console.error("Unknown role:", role);
                    alert("Role not recognized");
                }
            } else {
                alert(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };
    

    React.useEffect(() => {
        if (successMessage) {
            // Immediately show the success message when received
            setShowMessage(true);

            // Hide the success message after 3 seconds
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide the message after 3 seconds
            }, 3000);

            // Cleanup the timer on component unmount or if successMessage changes
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const backgroundStyle = {
        backgroundImage: 'url("/images/pill1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={backgroundStyle}>
            <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                {/* Show success message if exists */}
                {showMessage && successMessage && (
                    <div className="bg-yellow-200 text-green-700 p-4 rounded-md mb-4 text-center">
                        <p>{successMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={login.email}
                            onChange={handleInputChange} // Use the handler for both fields
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={login.password}
                            onChange={handleInputChange} // Use the handler for both fields
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-4">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
