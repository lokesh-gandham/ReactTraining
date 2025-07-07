import React, { useEffect, useState } from "react";
import '../../css/Orders.css';
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

function  Orders(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token=localStorage.getItem('token');
  const payload=parseJwt(token);
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch orders from JSON Server
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };

    fetchOrders(); 
  }, [orders]); 

  if (loading) {
    return <p className="loading-message">Loading orders...</p>;
  }

  const handleDelete= async(id)=>{

    try{
      const response=await fetch(`http://localhost:3000/orders/${id}`,{
        method:'DELETE'
      });
        if(response.ok){
          alert('Order Delivered Successfully');
        }

    }catch(error){
      console.log('ERROR:',error);
    }

  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title" style={{color:'orangered'}}>Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message">No orders yet.</p>
      ) : (
        orders.map((order, idx) => {
  const totalPrice = order.items.reduce((sum, item) => sum + item.price, 0);
  return (
    <div key={idx} className="order-card">
      <p className="order-date"><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
 <ul className="order-items-list">
  {order.items.map((item) => (
    <li key={item.id} className="order-item">
      <img src={item.image} alt={item.name} className="order-item-image" />
      <div className="item-details">
        <p className="item-name"><strong>{item.name}</strong></p>
        <p className="item-price">₹{item.price}</p>
      </div>
    </li>
  ))}
</ul>

{payload?.role === 'admin' && (
  <button
    className="deliver-button"
    style={{ color: 'black' }}
    onClick={() => handleDelete(order.id)}
  >
    Delivered
  </button>
)}
      <p className="order-total"><strong>Total Price:</strong> ₹{totalPrice}</p>

    </div>
  );
})
      )}
    </div>
  );
}
export default  Orders;