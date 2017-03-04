import taskReducers from './task';
import { tasks } from './initialState';
import R from 'ramda';

const tasksReducers = {
  EDIT_TASK_CANCEL: state => action => (action.taskID === 'adding-task') ? R.omit('adding-task', state) : state,
  ADD_TASK: R.assoc('adding-task', {taskID: 'adding-task', edit: {}}),
  LOADING_TASKS: state => ({...state, loading: true}),
  LOAD_TASKS_SUCCESS: state => action => action.tasks,
  LOAD_TASKS_ERROR: state => action => console.log(action) || state,
  ADD_TASK_SAVE_SUCCESS: state => action => R.pipe(
    R.assoc(action.task.taskID, action.task),
    R.dissoc('adding-task'),
    state => console.log(state) ||  state
  )(state),
};

function taskReducer(state = tasks, action) {
  const taskID = action.taskID;
  let newState = state;

  if(taskID) {
    const taskReducer = taskReducers[action.type] || R.identity;
    const taskReducerStateApplied = taskReducer(newState[taskID]);
    const taskReducerResult = !taskReducerStateApplied.call ? taskReducerStateApplied : taskReducerStateApplied(action);
    newState = R.assoc(taskID, taskReducerResult, newState); // update this task with the task Reducer
  }

  const tasksReducer = tasksReducers[action.type] || R.identity;
  const tasksReducerStateApplied = tasksReducer(newState);
  newState = !tasksReducerStateApplied.call ? tasksReducerStateApplied : tasksReducerStateApplied(action)
  return newState;
}

export default taskReducer;
