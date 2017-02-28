import { combineReducers } from 'redux';
import tasks from './tasks';
import taskView from './taskView';
import view from './view';

const rootReducer = combineReducers({
  view,
  tasks,
  taskView
});

export default rootReducer;
