import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Admin = ({ token, isAdmin }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAdmin) return;

      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setOrders(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setError(
          error.response?.data?.error ||
            "Une erreur est survenue lors du chargement des commandes"
        );
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin, token]);

  const handleMarkDelivered = async () => {
    if (!selectedOrderId) return;

    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:4000/orders/mark-delivered/${selectedOrderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOrders(orders.filter((order) => order._id !== selectedOrderId));
        setIsLoading(false);
        setSelectedOrderId("");
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Une erreur est survenue lors de la mise à jour de la commande"
      );
      setIsLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/products" />;
  }

  return (
    <div>
      {isLoading && <p>Chargement...</p>}
      {orders.length > 0 ? (
        <div>
          <select
            value={selectedOrderId}
            onChange={(event) => setSelectedOrderId(event.target.value)}
          >
            <option value="" disabled>
              Sélectionnez une commande
            </option>
            {orders.map((order) => (
              <option key={order._id} value={order._id}>
                {order._id}
              </option>
            ))}
          </select>
          <button
            onClick={handleMarkDelivered}
            disabled={isLoading || !selectedOrderId}
          >
            Indiquer comme livré
          </button>
        </div>
      ) : (
        <p>Pas de commandes en cours !</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Admin;
