import { useSelector } from "react-redux";
import NotFound from "../components/shared/NotFound";
const ProtectedRoute = ({ children }) => {
  const authState = useSelector((state) => state.authState);
  const { isAuthenticated } = authState;
  return isAuthenticated ? children : <NotFound />;
};
export default ProtectedRoute;
