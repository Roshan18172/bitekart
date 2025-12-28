import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // Fetch cart
  const loadCart = async () => {
    const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Increase or decrease item qty
  const updateQuantity = async (itemId, newQty) => {
    await axios.post("http://localhost:5000/api/cart/update", {
      userId,
      itemId,
      quantity: newQty, // backend handles removal if qty <= 0
    });

    loadCart();
  };

  const checkout = () => navigate("/checkout");

  if (!cart) return <p>Loading...</p>;

  // --- Price Calculations ---
  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.05; // 5% GST
  const deliveryCharge = 40;

  const grandTotal = subtotal + gst + deliveryCharge;

  return (
    <div className="container my-4">
      <h3>Your Cart</h3>

      {cart.items.length === 0 && <p>No items in cart</p>}

      {cart.items.map((item) => (
        <div className="card p-3 my-2" key={item.itemId}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>₹{item.price}</p>
            </div>

            {/* Quantity buttons */}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
              >
                -
              </button>

              <span className="mx-3 fw-bold">{item.quantity}</span>

              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Price Summary - Show only if cart has items */}
      {cart.items.length > 0 && (
        <div className="card p-3 mt-3">
          <h4>Price Details</h4>
          <hr />

          <p className="d-flex justify-content-between">
            <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
          </p>

          <p className="d-flex justify-content-between">
            <span>GST (5%):</span> <span>₹{gst.toFixed(2)}</span>
          </p>

          <p className="d-flex justify-content-between">
            <span>Delivery Charge:</span> <span>₹{deliveryCharge}</span>
          </p>

          <hr />

          <h4 className="d-flex justify-content-between">
            <span>Total:</span> <span>₹{grandTotal.toFixed(2)}</span>
          </h4>

          <button className="btn btn-success w-100 mt-3" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
