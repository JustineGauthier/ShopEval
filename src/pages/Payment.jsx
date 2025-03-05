import { Navigate, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import axios from "axios";
import { useState } from "react";

const Payment = ({ token }) => {
  const { cart, dispatch, totalPrice } = useCartContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    const clientAddress = formData.get("address");

    const data = {
      products: cart.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
      address: clientAddress,
      price: totalPrice,
    };

    try {
      const response = await axios.post("http://localhost:4000/orders", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        dispatch({ type: "clear_cart" });
        setIsLoading(false);
        navigate("/products");
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Une erreur est survenue lors du paiement"
      );
    }
  };

  return token ? (
    <>
      {cart.length > 0 ? (
        <div>
          {cart.map((product) => {
            const id = product._id;

            return (
              <div key={id}>
                <h2
                  onClick={() => {
                    navigate(`/products/${id}`, { state: { id } });
                  }}
                >
                  {product.title}
                </h2>
              </div>
            );
          })}
          <h2>Total : {totalPrice.toFixed(2)}€</h2>
          <form onSubmit={handlePayment}>
            <input type="text" name="address" placeholder="Adresse" required />
            {isLoading ? (
              <p>Chargement...</p>
            ) : (
              <button disabled={isLoading}>Payer</button>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      ) : (
        <Navigate to="/products" />
      )}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
