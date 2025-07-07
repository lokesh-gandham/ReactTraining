import React from "react";
import { useCart } from "../context/CartContext";

function CartItems() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  // ✅ Handle checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return alert("Cart is empty! Please add items to your cart.");
    }

    const confirmCheckout = window.confirm("Are you sure you want to place the order?");
    if (!confirmCheckout) return;

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to place the order.");

      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again later.");
    }
  };

  // ✅ Calculate total based on quantity
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      <h2 style={{ color: "#333", fontSize: "24px" }}>Cart Items</h2>

      {cartItems.length === 0 ? (
        <p style={{ color: "#888" }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "20px",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "5px 0" }}>Price: ₹{item.price}</p>
                  <p style={{ margin: "5px 0" }}>Quantity: {item.quantity}</p>

                  <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#ffc107",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#17a2b8",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              Total: ₹{totalPrice}
            </p>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                cursor: "pointer",
                borderRadius: "8px",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItems;
