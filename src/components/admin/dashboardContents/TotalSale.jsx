import React from 'react';
import { MdAttachMoney } from 'react-icons/md';

function TotalSale() {
    return (
        <div>
           <MdAttachMoney size={30} style={{ marginRight: '8px',marginLeft:'90px' }} />
                               <span className="text-lg font-bold  text-blue-900">Total Sale</span> &nbsp;  <span className="text-lg font-bold">10</span>
                               <p>Total no. of sales per day</p> 
        </div>
    );
}

export default TotalSale;