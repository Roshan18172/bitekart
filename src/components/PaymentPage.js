import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card"); // default
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart
        const cartRes = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCart(cartRes.data);

        // Fetch user info
        const userData = JSON.parse(localStorage.getItem("userData"));
        setUser(userData);

        // Fetch restaurant info (first item)
        if (cartRes.data.items.length > 0) {
          const restaurantId = cartRes.data.items[0].restaurantId;
          const resRes = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);
          setRestaurant(resRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const subtotal = cart
    ? cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;
  const gst = subtotal * 0.05;
  const deliveryCharge = 40;
  const grandTotal = subtotal + gst + deliveryCharge;

  const handlePayment = async () => {
    try {
      // Call backend to confirm order/payment
      await axios.post("http://localhost:5000/api/orders/pay", {
        userId,
        cart: cart.items,
        total: grandTotal,
        paymentMethod,
        restaurantId: cart.items[0].restaurantId,
      });

      alert("Payment Successful!");
      navigate("/order-success"); // redirect to success page
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  if (!cart || !user || !restaurant) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h3>Payment</h3>

      {/* User & Restaurant Details */}
      <div className="card p-3 mb-3">
        <h5>User Details</h5>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      <div className="card p-3 mb-3">
        <h5>Restaurant Details</h5>
        <p><strong>Name:</strong> {restaurant.name}</p>
        <p><strong>Address:</strong> {restaurant.address}</p>
        <p><strong>Phone:</strong> {restaurant.mobile}</p>
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
              {item.name} x {item.quantity}
            </div>
            <div>₹{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="card p-3 mb-3">
        <h5>Price Summary</h5>
        <div className="d-flex justify-content-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="d-flex justify-content-between"><span>GST (5%):</span><span>₹{gst.toFixed(2)}</span></div>
        <div className="d-flex justify-content-between"><span>Delivery Charge:</span><span>₹{deliveryCharge}</span></div>
        <hr />
        <div className="d-flex justify-content-between fw-bold"><span>Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>
      </div>

      {/* Payment Options */}
      <div className="card p-3 mb-3">
        <h5>Select Payment Method</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="card"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="card">Credit/Debit Card</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="upi"
            name="payment"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="upi">UPI</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="wallet"
            name="payment"
            value="wallet"
            checked={paymentMethod === "wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="wallet">Wallet</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="cod"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label" htmlFor="cod">Cash on Delivery</label>
        </div>
      </div>

      <button className="btn btn-success w-100" onClick={handlePayment}>
        Pay ₹{grandTotal.toFixed(2)}
      </button>
    </div>
  );
};

export default PaymentPage;
