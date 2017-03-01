import * as api from '../api';

export const getMyTasks = () => dispatch => {
  dispatch({ type: 'LOADING_TASKS' });
  api.getMyTasks().then(data => {
    dispatch({ type: 'LOAD_TASKS_SUCCESS',
               tasks: data.tasks,
               users: data.users });
  }).catch(error => {
    dispatch({ type: 'LOAD_TASK_ERROR', error });
  })
};


export const getTasksIveAssigned = () => dispatch => {
  dispatch({ type: 'LOADING_TASKS' });
  api.getTasksIveAssigned().then(data => {
    console.log(data)
    dispatch({ type: 'LOAD_TASKS_SUCCESS',
               tasks: data.tasks,
               users: data.users });
  }).catch(error => {
    dispatch({ type: 'LOAD_TASK_ERROR', error });
  })
};

export const addTask = event => {
  event.stopPropagation();
  console.log('add task')
  return { type: 'ADD_TASK' };
};
