import React from 'react';
import { Link } from 'react-router';

const MenuLink = ({to, onClick, route, children}) => {
  if(route === to) {
    return <span className="active-menu-item">{children}</span>;
  }
  return <Link to={to} onClick={onClick}>{children}</Link>
}
export const Menu = ({toggleMenuAction, route}) => (
  <div className="menu-container">
    <MenuIcon onClick={toggleMenuAction} />
    <ul className="menu-items">
      <li>
        <MenuLink to="/my-tasks" onClick={toggleMenuAction} route={route}>
          My Tasks
        </MenuLink>
      </li>
      <li>
        <MenuLink to="/tasks-ive-assigned" onClick={toggleMenuAction} route={route}>
          Tasks I've Assigned
        </MenuLink>
      </li>
    </ul>
  </div>
);

export const MenuIcon = ({onClick}) => (
  <svg width="30" height="20"
       xmlns="http://www.w3.org/2000/svg"
       className="menu-icon"
       onClick={onClick}>
    <path d="M1,1 L29,1 M1,10 L29,10 M1,19 L29,19" />
  </svg>
);
