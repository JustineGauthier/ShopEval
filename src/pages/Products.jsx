import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart, dispatch } = useCartContext();
  console.log("products ", cart);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/products");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAddItem = (product) => {
    const itemInCart = cart.find((item) => item._id === product._id);
    if (itemInCart && itemInCart.quantity >= product.stock) {
      return;
    }
    return dispatch({ type: "add_item", payload: product });
  };

  const handleRemoveItem = (product) => {
    const itemInCart = cart.find((item) => item._id === product._id);
    if (itemInCart && itemInCart.quantity <= 0) {
      return;
    }
    return dispatch({ type: "remove_item", payload: product });
  };

  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <div>
      <h1>Products page</h1>
      {data.map((product) => {
        const id = product._id;
        const itemInCart = cart.find((item) => item._id === id);
        const counter = itemInCart ? itemInCart.quantity : 0;

        return (
          <div key={id}>
            <h2
              onClick={() => {
                navigate(`/products/${id}`, { state: { id } });
              }}
            >
              {product.title}
            </h2>
            <button
              onClick={() => handleAddItem(product)}
              disabled={counter >= product.stock}
            >
              +
            </button>
            <p>{counter}</p>
            <button
              onClick={() => handleRemoveItem(product)}
              disabled={counter <= 0}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
