import React from 'react';
import { MdPerson } from 'react-icons/md';

function Users() {
    return (
        <div>
             <MdPerson size={30} style={{ marginRight: '8px',marginLeft:'90px' }} />
                                           <span className="text-lg font-bold  text-blue-900">Sys.Users</span> &nbsp; <span className="text-lg font-bold">8</span>
                                           <p>No. of system users</p> 
        </div>
    );
}

export default Users;