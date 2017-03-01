import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, MenuIcon } from './Menu';
import ShowIf from './common/ShowIf';
import * as viewActions from '../actions/view';
import R from 'ramda';


const App = props => {
  const { view, actions, children, routing } = props;
  const route = R.path(['locationBeforeTransitions', 'pathname'])(routing);
  return (
    <div className="overall-container">
      <ShowIf show={view.menuOpen} >
        <Menu toggleMenuAction={actions.toggleMenu} route={route} />
      </ShowIf>
        <div className="main-container">
          <MenuIcon onClick={actions.toggleMenu} />
          {props.children}
        </div>
    </div>
  );
};

const mapStateToProps = state => ({
  view: state.view,
  routing: state.routing
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(viewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
