import { combineReducers } from 'redux';
import tasks from './tasks';
import taskView from './taskView';

const rootReducer = combineReducers({
  tasks,
  taskView
});

export default rootReducer;
