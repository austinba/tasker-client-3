import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tasks from './Tasks';
import ShowIf from './common/ShowIf';
import { dash, bar } from '../utilities';
import * as viewActions from '../actions/view';

const MenuIcon = ({onClick}) => (
  <svg width="30" height="20"
       xmlns="http://www.w3.org/2000/svg"
       className="menu-icon"
       onClick={onClick}>
    <path d="M1,1 L29,1 M1,10 L29,10 M1,19 L29,19" />
  </svg>
);

const App = props => {

  return (
    <div className="overall-container">
      <ShowIf show={props.view.menuOpen} >
        <div className="menu-container">
          <MenuIcon onClick={props.actions.toggleMenu} />
          <ul className="menu-items">
            <li>Manager View</li>
            <li>User View</li>
          </ul>
        </div>
      </ShowIf>
        <div className="main-container">
          <MenuIcon onClick={props.actions.toggleMenu} />
          <Tasks />
        </div>
    </div>
  );
};

const mapStateToProps = state => ({
  view: state.view
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(viewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
