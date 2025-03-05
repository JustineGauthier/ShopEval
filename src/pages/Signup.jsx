import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        data
      );
      if (response.data.token) {
        setUser({ token: response.data.token, isAdmin: response.data.admin });
        setIsLoading(false);
        navigate("/");
      } else {
        error.response.status === 401
          ? setError("Mauvais email et/ou mot de passe")
          : setError(error.response?.data?.error || "Une erreur est survenue");
        setIsLoading(false);
      }
    } catch (error) {
      error.response.status === 401
        ? setError("Mauvais email et/ou mot de passe")
        : setError(error.response?.data?.error || "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          required
        />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
        />
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <button disabled={isLoading} type="submit">
            Créer l'utilisateur
          </button>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <Link to="/login">Déjà un compte ? Connecte-toi !</Link>
    </div>
  );
};

export default Signup;
