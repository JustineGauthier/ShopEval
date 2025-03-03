import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:4000/products/${id}`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>En cours de chargement...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
    </div>
  );
};

export default Product;
