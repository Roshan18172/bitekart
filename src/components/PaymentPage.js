import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const apiBaseUrl = "https://bitekart-backend-d7yr.onrender.com"

  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const orderRes = await axios.get(
          `${apiBaseUrl}/api/orders/${orderId}`
        );
        setOrder(orderRes.data);
      } catch (error) {
        console.error("PAYMENT ERROR:", error);
      }
    };

    loadOrderData();
  }, [orderId]);

  const handlePayment = async () => {
    try {
      await axios.post(`${apiBaseUrl}/api/orders/pay`, {
        orderId,
        paymentMethod,
      });

      alert("Payment Successful!");
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  if (!order) return <p>Loading payment details...</p>;

  return (
    <div className="container my-4">

      <h3>Payment</h3>

      {/* ORDER ITEMS */}
      <div className="card p-3 mb-3">
        <h5>Your Order</h5>
        {order.items.map((item, i) => (
          <div key={i} className="d-flex justify-content-between py-2 border-bottom">
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="card p-3 mb-3">
        <h5>Price Summary</h5>
        <div className="d-flex justify-content-between fw-bold">
          <span>Total Amount</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="card p-3 mb-3">
        <h5>Select Payment Method</h5>

        {["card", "upi", "wallet", "cod"].map((method) => (
          <div className="form-check" key={method}>
            <input
              type="radio"
              className="form-check-input"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label">
              {method === "card" && "Credit / Debit Card"}
              {method === "upi" && "UPI (GPay / PhonePe / Paytm)"}
              {method === "wallet" && "Wallet Payment"}
              {method === "cod" && "Cash on Delivery"}
            </label>
          </div>
        ))}
      </div>

      <button className="btn btn-success w-100" onClick={handlePayment}>
        Pay ₹{order.total}
      </button>
    </div>
  );
};

export default PaymentPage;