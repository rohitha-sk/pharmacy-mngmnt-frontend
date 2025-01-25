import React from 'react';

function PurchaseOrder({ display, purchaseOrderData }) {
 
    console.log(purchaseOrderData);

  const handleForm = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
      display(false); 
  
  };

  return (
    <div>
      <h1>Checkout page</h1>
        <div>Shopping cart goes here with individual item name, required quantity and total</div>
      <form onSubmit={handleForm}>
        <button
          type="submit"
          className="text-white hover:bg-blue-500 bg-blue-600 rounded-lg px-3 py-2"
        >
          Go back
        </button>
      </form>
    </div>
  );
}

export default PurchaseOrder;
