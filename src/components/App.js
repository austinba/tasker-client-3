import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Menu, MenuIcon, friendlyRouteNames } from './Menu';
import ShowIf from './common/ShowIf';
import * as viewActions from '../actions/view';
import * as usersActions from '../actions/users';
import * as sessionActions from '../actions/session';
import * as auth from '../auth';
import R from 'ramda';


class App extends React.Component {
  constructor(props) {
    super(props);
    if(auth.isSignedIn() && !props.session.user) {
      sessionActions.getMyInfo(auth.getToken());
    }
  }
  componentWillMount() {
    this.props.usersActions.getUsers();
  }
  render() {
    if(!auth.isSignedIn()) browserHistory.push('/');
    const { view, actions, children, routing, sessionActions } = this.props;
    const route = R.path(['locationBeforeTransitions', 'pathname'])(routing);
    return (
      <div className="overall-container">
        <ShowIf show={view.menuOpen} >
          <Menu
            toggleMenuAction={actions.toggleMenu}
            route={route}
            signout={sessionActions.signout} />
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
  routing: state.routing,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(viewActions, dispatch),
  usersActions: bindActionCreators(usersActions, dispatch),
  sessionActions: bindActionCreators(sessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
