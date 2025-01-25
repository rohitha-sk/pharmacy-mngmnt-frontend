/* eslint-disable no-undef */
import axios from "axios";
import { useEffect, useState } from "react";

function ItemUpdateForm({ onBack,itemId,  refetch,closeForm, updateAlert }) {

  const[item,setItem]=useState({
    name:"", 
    qty_in_stock:"",
    unit_price:"",
    dosage_form:"",
    brand_name:"",
    supplier_name:"",
    category:"",
    expiry_date:"",
    threshold:"",
  });

 

  //getting item data by ID
  useEffect(() => {
    // Fetch user details using the userId
    const fetchItemDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/inventory/get_item/${itemId}`);
            const { name, qty_in_stock,unit_price, dosage_form, brand_name, supplier_name, category, expiry_date,threshold } = response.data;
            setItem({
              name:name, 
              qty_in_stock:qty_in_stock,
              unit_price: unit_price["$numberDecimal"],
              dosage_form:dosage_form,
              brand_name:brand_name,
              supplier_name:supplier_name,
              category:category,
              expiry_date:expiry_date,
              threshold:threshold,
            }) 
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    if (itemId) {
      fetchItemDetails();
    }
}, [itemId]);


    const dosageForms = [
      "Tablet",
      "Capsule",
      "Pill",
      "Liquid",
      "Cream",
      "Injection",
      "Inhaler",
    ];
    
    const suppliers = [
      "Supplier A",
      "Supplier B",
      "Supplier C",
      "Supplier D",
    ];
    const categories =[
      "Supplier A",
            "category 01",
            "category 02",
            "category 03",
          ];
  
          const handleSubmit = (e) => {
            e.preventDefault();
          
            // Log the fields for debugging
            // console.log(
            //   item.name,
            //   item.qty_in_stock,
            //   item.unit_price,
            //   item.dosage_form,
            //   item.brand_name,
            //   item.supplier_name,
            //   item.category,
            //   item.expiry_date
            // );
          
            axios
              .put(`http://localhost:5000/api/inventory/update_item/${itemId}`, {
                name: item.name,
                qty_in_stock: item.qty_in_stock,
                unit_price: parseFloat(item.unit_price),
                dosage_form: item.dosage_form,
                brand_name: item.brand_name,
                supplier_name: item.supplier_name,
                category: item.category,
                expiry_date: item.expiry_date,
                threshold:item.threshold,
              })
              .then(() => {
                closeForm(false); 
              refetch();
                if (updateAlert) {
                  updateAlert("Successfully updated item data!");
                  
                }
              })
              .catch((error) => {
                console.error("Error updating item:", error);
              });
          };
          

    const formatDate = (date) => {
      if (!date) return ""; // Handle empty or null dates
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
  };
  
    return (
      <div>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
        >
          Go Back
        </button>
        <h1 className="text-3xl mb-4 text-center font-poppins font-bold text-blue-800" >Update Item</h1>
        <br />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Enter medicine name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Qty in Stock</label>
            <input
              type="number"
              value={item.qty_in_stock}
              onChange={(e) => setItem({ ...item, qty_in_stock: e.target.value })}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Enter quantity in stock"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Unit Price</label>
            <input
              type="number"
              value={item.unit_price || ""}
              onChange={(e) =>
                setItem({ ...item,unit_price: e.target.value })
              }
              step="0.01"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Enter unit price"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Dosage Form</label>
            <select
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={item.dosage_form || ""} // Set the value to the current dosage_form or an empty string
              onChange={(e) =>
                setItem({ ...item, dosage_form: e.target.value }) // Update the item's dosage_form when the user selects a new option
              }
            >
              <option value="">{item.dosage_form}</option>
              {dosageForms.map((form, index) => (
                <option key={index} value={form}>
                  {form}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Brand Name</label>
            <input
              type="text"
              value={item.brand_name}
              onChange={(e) =>
                setItem({ ...item, brand_name: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Enter brand name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Supplier Name</label>
            <select
              className="border border-gray-300 rounded px-4 py-2 w-full"
              onChange={(e) =>
                setItem({ ...item, supplier_name: e.target.value })
              }
            >
              <option value="">{item.supplier_name}</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
                name="category"
                value={item.category}
                onChange={(e) =>
                  setItem({ ...item, category: e.target.value })}
                className="border border-gray-300 rounded px-4 py-2 w-full"
            >
              <option value="">{item.category}</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Expiry date</label>
            <input
              type="date"
              name="expiry_date"
              value={formatDate(item.expiry_date)}
          onChange={(e) =>
            setItem({ ...item, expiry_date: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 w-full"
            />
             
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Threshold</label>
            <input
              type="number"
              name="threshold"
              value={item.threshold}
              onChange={(e) =>
                setItem({ ...item, threshold: e.target.value })}
             className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="threshold"
            />
           
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 w-1/2"
          >
            Update
          </button>

          </div>
        </form>
      </div>
    );
  }
  
  export default ItemUpdateForm;