import React, { useEffect, useState } from "react";
import '../../css/Register.css';
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser(){
    const {id}=useParams();
   const navigate=useNavigate();
const [formData, setFormData] = useState({
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          contact: '',
          address: '',
          age: '',
        });
      useEffect(()=>{
        const getByid=async()=>{
            try{
                const response=await fetch(`http://localhost:3000/users/${id}`);
                const  data=await response.json();
                setFormData({
                    ...formData,
                    firstname:data.firstname,
                    lastname:data.lastname,
                    username:data.username,
                    password:data.password,
                    contact:data.contact,
                    address:data.address,
                    age:data.age
                });
            }catch(error){
                console.log('ERROR:',error);
            }
        }
        getByid();
            
      },[])
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
          
            try{
              const response=await fetch(`http://localhost:3000/users/${id}`,{
                method:'PUT',
                headers:{
                  'content-type':'application/json'
                },
                body:JSON.stringify(formData)
              })
                const result=await response.json();
                alert('User Updated Successfully');
  
            }catch(error){
              console.log('ERROR:',error);
            }
              navigate('/home')   
          };
        
    return (
        <div>
             <div className="form-container">
            <form onSubmit={handleSubmit} className="register-form">
              <h2>UpdateUser</h2>
              
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
      
              <button type="submit" className="submit-btn">Update</button>
            </form>
          </div>
        </div>
    )
}
export default UpdateUser;