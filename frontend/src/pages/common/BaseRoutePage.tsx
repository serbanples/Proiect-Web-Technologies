import { Navigate } from "react-router-dom";
import { config } from "../../config/config";

const BaseRoutePage = () => {
  return <Navigate to={config.routes.allTasksRoute} />
}

export default BaseRoutePage;
