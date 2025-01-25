import axios from "axios";
import {  useState } from "react";
import Swal from 'sweetalert2';

function ItemAddForm({ onBack,refreshTable }) {

    const [data,setData]=useState({
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
    const [errors, setErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [successMessage,setSuccessMessage]=useState('');
    //setting item ID state
  


    // Validate each field
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        break;
      case "qty_in_stock":
        if (!value || value <= 0) error = "Quantity must be greater than 0.";
        break;
      case "unit_price":
        if (!value || value <= 0) error = "Unit price must be greater than 0.";
        break;
      case "dosage_form":
        if (!value) error = "Dosage form is required.";
        break;
      case "brand_name":
        if (!value) error = "Brand name is required.";
        break;
      case "supplier_name":
        if (!value) error = "Supplier name is required.";
        break;
      case "category":
        if (!value) error = "Category is required.";
        break;
      case "expiry_date":
        if (!value) error = "Expiry date is required.";
        break;
      case "threshold":
        if (!value) error = "threshold is required.";
        break;
      default:
        break;
    }
    return error;
  };


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Validate on change
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

 
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
  
      const newErrors = {};
      // Validate each field in the form data
      Object.keys(data).forEach((key) => {
          const error = validateField(key, data[key]);
          if (error) newErrors[key] = error;
      });
  
      // Check if there are validation errors
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors); // Update the state with validation errors
          return; // Stop form submission if there are errors
      }
  
      // Clear any previous errors if validation passes
      setErrors({});
      
      // Log successful validation
      console.log("Form submitted successfully", data);
  
      // Make the API call to submit data
      axios
          .post("http://localhost:5000/api/inventory/add_new_item", data)
          .then((response) => {
              // Handle the success response
              console.log("Item added successfully:", response.data);
  
              // Clear the form fields
              setData({
                  name: "",
                  qty_in_stock: "",
                  unit_price: "",
                  dosage_form: "",
                  brand_name: "",
                  supplier_name: "",
                  category: "",
                  expiry_date: "",
                  threshold:"",
              });
              refreshTable();
              // Display success message if required
              if (setSuccessMessage) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Item added successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
            
                // Optionally update the local state
                
              }
  
       
          })
          .catch((error) => {
              // Handle the error response
              console.error("There was an error adding the item:", error);
              alert("Item addition failed. Please try again.");
          });
  };
  
 

    return (
      <div>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
        >
          Go Back
        </button>
        <h1 className="text-3xl mb-4 text-center font-poppins font-bold text-blue-800" >Add New Item</h1>
        <br />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-4 py-2 w-full ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter medicine name"
              
            />
             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Qty in Stock</label>
            <input
              type="number"
              name="qty_in_stock"
              value={data.qty_in_stock}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-4 py-2 w-full ${
                errors.qty_in_stock ? "border-red-500" : ""
              }`}
              placeholder="Enter quantity in stock"
            />
            {errors.qty_in_stock && (
              <p className="text-red-500 text-sm">{errors.qty_in_stock}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Unit Price</label>
            <input
              type="number"
              step="0.01"
              name="unit_price"
              value={data.unit_price}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-4 py-2 w-full ${
                errors.unit_price ? "border-red-500" : ""
              }`}
              placeholder="Enter unit price"
            />
            {errors.unit_price && (
              <p className="text-red-500 text-sm">{errors.unit_price}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Dosage Form</label>
            <select
               name="dosage_form"
               value={data.dosage_form}
               onChange={handleChange}
               className={`border border-gray-300 rounded px-4 py-2 w-full ${
                 errors.dosage_form ? "border-red-500" : ""
               }`}
            >
              <option value="">Select dosage form</option>
              {dosageForms.map((form, index) => (
                <option key={index} value={form}>
                  {form}
                </option>
              ))}
            </select>
            {errors.dosage_form && (
          <p className="text-red-500 text-sm">{errors.dosage_form}</p>
        )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Brand Name</label>
            <input
              type="text"
              name="brand_name"
          value={data.brand_name}
          onChange={handleChange}
          className={`border border-gray-300 rounded px-4 py-2 w-full ${
            errors.brand_name ? "border-red-500" : ""
          }`}
          placeholder="Enter brand name"
        />
        {errors.brand_name && (
          <p className="text-red-500 text-sm">{errors.brand_name}</p>
        )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Supplier Name</label>
            <select
              name="supplier_name"
              value={data.supplier_name}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-4 py-2 w-full ${
                errors.supplier_name ? "border-red-500" : ""
              }`}
            >
              <option value="">Select supplier</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
            {errors.supplier_name && (
          <p className="text-red-500 text-sm">{errors.supplier_name}</p>
        )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
                name="category"
                value={data.category}
                onChange={handleChange}
                className={`border border-gray-300 rounded px-4 py-2 w-full ${
                  errors.category ? "border-red-500" : ""
                }`}
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Expiry date</label>
            <input
              type="date"
              name="expiry_date"
          value={data.expiry_date}
          onChange={handleChange}
          className={`border border-gray-300 rounded px-4 py-2 w-full ${
            errors.expiry_date ? "border-red-500" : ""
          }`}
            />
             {errors.expiry_date && (
          <p className="text-red-500 text-sm">{errors.expiry_date}</p>
        )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Threshold</label>
            <input
              type="number"
              name="threshold"
              value={data.threshold}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-4 py-2 w-full ${
                errors.threshold ? "border-red-500" : ""
              }`}
              placeholder="Enter quantity in stock"
            />
            {errors.threshold && (
              <p className="text-red-500 text-sm">{errors.threshold}</p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 w-1/2"
          >
            Submit
          </button>


          </div>
        </form>
      </div>
    );
  }
  
  export default ItemAddForm;