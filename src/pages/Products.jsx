import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/products");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <div>
      <h1>Products page</h1>
      {data.map((product) => {
        const id = product._id;
        return (
          <div
            key={id}
            onClick={() => {
              navigate(`/products/${id}`, { state: { id } });
            }}
          >
            <h2>{product.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
