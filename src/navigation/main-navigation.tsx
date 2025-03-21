import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import AppRoutes from '../app-routes';
import AppContainer from '../layouts/AppContainer';

const MainNavigation = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route Component={AppContainer}>
          {
            AppRoutes.map((route:any) => (
                <Route key={route.path} path={route.path} element={<route.Component />} />
            ))
          }
        </Route>
      </Routes>
    </Router>
  );
};

export default MainNavigation;
