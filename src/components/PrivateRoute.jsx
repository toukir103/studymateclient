import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"; 
import { auth } from "../firebase/firebase.config";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;  

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
