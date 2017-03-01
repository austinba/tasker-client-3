import { combineReducers } from 'redux';
import tasks from './tasks';
import taskView from './taskView';
import view from './view';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  view,
  tasks,
  taskView,
  routing: routerReducer
});

export default rootReducer;
