import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, MenuIcon, friendlyRouteNames } from './Menu';
import ShowIf from './common/ShowIf';
import * as viewActions from '../actions/view';
import * as usersActions from '../actions/users';
import R from 'ramda';


class App extends React.Component {
  componentWillMount() {
    this.props.usersActions.getUsers();
  }
  render() {
    const { view, actions, children, routing } = this.props;
    const route = R.path(['locationBeforeTransitions', 'pathname'])(routing);
    return (
      <div className="overall-container">
        <ShowIf show={view.menuOpen} >
          <Menu toggleMenuAction={actions.toggleMenu} route={route} />
        </ShowIf>
          <div className="main-container">
            <div className="header-row">
              <MenuIcon onClick={actions.toggleMenu} />
              <div className="header-row-title">{friendlyRouteNames[route]}</div>
            </div>
            {children}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  view: state.view,
  routing: state.routing
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(viewActions, dispatch),
  usersActions: bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
