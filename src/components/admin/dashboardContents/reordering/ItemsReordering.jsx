import React, { useEffect, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import Card from "../Card";
import axios from "axios";
import PurchaseOrder from "./PurchaseOrder";



function ItemsReordering() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState(items);
  //save form data to be sent to checkout
  const [purchaseOrderData, setPurchaseOrderData]=useState([]);

  //visibility of Checkout page
  const [displayCheckout,setDisplayCheckout] = useState(false);

  const itemTypes = [
    "Tablets",
    "Capsules",
    "Pills",
    "Bottles",
    "Injections",
    "Injection",
    "Cards",
  ];

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory/lower_stock_items");
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

      const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        const filtered = items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRecords(filtered);
      
      };
  

      const handleSubmit = (e, id) => {
        e.preventDefault(); // Prevent default form submission behavior
        const selectedRecord = filteredRecords.find((item) => item._id === id); // Find the record with the matching _id
        console.log("Selected Row Data:", selectedRecord); // Log only the selected record
      
      };

        // Calculate Total Cost Price
  const totalCost = filteredRecords.reduce((sum, item) => {
    return sum + (item.subtotal ? parseFloat(item.subtotal) : 0);
  }, 0);
      
      return (
        <>
        {displayCheckout ? (
          // Display ItemAddForm
         
          <Card>
            <PurchaseOrder display={setDisplayCheckout} purchase={purchaseOrderData}  />
          </Card>
         
        ) : (
          <Card style={{ backgroundColor: "#F8F8FF" }}>
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-3xl mb-4 text-center font-poppins font-bold text-blue-800">
             Purchase Out of Stock Items
            </h1>
            <br />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add New Item
            </button>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
              Search
            </button>
          </div>
          <div className="overflow-x-auto">
            <form onSubmit={handleSubmit}>
              <table className="min-w-full table-auto border-collapse border-6 border-blue-800 rounded-lg overflow-hidden shadow-lg font-sans">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-700 to-pink-700 text-white">
                    <th className="px-4 py-2 border border-gray-300 first:rounded-tl-lg last:rounded-tr-lg">
                      Item Name
                    </th>
                    <th className="px-4 py-2 border border-gray-300">Item Type</th>
                    <th className="px-4 py-2 border border-gray-300">Current Qty</th>
                    <th className="px-4 py-2 border border-gray-300">Unit price</th>
                    <th className="px-4 py-2 border border-gray-300">Required Qty</th>
                    <th className="px-4 py-2 border border-gray-300">Subtotal</th>
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
                      <td className="px-4 py-2 border border-gray-300">
                        {item.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                      <select
                        name="item_type"
                        value={item.item_type || ""}
                        onChange={(e) => {
                          const updatedItems = [...filteredRecords];
                          updatedItems[index].item_type = e.target.value;
                          setFilteredRecords(updatedItems);
                        }}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                      >
                        <option value="">Select a type</option>
                        {itemTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.qty_in_stock}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.unit_price["$numberDecimal"]}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <input
                          type="number"
                          value={item.required_qty || ""}
                          onChange={(e) => {
                            const updatedItems = [...filteredRecords];
                            const requiredQty = e.target.value;
                            updatedItems[index].required_qty = requiredQty;
                            updatedItems[index].subtotal =
                              requiredQty * parseFloat(item.unit_price["$numberDecimal"]);
                            setFilteredRecords(updatedItems);
                          }}
                          className="px-4 py-2 border border-gray-300"
                          placeholder="Enter Qty"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {item.subtotal ? item.subtotal.toFixed(2) : "0.00"}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-200">
                    <td
                      colSpan="5"
                      className="px-4 py-2 text-right font-bold border border-gray-300"
                    >
                      Total Cost Price:
                    </td>
                    <td className="px-4 py-2 font-bold border border-gray-300">
                      {totalCost.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </form>
          </div>
        </Card>
        )};






      </>
      );
      
    } 
    

export default ItemsReordering;
