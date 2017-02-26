import React from 'react';

export function Menu(props) {
  return <div className="menu">{props.children}</div>;
}
export function MenuItem(props) {
  return <div className="menu-item">{props.text}</div>;
}
export function MenuItemText(props) {
  return <div className="menu-item-text">{props.text}</div>;
}
