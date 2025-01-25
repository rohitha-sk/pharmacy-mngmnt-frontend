import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
import UserAddForm from './UserAddForm';
import Swal from 'sweetalert2';


function UserManagement() { 
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState(false); // Controls visibility of the UpdateForm
    // eslint-disable-next-line no-unused-vars
    const [currentUserId, setCurrentUserId] = useState(null); // Stores the ID of the user being edited
    const [successMessage, setSuccessMessage] = useState(''); // Stores the success message
    // eslint-disable-next-line no-unused-vars
    const [errorMessage,setErrorMessage] = useState();
    // eslint-disable-next-line no-unused-vars
    const[currentUser, setCurrentUser] = useState([]);
    // Fetch all users when the component mounts

    //controls the visibility of UserAddForm.
    const [userAddForm, setUserAddForm] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/all_users');
            setUsers(response.data); // Set users to the fetched data
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

   
   

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts or after a successful update
       
    }, []);


     // Display SweetAlert on success message update
     useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: successMessage,
                confirmButtonText: 'OK',
            }).then(() => {
                // Clear the success message after the alert
                setSuccessMessage('');
            });
        }
    }, [successMessage]);

    // Function to handle editing a user
    const handleEdit = (userId) => {
        setCurrentUserId(userId);
        setForm(true); // Show the update form
       // console.log(userId);
    };

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion
                axios
                    .delete(`http://localhost:5000/api/users/delete_user/${userId}`)
                    .then((response) => {
                        console.log('User deleted successfully:', response.data);
                        
                        Swal.fire(
                            'Deleted!',
                            'The user has been deleted.',
                            'success'
                        );
                        
                        // Refresh the user list
                        fetchUsers();
                    })
                    .catch((error) => {
                        console.error('Error deleting user:', error.response?.data || error.message);
    
                        Swal.fire(
                            'Error!',
                            'Failed to delete the user. Please try again.',
                            'error'
                        );
                    });
            } else {
                console.log('User deletion cancelled.');
            }
        });
    };
    


      const displayAddUserForm = ()=>{
        setUserAddForm(true);
      }
    

    return (
       
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl mb-4 text-center font-poppins font-bold text-blue-800" >User Management</h1>
                <button onClick={displayAddUserForm} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add New User
                </button>
            </div>

           

            {/* Render the UpdateForm only if the form state is true */}
            {form && (
                <UpdateForm
                    userId={currentUserId}
                    setForm={setForm} // Pass setForm to UpdateForm
                    setSuccessMessage={setSuccessMessage}
                    refreshUsers={fetchUsers}
                />
            )}


            {userAddForm && (
                <UserAddForm
                    setUserAddForm={setUserAddForm}
                    setSuccessMessage={setSuccessMessage}
                    refreshUsers={fetchUsers}
                />
            )}
            <br />
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Render table if form is false */}
                {!form && (
                    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-lg font-sans">
                    <thead>
                      <tr className="bg-gradient-to-r from-pink-700 to-pink-700 text-white">
                        <th className="px-4 py-2 border border-gray-300 first:rounded-tl-lg last:rounded-tr-lg">Email</th>
                        <th className="px-4 py-2 border border-gray-300">User Role</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm ">
                      {users.map((user, index) => (
                        <tr
                          key={user._id}
                          className={`${
                            index === users.length - 1
                              ? "last:rounded-bl-lg last:rounded-br-lg"
                              : ""
                          } even:bg-gray-100 odd:bg-white hover:bg-gray-50`}
                        >
                          <td className="px-4 py-2 border border-gray-300 whitespace-nowrap text-black text-lg">
                            {user.email}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 text-black text-lg">
                            {user.role}
                          </td>
                          <td className="px-5 py-3 border border-gray-200 flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(user._id)}
                              className="text-white hover:bg-blue-500 bg-blue-600 rounded-lg px-3 py-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="text-white hover:bg-orange-500 bg-red-500 rounded-lg px-3 py-2"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  
                )}
            </div>
        </div>
   
    );
}

export default UserManagement;
