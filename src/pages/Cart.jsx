import { Navigate } from "react-router-dom";

const Cart = ({ token }) => {
  console.log("token : ", token);

  return token ? <div>Cart page</div> : <Navigate to="/login" />;
};

export default Cart;
