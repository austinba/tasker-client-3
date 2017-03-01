import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App';
import MyTasks from './components/MyTasks';
import configureStore from './store'
import './styles/reset.css';
import './styles/index.css';
import 'font-awesome/css/font-awesome.min.css';


const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={MyTasks} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
