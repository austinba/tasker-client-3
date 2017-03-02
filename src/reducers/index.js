import { combineReducers } from 'redux';
import tasks from './tasks';
import view from './view';
import users from './users';
import createATeam from './createATeam';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  view,
  tasks,
  users,
  routing,
  form,
  createATeam
});

export default rootReducer;
