import { Navigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import ProductManagement from "../components/ProductManagement";

const Cart = ({ token }) => {
  const { cart } = useCartContext();

  return token ? (
    <div>
      {cart.length > 0 ? (
        cart.map((product) => {
          return (
            <ProductManagement
              key={product._id}
              product={product}
            ></ProductManagement>
          );
        })
      ) : (
        <p>Votre panier est vide ! (A bas le consumérisme !)</p>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Cart;
