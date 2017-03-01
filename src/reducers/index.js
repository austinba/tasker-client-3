import { combineReducers } from 'redux';
import tasks from './tasks';
import taskView from './taskView';
import view from './view';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  view,
  tasks,
  taskView,
  routing,
  form
});

export default rootReducer;
