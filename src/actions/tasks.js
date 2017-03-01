import * as api from '../api';

export const getMyTasks = () => dispatch => {
  dispatch({ type: 'LOADING_TASKS' });
  api.getMyTasks().then(tasks => {
    dispatch({ type: 'LOAD_TASKS_SUCCESS', tasks });
  }).catch(error => {
    dispatch({ type: 'LOAD_TASK_ERROR', error });
  })
}

export const addTask = event => {
  event.stopPropagation();
  console.log('add task')
  return { type: 'ADD_TASK' };
}
