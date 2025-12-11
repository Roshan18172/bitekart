import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Confetti Animation
  useEffect(() => {
    const duration = 1500;
    const end = Date.now() + duration;

    (function frame() {
      // Create particle
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 1 + 1 + "s";

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 2000);

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card p-5 shadow-lg text-center" style={{ maxWidth: "450px" }}>

        {/* Animated Checkmark */}
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>

        <h2 className="text-success mt-3">Order Successful!</h2>
        <p className="text-muted">You will be redirected to the Home page shortly…</p>

        <button className="btn btn-primary mt-3" onClick={() => navigate("/home")}>
          Go to Home Now
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
