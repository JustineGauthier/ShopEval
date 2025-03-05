import useProductsQuery from "../hooks/useProductsQuery";
import ProductManagement from "../components/ProductManagement";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/products.css";

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useProductsQuery();

  if (isLoading) return <p>En cours de chargement...</p>;
  if (error) return <p>{error.message}</p>;

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Rechercher un produit..."
        onChange={(event) => setSearch(event.target.value)}
      ></input>
      {filteredProducts.map((product) => {
        const id = product._id;

        return (
          <div className="card" key={id}>
            <div
              onClick={() => {
                navigate(`/products/${id}`, { state: { id } });
              }}
            >
              <img src={product.thumbnail} alt={product.title} />
              <h2>
                {product.title} - {product.price}€
              </h2>
            </div>
            <ProductManagement product={product}></ProductManagement>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
