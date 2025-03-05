import useProductsQuery from "../hooks/useProductsQuery";
import ProductManagement from "../components/ProductManagement";

const Products = () => {
  const { data, isLoading, error } = useProductsQuery();
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;

  return isLoading ? (
    <h1>En cours de chargement...</h1>
  ) : (
    <div>
      <h1>Products page</h1>
      {data.map((product) => {
        return (
          <ProductManagement
            key={product._id}
            product={product}
          ></ProductManagement>
        );
      })}
    </div>
  );
};

export default Products;
