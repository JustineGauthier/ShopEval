import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useOrdersQuery = (token) =>
  useQuery({
    queryKey: ["orders", token],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    staleTime: 1000 * 60 * 1,
  });

export default useOrdersQuery;
