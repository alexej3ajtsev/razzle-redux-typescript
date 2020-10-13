import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { Link } from 'react-router-dom';
import './App.css';

const App = ({ route }: { route: RouteConfig }) => (
  <div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
      </ul>
    </nav>
    {renderRoutes(route.routes)}
  </div>
);

export default App;
