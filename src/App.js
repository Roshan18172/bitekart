import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import AddRestaurant from "./components/AddRestaurant";
import BiteHome from "./components/BiteHome";
import RestaurantDashboard from "./components/Restaurant/RestaurantDashboard";
import DeliveryPartnerDashboard from "./components/delivery/DeliveryPartnerDasboard";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/home" element={<BiteHome/>} />
          <Route path="/restaurant-dashboard" element={<RestaurantDashboard/>} />
          <Route path="/delivery-home" element={<DeliveryPartnerDashboard/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
