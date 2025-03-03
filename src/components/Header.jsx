import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div>
        <button
          onClick={() => {
            navigate("/products");
          }}
        >
          Products
        </button>
      </div>
    </header>
  );
};

export default Header;
