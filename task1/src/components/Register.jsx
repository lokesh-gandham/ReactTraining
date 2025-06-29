import React, { useState } from "react";
import '../css/Register.css';
import { useNavigate } from "react-router-dom";

function Register(){

        const [formData, setFormData] = useState({
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          contact: '',
          address: '',
          age: '',
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
          const res = await fetch('http://localhost:3000/users?username=' + formData.username);
          const users = await res.json();
        
          if (users.length > 0) {
            alert('Username already exists!');
            return;
          }
          try{
               const dataToSubmit = {
      ...formData,
      role: 'user' 
    };
            const response=await fetch('http://localhost:3000/users',{
              method:'POST',
              headers:{
                'content-type':'application/json'
              },
          
              body:JSON.stringify(dataToSubmit)
            })
              const result=await response.json();
              alert('User register Successfully');

          }catch(error){
            console.log('ERROR:',error);
          }
          setFormData({username:'',firstname:'',lastname:'',contact:'',address:'',password:'',age:''});
            navigate('/')  
        };
      
        return (
            <div className="form-container">
            <form onSubmit={handleSubmit} className="register-form">
              <h2>Create an Account</h2>
              
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Contact:</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <div className="form-group">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                />
              </div>
      
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
      
              <button type="submit" className="submit-btn">Register</button>
            </form>
          </div>
        );
      }
export default Register;