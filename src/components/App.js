import React from 'react';
import Tasks from './Tasks';

const MenuIcon = () => (
  <svg width="30" height="20" xmlns="http://www.w3.org/2000/svg" className="menu-icon">
    <path d="M1,1 L29,1 M1,10 L29,10 M1,19 L29,19" />
  </svg>
);

const App = props => {

  return (
    <div className="main-container">
      <MenuIcon />
      <Tasks />
    </div>
  );
};

export default App;
