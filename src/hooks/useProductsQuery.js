import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/products");
      return data;
    },
    staleTime: 1000 * 60 * 2, //mettre à jour toutes les 2 minutes
  });

export default useProductsQuery;
