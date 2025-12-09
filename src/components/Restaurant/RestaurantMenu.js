import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [quantities, setQuantities] = useState({});

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadRestaurant = async () => {
      const res = await fetch(`http://localhost:5000/api/public/restaurants/${id}`);
      const data = await res.json();

      if (data.success) {
        setRestaurant(data.restaurant);

        const initialQty = {};
        data.restaurant.menu.forEach(item => {
          initialQty[item._id] = 0;
        });

        // Load user cart and sync quantities
        const cartRes = await axios.get(`http://localhost:5000/api/cart/${userId}`);

        cartRes.data?.items?.forEach(ci => {
          initialQty[ci.itemId] = ci.quantity;
        });

        setQuantities(initialQty);
      }
    };

    loadRestaurant();
  }, [id]);

  // Add item to cart
  const addToCart = async (item) => {
    await axios.post("http://localhost:5000/api/cart/add", {
      userId,
      itemId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: restaurant._id
    });

    increaseQty(item._id);
  };

  // Increase qty (+)
  const increaseQty = async (itemId) => {
    const updatedQty = (quantities[itemId] || 0) + 1;

    setQuantities(prev => ({ ...prev, [itemId]: updatedQty }));

    await axios.post("http://localhost:5000/api/cart/update", {
      userId,
      itemId,
      quantity: updatedQty
    });
  };

  // Decrease qty (-)
  const decreaseQty = async (itemId) => {
    const updatedQty = quantities[itemId] - 1;

    setQuantities(prev => ({ ...prev, [itemId]: updatedQty }));

    await axios.post("http://localhost:5000/api/cart/update", {
      userId,
      itemId,
      quantity: updatedQty
    });
  };

  if (!restaurant) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container my-4">
      <h2>{restaurant.name}</h2>
      <p className="text-muted">{restaurant.cuisine}</p>

      <h4 className="mt-4">Menu</h4>
      <div className="row">

        {restaurant.menu.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                className="card-img-top"
                alt={item.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5>{item.name}</h5>
                <p>{item.description}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <strong>₹{item.price}</strong>

                  {quantities[item._id] === 0 ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => addToCart(item)}
                    >
                      Add
                    </button>
                  ) : (
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => decreaseQty(item._id)}
                      >
                        –
                      </button>

                      <span className="mx-2 fw-bold">
                        {quantities[item._id]}
                      </span>

                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RestaurantMenu;
