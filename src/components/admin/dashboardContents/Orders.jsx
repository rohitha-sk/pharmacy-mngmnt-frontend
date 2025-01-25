import React from 'react';
import { FaPills } from 'react-icons/fa';

function Orders() {
    return (
        <div>
            <FaPills size={30} style={{ marginRight: '8px',marginLeft:'90px' }} />
                               <span className="text-lg font-bold text-blue-900">Cus. Orders</span> &nbsp;  <span className="text-lg font-bold">21</span>
                               <p>No. of Prescriptions</p> 
        </div>
    );
}

export default Orders;