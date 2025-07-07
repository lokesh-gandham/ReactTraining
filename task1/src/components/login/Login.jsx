import React, { useState } from "react";
import '../../css/Login.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function generateFakeTokenFromUser(user) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id || "default-id",
      name: user.name,
      email: user.username,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  );
  const signature = btoa("fake-signature");
  return `${header}.${payload}.${signature}`;
}

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [errors,setErrors]=useState();

  const { isLoggedIn, login } = useAuth();

 if (isLoggedIn) {
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
  if (payload?.role === 'admin') {
    return <Navigate to="/dashboard" />;
  } else if (payload?.role === 'user') {
    return <Navigate to="/userDashboard" />;
  }
}

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);

  
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      
      const user = users.find(
        (u) => u.username === formData.username && u.password === formData.password
      );
   

      if (user) {
        const generatedToken = generateFakeTokenFromUser(user);
              
            
        login(generatedToken);

        console.log(user.role);
        if (user.role === "admin") {
          navigate('/dashboard');
        } else if(user.role ==='user'){
          navigate('/userDashboard');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert('Login failed due to an error.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
    
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;