import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const LocalStorageData = JSON?.parse(localStorage.getItem("loggedin"));
  return LocalStorageData?.access_token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
