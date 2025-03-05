import { useParams } from "react-router-dom";
import useProductsQuery from "../hooks/useProductsQuery";
import ProductManagement from "../components/ProductManagement";

const Product = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useProductsQuery();
  if (isLoading) return <p>En cours de chargement ...</p>;
  if (error) return <p>{error.message}</p>;

  const product = data.find((item) => item._id === id);

  return (
    <div>
      <h1>{product.title}</h1>
      <ProductManagement product={product}></ProductManagement>
    </div>
  );
};

export default Product;
