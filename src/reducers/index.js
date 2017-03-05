import { combineReducers } from 'redux';
import tasks from './tasks';
import view from './view';
import users from './users';
import currentUser from './currentUser';
import createATeam from './createATeam';
import signInPage from './signInPage';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  view,
  tasks,
  currentUser,
  users,
  routing,
  form,
  createATeam,
  signInPage,
});

export default rootReducer;
