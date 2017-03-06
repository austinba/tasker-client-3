import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as auth from './auth';
import App from './components/App';
import Invite from './components/Invite';
import MyTasks from './components/TaskLists/MyTasks';
import TasksIveAssigned from './components/TaskLists/TasksIveAssigned';
import Home from './components/Home';
import AcceptInvite from './components/AcceptInvite';
import SignIn from './components/SignIn';
import configureStore from './store'
import './styles/reset.css';
import './styles/index.css';
import 'font-awesome/css/font-awesome.min.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/invite/:id" component={AcceptInvite} />
      <Route path="/" component={App} onEnter={requireAuth}>
        <Route path="/my-tasks" component={MyTasks} />
        <Route path="/tasks-ive-assigned" component={TasksIveAssigned} />
        <Route path="/invite" component={Invite} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// <Route path="/home" component={Home} />
function requireAuth(nextState, replace) {
  if(!auth.isSignedIn()) {
    replace({
      pathname: 'signin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
