import React, { useState } from "react";
import '../../css/Register.css';
import { useNavigate } from "react-router-dom";

function AddProduct(){

        const [formData, setFormData] = useState({
            name:'',
          category:'',
          description:'',
           image:'',
          price:''
        });
        
        const navigate=useNavigate();
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevState) => ({
            ...prevState,
            [name]: value
          }));
        };
      
        const handleSubmit = async(e) => {
          e.preventDefault();
          console.log('Form Submitted:', formData);
          const res = await fetch('http://localhost:3000/products?name=' + formData.name);
          const products = await res.json();
        
          if (products.length > 0) {
            alert('Product already exists!');
            return;
          }

          try{
            const response=await fetch('http://localhost:3000/products',{
              method:'POST',
              headers:{
                'content-type':'application/json'
              },
              body:JSON.stringify(formData)
            })
              const result=await response.json();
              alert('User register Successfully');

          }catch(error){
            console.log('ERROR:',error);
          }
          setFormData({name:'',category:'',description:'',image:'',price:''});
            navigate('/dashboard') ; 
        };
      
        return (
            <div className="form-container">
            <form onSubmit={handleSubmit} className="register-form">
              <h2>Create an Account</h2>
              
              <div className="form-group">
                <label>ProductName:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>ImageUr:</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <button type="submit" className="submit-btn">AddProduct</button>
            </form>
          </div>
        );
      }
export default AddProduct;