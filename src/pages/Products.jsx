import useProductsQuery from "../hooks/useProductsQuery";
import ProductManagement from "../components/ProductManagement";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useProductsQuery();
  if (isLoading) return <p>En cours de chargement...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>Products page</h1>
      {data.map((product) => {
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
    </div>
  );
};

export default Products;
