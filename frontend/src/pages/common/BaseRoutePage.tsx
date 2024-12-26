// import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom";
import { config } from "../../config/config";

const BaseRoutePage = () => {
  // const navigate = useNavigate();

  // navigate(config.routes.homeRoute);

  return <Navigate to={config.routes.homeRoute} />
}

export default BaseRoutePage;