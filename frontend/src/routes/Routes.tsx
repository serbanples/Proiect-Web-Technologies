import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/route_control/ProtectedRoute';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import PublicRoute from '../components/route_control/PublicRoute';
import { config } from '../config/config';
import Dashboard from '../components/dashboard/Dashboard';
import Home from '../pages/general/home/Home';
import NotFound from '../pages/common/NotFound';
import BaseRoutePage from '../pages/common/BaseRoutePage';
import MyTasks from '../pages/general/MyTasks/MyProfile';
import Projects from '../pages/general/Projects/Projects';
import Teams from '../pages/general/Teams/Teams';

const AppRoutes: React.FC = () => {
  return (
    // routes to be accessed only by logged in users.
    <Routes>
      {/* Base route */}
      <Route path='*' element={<NotFound />} />
      {/* Fallback route */}
      <Route path='/' element={<BaseRoutePage />} />
      <Route path={config.routes.baseRoute} element={<ProtectedRoute />}>
        <Route path={config.routes.dashboardRoute} element={<Dashboard />} >
          <Route path={config.routes.allTasksRoute} element={<Home />} />
          <Route path={config.routes.myTasksRoute} element={<MyTasks />} />
          <Route path={config.routes.allProjectRoute} element={<Projects />} />
          <Route path={config.routes.allTeamsRoute} element={<Teams/>} />
        </Route>
      </Route>
      {/* routes to be accessed only by logged out users */}
      <Route path={config.routes.authBaseRoute} element={<PublicRoute />}>
        <Route path={config.routes.loginRoute} element={<Login />} />
        <Route path={config.routes.registerRoute} element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;