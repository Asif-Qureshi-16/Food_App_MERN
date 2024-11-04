import { useEffect } from "react";
import Items from "../components/Items";
import { useNavigate } from "react-router-dom";

function Home({ data, cart, setCart, total, setTotal }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage

  // Redirect to '/login' if the user is not present
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Prevent rendering of the component if user is not present
  }

  return (
    <div className="flex-container">
      {data.map((item) => (
        <div key={item._id}>
          <Items
            item={item}
            cart={cart}
            setCart={setCart}
            total={total}
            setTotal={setTotal}
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
