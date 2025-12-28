import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import AddRestaurant from "./components/AddRestaurant";
import BiteHome from "./components/BiteHome";
import RestaurantDashboard from "./components/Restaurant/RestaurantDashboard";
import DeliveryPartnerDashboard from "./components/delivery/DeliveryPartnerDasboard";
import MenuManager from "./components/Restaurant/MenuManager";
import RestaurantMenu from "./components/Restaurant/RestaurantMenu";
import CheckOut from "./components/CheckOut";
import Cart from "./components/Cart";
import PaymentPage from "./components/PaymentPage";
import OrderSuccess from "./components/Orders/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import TrackOrder from "./components/Orders/TrackOrder";
import ProfilePage from "./components/ProfilePage";
import RestaurantOrders from "./components/Restaurant/RestaurantOrders";

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
          <Route path="/restaurant/menu-manager" element={<MenuManager/>} />
          <Route path="/restaurant/:id" element={<RestaurantMenu/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/payment/:orderId" element={<PaymentPage/>} />
          <Route path="/order-success" element={<OrderSuccess/>} />
          <Route path="/my-orders" element={<MyOrders/>} />
          <Route path="/track-order/:orderId" element={<TrackOrder/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/manage-orders" element={<RestaurantOrders/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
