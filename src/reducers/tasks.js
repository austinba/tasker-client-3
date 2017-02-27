import { tasks } from './initialState';
import R from 'ramda';

// Single task action types
const EDIT_TASK = 'EDIT_TASK';
const EDIT_TASK_DESC_UPDATE = 'EDIT_TASK_DESC_UPDATE';
const EDIT_TASK_SAVE_SUCCESS = 'EDIT_TASK_SAVE_SUCCESS';
const EDIT_TASK_SAVE_FAILURE = 'EDIT_TASK_SAVE_FAILURE';
const EDIT_TASK_CANCEL = 'EDIT_TASK_CANCEL';
const GOAL_SELECT_OPEN = 'GOAL_SELECT_OPEN';
const GOAL_SELECT_CHOOSE = 'GOAL_SELECT_CHOOSE';
const IS_LEVEL_CHOOSE = 'IS_LEVEL_CHOOSE';
const UNTOGGLE_WORKING_TODAY_PENDING = 'UNTOGGLE_WORKING_TODAY_PENDING';
const UNTOGGLE_WORKING_TODAY_SUCCESS = 'UNTOGGLE_WORKING_TODAY_SUCCESS';
const UNTOGGLE_WORKING_TODAY_FAILURE = 'UNTOGGLE_WORKING_TODAY_FAILURE';
const ADD_COMMENT = 'ADD_COMMENT';
const ADD_COMMENT_SAVE_SUBMIT = 'ADD_COMMENT_SAVE_SUBMIT';
const ADD_COMMENT_SAVE_SUCCESS = 'ADD_COMMENT_SAVE_SUCCESS';
const ADD_COMMENT_SAVE_FAILURE = 'ADD_COMMENT_SAVE_FAILURE';
const VIEW_MORE_COMMENTS = 'VIEW_MORE_COMMENTS';
const REPORT_ERROR = 'REPORT_ERROR';

// "tasks" action types
const ADD_TASK = 'ADD_TASK';
const ADD_TASK_SAVE_PENDING = 'ADD_TASK_SAVE_PENDING';
const ADD_TASK_SAVE_SUCCESS = 'ADD_TASK_SAVE_SUCCESS';
const ADD_TASK_SAVE_FAILURE = 'ADD_TASK_SAVE_FAILURE';


const updateField = R.curry((field, task, action) => R.assoc(field, R.prop('value', action), task));
const updateFieldPath = R.curry((fieldPath, task, action) => R.assocPath(fieldPath, R.prop('value', action), task));

const taskReducers = {
  EDIT_TASK: R.assoc('edit', {}),
  EDIT_TASK_SAVE_SUCCESS: R.compose(R.omit('edit'), R.converge(R.merge, [R.identity, R.prop('edit')])),
  EDIT_TASK_SAVE_FAILURE: R.assocPath(['edit', 'error'], 'Failed trying to save'),
  EDIT_TASK_CANCEL: R.omit('edit'),
  EDIT_TASK_DESC_UPDATE: updateField('description'),
  GOAL_SELECT_OPEN: (task => task),
  GOAL_SELECT_CHOOSE: updateField('goal'),
  IS_LEVEL_CHOOSE: updateField('level'),
  TOGGLE_WORKING_TODAY_PENDING: updateField('lastUpdateWorkedOnPendingUpdate'),
  TOGGLE_WORKING_TODAY_SUCCESS:
    R.compose(
      R.omit('lastUpdateWorkedOnPendingUpdate'),
      R.omit('error'),
      R.converge(
        R.assoc, [ () => 'lastDateWorkedOn',
                   R.prop('lastUpdateWorkedOnPendingUpdate'),
                   R.identity,
                 ])),
  TOGGLE_WORKING_TODAY_FAILURE:
    R.compose(
      R.omit('lastUpdateWorkedOnPendingUpdate'),
      R.assoc('error', 'Failed updating working-on status...')),
  ADD_COMMENT: R.assoc('addComment', {comment: ''}),
  ADD_COMMENT_UPDATE: updateFieldPath(['addComment', 'comment']),
  ADD_COMMENT_SAVE_SUBMIT: R.assocPath(['addComment', 'saving'], true),
  ADD_COMMENT_SAVE_SUCCESS: (task => task),
  ADD_COMMENT_SAVE_FAILURE: (task => task),
  VIEW_MORE_COMMENTS: (task => task),
  REPORT_ERROR: (task => task)
}



function taskReducer(state = tasks, action) {
  const taskID = action.taskID;
  if(taskID) {
    const taskReducer = taskReducers[action.type] || (task => task);
    return R.assoc(taskID, taskReducer(state[taskID]), state); // update this task with the task Reducer
  }
  return state;
}

export default taskReducer;
