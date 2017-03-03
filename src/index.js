import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App';
import MyTasks from './components/TaskLists/MyTasks';
import TasksIveAssigned from './components/TaskLists/TasksIveAssigned';
import Home from './components/Home';
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
      <Route path="/" component={App}>
        <Route path="/my-tasks" component={MyTasks} />
        <Route path="/tasks-ive-assigned" component={TasksIveAssigned} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// <Route path="/home" component={Home} />
