import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

function OutofStock() {
    return (
        <div>
             <MdErrorOutline size={30} style={{ marginRight: '8px',marginLeft:'90px' }} />
                    <span className="text-lg font-bold  text-blue-900">Out of Stock</span> &nbsp;  <span className="text-lg font-bold">12</span>
                    <p>No. of items to be ordered</p>
        </div>
    );
}

export default OutofStock;