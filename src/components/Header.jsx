import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Accueil
        </button>
        <button
          onClick={() => {
            navigate("/products");
          }}
        >
          Products
        </button>

        {token ? (
          <>
            <button
              onClick={() => {
                navigate("/cart");
              }}
            >
              Panier
            </button>
            <button
              onClick={() => {
                navigate("/payment");
              }}
            >
              Paiement
            </button>
            <button
              onClick={() => {
                setToken(null), Cookies.remove("token");
                navigate("/login");
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
