import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useOrdersQuery from "../hooks/useOrdersQuery";
import { useQueryClient } from "@tanstack/react-query";

const Admin = ({ token, isAdmin }) => {
  const { data, isLoading, error } = useOrdersQuery(token);
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const delivredOrders =
    data?.filter((order) => order.delivered === true) || [];
  const notDelivredOrders =
    data?.filter((order) => order.delivered === false) || [];

  if (isLoading)
    return <p>Une erreur est survenue lors du chargement des commandes.</p>;
  if (error) return <p>{error.message}</p>;

  const handleMarkDelivered = async () => {
    if (!selectedOrderId) return;

    try {
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
        queryClient.invalidateQueries(["orders"]);
        setSelectedOrderId("");
      }
    } catch (error) {
      console.error(
        error.response?.data?.error ||
          "Une erreur est survenue lors de la mise à jour de la commande"
      );
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
      <h2>Commandes en cours : </h2>
      {notDelivredOrders.length > 0 ? (
        <div>
          <select
            value={selectedOrderId}
            onChange={(event) => setSelectedOrderId(event.target.value)}
          >
            <option value="" disabled>
              Sélectionnez une commande
            </option>
            {notDelivredOrders.map((order) => (
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

      <h2>Commandes livrées : </h2>
      {delivredOrders.length > 0 ? (
        <div>
          {delivredOrders.map((order) => (
            <h3 key={order._id} value={order._id}>
              {order._id}
            </h3>
          ))}
        </div>
      ) : (
        <p>Pas de commandes livrées !</p>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Admin;
