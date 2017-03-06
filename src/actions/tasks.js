import * as api from '../api';
import R from 'ramda';

export const unmountList = () => ({type: 'UNMOUNT_TASK_LIST'});

const getTasks = (getTaskAPICall, recentUsersSource) => () => dispatch => {
  dispatch({ type: 'LOADING_TASKS' });
  getTaskAPICall().then(data => {
    dispatch({ type: 'LOAD_TASKS_SUCCESS',
               tasks: data.tasks,
               users: data.users });
    const recentUsers =
      R.pipe(
        R.values,
        R.map(R.prop(recentUsersSource)),
        R.groupWith(R.equals),
        R.sortBy(R.pipe(R.length, R.negate)),
        R.map(R.head)
      )(data.tasks);
    dispatch({ type: 'RECEIVE_RECENT_USERS_LIST', recentUsers});
  }).catch(error => {
    dispatch({ type: 'LOAD_TASKS_ERROR', error });
  })
};

export const getMyTasks = getTasks(api.getMyTasks, 'assignedFrom');
export const getTasksIveAssigned = getTasks(api.getTasksIveAssigned, 'assignedTo');

export const addTask = event => {
  event.preventDefault();
  return { type: 'ADD_TASK' };
};
