import React from "react";
import axios from "axios";

const CheckOut = () => {
  const userId = localStorage.getItem("userid");

  const placeOrder = async () => {
    await axios.post("http://localhost:5000/api/cart/checkout", { userId });
    alert("Order Placed Successfully!");
  };

  return (
    <div className="container my-4">
      <h3>Checkout</h3>
      <p>Confirm your order.</p>

      <button className="btn btn-primary" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckOut;
