import { tasks } from './initialState';
import R from 'ramda';

// // Single task action types
// const EDIT_TASK = 'EDIT_TASK';
// const EDIT_TASK_DESC_UPDATE = 'EDIT_TASK_DESC_UPDATE';
// const EDIT_TASK_SAVE_SUCCESS = 'EDIT_TASK_SAVE_SUCCESS';
// const EDIT_TASK_SAVE_FAILURE = 'EDIT_TASK_SAVE_FAILURE';
// const EDIT_TASK_CANCEL = 'EDIT_TASK_CANCEL';
// const GOAL_SELECT_OPEN = 'GOAL_SELECT_OPEN';
// const GOAL_SELECT_CHOOSE = 'GOAL_SELECT_CHOOSE';
// const IS_LEVEL_CHOOSE = 'IS_LEVEL_CHOOSE';
// const UNTOGGLE_WORKING_TODAY_PENDING = 'UNTOGGLE_WORKING_TODAY_PENDING';
// const UNTOGGLE_WORKING_TODAY_SUCCESS = 'UNTOGGLE_WORKING_TODAY_SUCCESS';
// const UNTOGGLE_WORKING_TODAY_FAILURE = 'UNTOGGLE_WORKING_TODAY_FAILURE';
// const ADD_COMMENT = 'ADD_COMMENT';
// const ADD_COMMENT_SAVE_SUBMIT = 'ADD_COMMENT_SAVE_SUBMIT';
// const ADD_COMMENT_SAVE_SUCCESS = 'ADD_COMMENT_SAVE_SUCCESS';
// const ADD_COMMENT_SAVE_FAILURE = 'ADD_COMMENT_SAVE_FAILURE';
// const REMOVE_ERROR = 'REMOVE_ERROR';
// const VIEW_MORE_COMMENTS = 'VIEW_MORE_COMMENTS';
//
// // "tasks" action types
// const ADD_TASK = 'ADD_TASK';
// const ADD_TASK_SAVE_PENDING = 'ADD_TASK_SAVE_PENDING';
// const ADD_TASK_SAVE_SUCCESS = 'ADD_TASK_SAVE_SUCCESS';
// const ADD_TASK_SAVE_FAILURE = 'ADD_TASK_SAVE_FAILURE';


/* Updates state[field] with action.value */
const updateField = R.curry((field, task, action) =>
  R.assoc(field, R.prop('value', action), task));

  /* Updates state[fieldPath...] with action.value */
const updateFieldPath = R.curry((fieldPath, task, action) =>
  R.assocPath(fieldPath, R.prop('value', action), task));

const taskReducers = {
  EDIT_TASK: R.converge(
    R.assoc,
    [ R.always('edit'),
      R.pick(['description', 'assignedTo', 'project', 'dueDate', 'level']),
      R.identity
    ]),
  EDIT_TASK_CANCEL: R.omit('edit'),
  EDIT_TASK_SAVE_PENDING: R.assocPath(['edit', 'saving'], true),
  EDIT_TASK_SAVE_SUCCESS:
    R.pipe(
      R.converge(R.merge, [R.identity, R.prop('edit')]),
      R.omit('edit')
    ),
  EDIT_TASK_SAVE_FAILURE: R.assoc('error', 'Failed trying to save task'),
  EDIT_TASK_DESCRIPTION: updateFieldPath(['edit', 'description']),
  EDIT_IS_LEVEL: state => action => R.assocPath(['edit', 'level'], action.level, state),
  GOAL_SELECT_OPEN: (task => task),
  GOAL_SELECT_CHOOSE: updateField('goal'),
  TOGGLE_WORKING_TODAY_PENDING: updateField('workingOnUpdatePending'),
  TOGGLE_WORKING_TODAY_SUCCESS:
    R.compose(
      R.omit('workingOnUpdatePending'),
      R.omit('error'),
      R.converge(
        R.assoc, [ R.always('workedOn'),
                   R.prop('workingOnUpdatePending'),
                   R.identity,
                 ])),
  TOGGLE_WORKING_TODAY_FAILURE:
    R.compose(
      R.omit('workingOnUpdatePending'),
      R.assoc('error', 'Failed updating working-on status...')),
  ADD_COMMENT: R.assoc('addComment', {comment: ''}),
  ADD_COMMENT_UPDATE: updateFieldPath(['addComment', 'comment']),
  ADD_COMMENT_SAVE_SUBMIT: R.assocPath(['addComment', 'saving'], true),
  ADD_COMMENT_SAVE_SUCCESS: R.compose(
    R.omit('addComment'),
    R.converge(
      R.assoc,
      [ R.always('comment'),
        R.path(['addComment', 'comment']),
        R.identity
      ]
    )),
  REMOVE_ERROR: R.omit('error'),
  ADD_COMMENT_SAVE_FAILURE: R.assoc('error', 'Failed to save comment'),
  VIEW_MORE_COMMENTS: R.assoc('expandComments', true)
}


const tasksReducers = {
  EDIT_TASK_CANCEL: state => action => (action.taskID === 'adding-task') ? R.omit('adding-task', state) : state
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
