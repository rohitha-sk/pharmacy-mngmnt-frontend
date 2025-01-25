import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Card from "../Card";
import { CgFileDocument } from "react-icons/cg";
import axios from "axios";
import ItemAddForm from "./ItemAddForm";
import ItemUpdateForm from "./ItemUpdateForm"; 
import Swal from 'sweetalert2';

function StockManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]); // Store item values
  const [filteredRecords, setFilteredRecords] = useState(items);
  const [showItemAddForm, setShowItemAddForm] = useState(false); // Toggle between table and form
  //track the updateform visibility status
  const [showItemUpdateForm, setShowItemUpdateForm] = useState(false);
  //passing item id for update form
  const [itemId,setItemId]=useState(null);
  //display update form success alert
  const [successAlert,setSuccessAlert] = useState('');



  useEffect(() => {
          if (successAlert) {
              Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: successAlert,
                  confirmButtonText: 'OK',
              }).then(() => {
                  // Clear the success message after the alert
                  setSuccessAlert('');
              });
          }
      }, [successAlert]);
 
 

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory/all_items");
      setItems(response.data); // Set fetched data
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredRecords(items);
  }, [items]);


 // Filter items based on search term
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecords(filtered);
  
  };

  // Show ItemAddForm
  const handleItemForm = () => {
    setShowItemAddForm(true);
  };

  // Handle back to stock management
  const handleBackToStockManagement = () => {
    setShowItemAddForm(false);
    setShowItemUpdateForm(false); 

  };

  const handleEditItem = (id) => {
    console.log("Edit item with id:", id);
    setShowItemUpdateForm(true);
    setItemId(id);
  };
 
  const handleDelete = (id) => {
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
                .delete(`http://localhost:5000/api/inventory/delete_item/${id}`)
                .then((response) => {
                    console.log('Item deleted successfully:', response.data);

                    Swal.fire(
                        'Deleted!',
                        'The item has been deleted.',
                        'success'
                    );

                    // Refresh the inventory list (assuming a fetchInventory function exists)
                    fetchItems();
                })
                .catch((error) => {
                    console.error('Error deleting item:', error.response?.data || error.message);

                    Swal.fire(
                        'Error!',
                        'Failed to delete the item. Please try again.',
                        'error'
                    );
                });
        } else {
            console.log('Item deletion cancelled.');
        }
    });
};

 

  return (
    <div className="p-4">
      {showItemAddForm ? (
        // Display ItemAddForm
        <Card>
          <ItemAddForm onBack={handleBackToStockManagement} refreshTable = {fetchItems} />
        </Card>
      ) : showItemUpdateForm ? (
        <Card>
          <ItemUpdateForm
            onBack={handleBackToStockManagement} 
            itemId={itemId}
            refetch={fetchItems}
            closeForm={setShowItemUpdateForm}
            updateAlert={setSuccessAlert}
          />
        </Card>
      ) : (
       
        <Card style={{backgroundColor:"#F8F8FF"}}>
          <div className="mb-4 flex justify-between items-center">
          <h1 className="text-3xl mb-4 text-center font-poppins font-bold text-blue-800" >Stock Management</h1>
          <br />
            <button
              onClick={handleItemForm}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add New Item
            </button>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search"
             onChange={handleSearchChange }
              className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
              Search
            </button>
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border-6 border-blue-800 rounded-lg overflow-hidden shadow-lg font-sans">
  <thead>
    <tr className="bg-gradient-to-r from-pink-700 to-pink-700 text-white">
      <th className="px-4 py-2 border border-gray-300 first:rounded-tl-lg last:rounded-tr-lg">Name</th>
      <th className="px-4 py-2 border border-gray-300">Qty in Stock</th>
      <th className="px-4 py-2 border border-gray-300">Unit Price</th>
      <th className="px-4 py-2 border border-gray-300">Dosage Form</th>
      <th className="px-4 py-2 border border-gray-300">Brand Name</th>
      <th className="px-4 py-2 border border-gray-300">Supplier Name</th>
      <th className="px-4 py-2 border border-gray-300 text-center">Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredRecords.map((item, index) => (
      <tr
        key={item._id}
        className={`${
          index === filteredRecords.length - 1
            ? "last:rounded-bl-lg last:rounded-br-lg"
            : ""
        } even:bg-gray-100 odd:bg-white hover:bg-gray-50`}

      >
        <td className="px-4 py-2 border border-gray-300">{item.name}</td>
        <td className="px-4 py-2 border border-gray-300">{item.qty_in_stock}</td>
        <td className="px-4 py-2 border border-gray-300">
          {item.unit_price?.["$numberDecimal"] || item.unit_price}
        </td>
        <td className="px-4 py-2 border border-gray-300">{item.dosage_form}</td>
        <td className="px-4 py-2 border border-gray-300">{item.brand_name}</td>
        <td className="px-4 py-2 border border-gray-300">{item.supplier_name}</td>
        <td className="px-5 py-3 border border-gray-200 flex justify-center gap-2">
          <button className="text-white hover:bg-gray-600 bg-gray-700 rounded-lg px-3 py-2">
            <CgFileDocument />
          </button>
          <button
            onClick={() => handleEditItem(item._id)}
            className="text-white hover:bg-blue-500 bg-blue-600 rounded-lg px-3 py-2"
          >
            <FaEdit />
          </button>
          <button 
            onClick={() => handleDelete(item._id)} 
            className="text-white hover:bg-orange-500 bg-red-500 rounded-lg px-3 py-2"
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


          </div>
        </Card>  
        
      )} 
    </div>
  ); 
}

export default StockManagement;
