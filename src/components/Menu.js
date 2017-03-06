import React from 'react';
import { Link } from 'react-router';

export const friendlyRouteNames = {
  '/my-tasks': 'My Tasks',
  '/tasks-ive-assigned': `Tasks I've Assigned`,
  '/invite': 'Invite Someone to Team'
};

const MenuLink = (onClick, {to, route, children}) => {
  if(route === to) {
    return <div className="active-menu-item">{children}</div>;
  }
  return <div><Link to={to} onClick={onClick}>{children}</Link></div>;
}
export const Menu = ({toggleMenuAction, route, signout}) => {
  const MLink = MenuLink.bind(null, toggleMenuAction);
  return (
    <div className="menu-container">
      <MenuIcon onClick={toggleMenuAction} />
      <div className="menu-items">
        <MLink to="/my-tasks" route={route}>
          {friendlyRouteNames['/my-tasks']}
        </MLink>
        <MLink to="/tasks-ive-assigned" route={route}>
          {friendlyRouteNames['/tasks-ive-assigned']}
        </MLink>
        <MLink to="/invite" route={route}>
          {friendlyRouteNames['/invite']}
        </MLink>
        <div>
          <a href="#nowhere" onClick={signout}>Sign out</a>
        </div>
      </div>
    </div>
  );
}

export const MenuIcon = ({onClick}) => (
  <svg width="30" height="20"
       xmlns="http://www.w3.org/2000/svg"
       className="menu-icon"
       onClick={onClick}>
    <path d="M1,1 L29,1 M1,10 L29,10 M1,19 L29,19" />
  </svg>
);
