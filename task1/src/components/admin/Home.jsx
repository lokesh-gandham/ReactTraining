import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Home.css"; 


function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const [, payload] = token.split('.');
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

function Home() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const loggedInUser = getUserFromToken(); 
  const  inputRef=useRef(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);

  const handleDelete = async (id, email) => {


    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          alert("User Deleted Successfully");
          setUsers(users.filter((user) => user.id !== id));
        }
      } catch (error) {
        console.error("ERROR:", error);
      }
    }
  };


  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname} ${user.username} ${user.contact}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users List</h2>

      <center>
        <input
        ref={inputRef}
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </center>

      {filteredUsers.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.firstname} {user.lastname}</h3>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Phone:</strong> {user.contact}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Address:</strong> {user.address}</p>

          <div className="button-container">
            <Link to={`/update/${user.id}`}>
              <button className="btn btn-update">Update</button>
            </Link>
            <button
              onClick={() => handleDelete(user.id, user.username)} 
              className="btn btn-delete"
              disabled={loggedInUser?.email === user.username} 
              title={loggedInUser?.email === user.username? "You cannot delete yourself" : ""} 
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;