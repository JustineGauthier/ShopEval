import { Navigate, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import ProductManagement from "../components/ProductManagement";

const Cart = ({ token }) => {
  const { cart, totalPrice } = useCartContext();
  const navigate = useNavigate();

  return token ? (
    <>
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => {
            const id = product._id;

            return (
              <div key={product._id}>
                <h2
                  onClick={() => {
                    navigate(`/products/${id}`, { state: { id } });
                  }}
                >
                  {product.title}
                </h2>
                <ProductManagement product={product}></ProductManagement>
              </div>
            );
          })}
          <h2>Total : {totalPrice.toFixed(2)}€</h2>
          <button
            onClick={() => {
              navigate(`/payment`);
            }}
          >
            Paiement !
          </button>
        </div>
      ) : (
        <p>Votre panier est vide ! (A bas le consumérisme !)</p>
      )}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Cart;
