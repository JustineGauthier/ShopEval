import { Navigate } from "react-router-dom";

const Payment = ({ token }) => {
  return token ? <div>Cart page</div> : <Navigate to="/login" />;
};

export default Payment;
