import React from "react";
import Footer from "./Footer";

const categories = [
  { name: "Rolls", img: "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png" },
  { name: "Biryani", img: "https://b.zmtcdn.com/data/o2_assets/bf2d0e73add1c206aeeb9fec762438111727708719.png" },
  { name: "Pizza", img: "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png" },
  { name: "Momos", img: "https://b.zmtcdn.com/data/o2_assets/5dbdb72a48cf3192830232f6853735301632716604.png" },
  { name: "Burger", img: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png" },
  { name: "Chicken", img: "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png" },
  { name: "Noodles", img: "https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png" },
  { name: "North Indian", img: "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg" },
  { name: "Thali", img: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png" },
  { name: "Chinese", img: "https://b.zmtcdn.com/data/o2_assets/e90a634895787ce77a93212351fa18991678798565.jpeg" },
  { name: "Desserts", img: "https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png" },
  { name: "Ice Cream", img: "https://funcakes.com/content/uploads/2023/06/Ice-cream-recipe-960x960-c-default.jpg" },
  { name: "Juices", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXaYzA-Ld5I99hCMQ7nfph7HjJuL2xkb5tRw&s" },
  { name: "Sandwich", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQftsuVA4z-5LI7hsJCPOc7c-zmQNMj5S5Q&s" },
  { name: "South Indian", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmF-hAFMnyfSWeYOTjiy46Y3fEvn2rhzGptA&s" },
  { name: "Kebabs", img: "https://joyfoodsunshine.com/wp-content/uploads/2022/06/chicken-kebabs-recipe-1.jpg" },
  { name: "Pasta", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGxJQNLQ_tpfDqgGfFpEARarc7qNGTDVEYg&s" },
  { name: "Sushi", img: "https://asianinspirations.com.au/wp-content/uploads/2018/12/R01459_Easy-Sushi-Rolls-2.jpg" },
  { name: "Salads", img: "https://www.healthyseasonalrecipes.com/wp-content/uploads/2022/06/healthy-cobb-salad-steps-sq-026.jpg" },
  { name: "Wraps", img: "https://www.simplotfoods.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0dkgxhks0leg%2F20lSS8E9youzDQl0YDas62%2Fa65839cc41cef8b9b8d8b00c744c9ef5%2FChicken_Bacon_Dill_Pickle_Avocado_Wrap_with_Fries.jpg%3Ffm%3Dwebp&w=3840&q=75" },
  { name: "Beverages", img: "https://eu-images.contentstack.com/v3/assets/blta023acee29658dfc/blta9f158c45627aa62/651dbb742365a678d7ec7f18/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg?disable=upscale&width=1200&height=630&fit=crop" },
  { name: "Seafood", img: "https://www.recipetineats.com/tachyon/2023/12/Seafood-Platter_Sony-5.jpg" },
  { name: "Vegan", img: "https://www.theedgyveg.com/wp-content/uploads/2020/01/Single-Vegan-Meals-For-One-1.jpg" },
  { name: "Gluten Free", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZTYBw9VPCQkXrDBb_2SKYLKlbVwU4iMCdg&s" },
  { name: "Breakfast", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQmL71p1BjdtEK0wr33EdaBnIUCV3Kud9Kfw&s" },
  { name: "Snacks", img: "https://cablevey.com/wp-content/uploads/2020/11/The-Complete-Guide-on-Snack-Foods.jpg" },
  { name: "Street Food", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjjiZtM__wrwJOslaff5C3J6mKAuj1jA34Q&s" },
  { name: "BBQ", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbSfiTbAtgMEg44Ydj4LI674pnyoVWSpJywg&s" },
  { name: "Cafe", img: "https://perfectdailygrind.com/wp-content/uploads/2019/09/Low-Waste-2.png" },
];

const restaurants = [
  {
    name: "Nana Hotel",
    img: "https://b.zmtcdn.com/data/pictures/5/19746985/5c431a2dd4001cedea5d5698bbfb48df_o2_featured_v2.jpg?output-format=webp",
    cuisine: "North Indian, Chinese, Mughlai",
    price: "₹150",
    rating: 4.3,
    time: "22 min",
  },
  {
    name: "Niladri - Burger N Chicken",
    img: "https://b.zmtcdn.com/data/pictures/1/20673431/4196b48fce778188388495a6bcd0f549_o2_featured_v2.jpg?output-format=webp",
    cuisine: "Burger, Fast Food",
    price: "₹200",
    rating: 4.6,
    time: "34 min",
  },
  {
    name: "Spice Of Rolls",
    img: "https://b.zmtcdn.com/data/pictures/5/21434685/6f94abb75caac7a1a24de3a60a3b1145_o2_featured_v2.jpg?output-format=webp",
    cuisine: "Rolls, North Indian, Momos",
    price: "₹150",
    rating: 4.3,
    time: "26 min",
  },
  {
    name: "Zaika Restaurant",
    img: "https://b.zmtcdn.com/data/pictures/6/19101686/92ddaddb44b37d283052bad56dc5f73a_o2_featured_v2.png?output-format=webp",
    cuisine: "North Indian, Biryani, Chinese",
    price: "₹150",
    rating: 4.2,
    time: "24 min",
  },
  {
    name: "Spicy Garden",
    img: "https://b.zmtcdn.com/data/pictures/9/20644479/a01ae6733e643acef236e7b7eb1357a4_o2_featured_v2.jpg?output-format=webp",
    cuisine: "North Indian, Chinese, Biryani",
    price: "₹450",
    rating: 4.1,
    time: "29 min",
  },
  {
    name: "Cafe Sizzle",
    img: "https://b.zmtcdn.com/data/pictures/8/19185698/4fa658f4b62f3dd7786ea3a0ee084cbe_o2_featured_v2.jpg?output-format=webp",
    cuisine: "Burger, Fast Food",
    price: "₹150",
    rating: 3.8,
    time: "29 min",
  },
];

const BiteHome = () => {
  return (
    <div className="container my-5">
      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        <button className="btn btn-outline-secondary">Filters</button>
        <button className="btn btn-outline-success">Pure Veg</button>
        <button className="btn btn-outline-danger">Non Veg</button>
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Cuisines
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">North Indian</a></li>
            <li><a className="dropdown-item" href="#">Chinese</a></li>
            <li><a className="dropdown-item" href="#">Italian</a></li>
            <li><a className="dropdown-item" href="#">Fast Food</a></li>
          </ul>
        </div>
      </div>

      {/* Categories */}
      <h3 className="fw-bold mb-3">Eat what makes you happy</h3>
      <div className="d-flex gap-4 overflow-auto mb-5">
        {categories.map((cat, index) => (
          <div key={index} className="text-center">
            <a href="#">
              <img
                src={cat.img}
                alt={cat.name}
                className="rounded-circle shadow"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </a>
            <p className="mt-2 fw-semibold">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Restaurants */}
      <h3 className="fw-bold mb-3">Top Restaurants</h3>
      <div className="row">
        {restaurants.map((res, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={res.img}
                className="card-img-top"
                alt={res.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{res.name}</h5>
                <p className="card-text text-muted">{res.cuisine}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success">⭐ {res.rating}</span>
                  <span className="text-muted">{res.price} for One</span>
                  <span className="text-muted">{res.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BiteHome;
