import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const ProductManagement = ({ product }) => {
  const { cart, dispatch } = useCartContext();
  const navigate = useNavigate();

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

  const id = product._id;
  const counter = cart.find((item) => item._id === product._id)?.quantity || 0;

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
      <button onClick={() => handleRemoveItem(product)} disabled={counter <= 0}>
        -
      </button>
    </div>
  );
};

export default ProductManagement;
