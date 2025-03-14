import { useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import ProductManagement from "../components/ProductManagement";

const Cart = () => {
  const { cart, totalPrice } = useCartContext();
  const navigate = useNavigate();

  return (
    <>
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => {
            const id = product._id;

            return (
              <div key={product._id}>
                <div
                  onClick={() => {
                    navigate(`/products/${id}`, { state: { id } });
                  }}
                >
                  <img src={product.thumbnail} alt={product.title} />
                  <h2>
                    {product.title} - {product.price}€
                  </h2>
                </div>
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
  );
};

export default Cart;
