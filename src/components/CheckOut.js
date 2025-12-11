import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOut = () => {
   const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart
        const cartRes = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(cartRes.data);

        // Fetch user info
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUser(userData);

        // Fetch restaurant info (assume all items are from same restaurant)
        if (cartRes.data.items.length > 0) {
          const restaurantId = cartRes.data.items[0].restaurantId;
          const resRes = await axios.get(`http://localhost:5000/api/auth/restaurants/${restaurantId}`);
          setRestaurant(resRes.data);
        }
      } catch (err) {
        console.error("Checkout fetch error:", err);
      }
    };

    fetchData();
  }, [userId]);

  const placeOrder = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/orders/create", {
      userId,
      items: cart.items,
      subtotal,
      gst,
      deliveryCharge,
      total: grandTotal,
      restaurantId: cart.items[0].restaurantId,
    });

    if (res.data.success) {
      const orderId = res.data.orderId;

      // Redirect to payment page with orderId
      navigate(`/payment/${orderId}`);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to place order");
  }
};

  if (!cart || !user || !restaurant) return <p>Loading...</p>;

  const subtotal = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.05;
  const deliveryCharge = 40;
  const grandTotal = subtotal + gst + deliveryCharge;

  return (
    <div className="container my-4">
      <h3>Checkout</h3>

      {/* User Info */}
      <div className="card p-3 mb-3">
        <h5>User Details</h5>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      {/* Restaurant Info */}
      <div className="card p-3 mb-3">
        <h5>Restaurant Details</h5>
        <p><strong>Name:</strong> {restaurant.name}</p>
        <p><strong>Address:</strong> {restaurant.address}</p>
        <p><strong>Phone:</strong> {restaurant.phone}</p>
        {restaurant.email && <p><strong>Email:</strong> {restaurant.email}</p>}
      </div>

      {/* Cart Items */}
      <div className="card p-3 mb-3">
        <h5>Order Items</h5>
        {cart.items.map((item) => (
          <div
            key={item.itemId}
            className="d-flex justify-content-between border-bottom py-2"
          >
            <div>
              <strong>{item.name}</strong> x {item.quantity}
            </div>
            <div>₹{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="card p-3 mb-3">
        <h5>Price Summary</h5>
        <div className="d-flex justify-content-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>GST (5%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Delivery Charge:</span>
          <span>₹{deliveryCharge}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button className="btn btn-success w-100" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default CheckOut;
