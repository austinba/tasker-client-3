import R from 'ramda';


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
  EDIT_TASK_SAVE_SUCCESS: state => action => action.task,
  EDIT_OR_ADD_TASK_SAVE_FAILURE: R.assoc('error', 'Failed trying to save task'),
  EDIT_TASK_DESCRIPTION: updateFieldPath(['edit', 'description']),
  EDIT_ASSIGNED_TO: updateFieldPath(['edit', 'assignedTo']),
  EDIT_ASSIGNED_FROM: updateFieldPath(['edit', 'assignedFrom']),
  EDIT_IS_LEVEL: state => action => R.assocPath(['edit', 'level'], action.level, state),
  GOAL_SELECT_OPEN: (task => task),
  GOAL_SELECT_CHOOSE: updateField('goal'),
  ADD_COMMENT: R.assoc('commentBeingAdded', {comment: ''}),
  ADD_COMMENT_EDIT: updateFieldPath(['commentBeingAdded', 'comment']),
  CANCEL_ADD_COMMENT: R.omit('commentBeingAdded'),
  SAVE_COMMENT_PENDING: R.assocPath(['commentBeingAdded', 'saving'], true),
  SAVE_COMMENT_SUCCESS: state => action => R.pipe(
    R.omit('commentBeingAdded'),
    R.evolve({comments: R.prepend(action.comment)})
  )(state),
  SAVE_COMMENT_FAILURE: R.pipe(
    R.dissocPath(['commentBeingAdded', 'saving']),
    R.assoc('error', 'Failed to save comment')
    ),
  REMOVE_ERROR: R.omit('error'),
  ADD_COMMENT_SAVE_FAILURE: R.assoc('error', 'Failed to save comment'),
  VIEW_MORE_COMMENTS: R.assoc('expandComments', true),
  CHECK_IN_PENDING: R.assoc('checkInUpdatePending', true),
  CHECK_IN_SUCCESS: state => action => R.pipe(
    R.assoc('lastCheckIn', action.date),
    R.dissoc('checkInUpdatePending'))(state),
  CHECK_IN_FAILURE: R.assoc('error', 'Failed to check in'),
  CANCEL_CHECK_IN_PENDING: R.assoc('checkInUpdatePending', true),
  CANCEL_CHECK_IN_SUCCESS: state => action => R.pipe(
    R.assoc('lastCheckIn', action.date),
    R.dissoc('checkInUpdatePending'))(state),
  CANCEL_CHECK_IN_FAILURE: R.assoc('error', 'Failed to cancel check in'),
  TASK_UPDATING: R.assoc('isUpdating', true),
  TASK_UPDATE_COMPLETE: R.omit('isUpdating'),
  UPDATE_SUCCESS: state => action => action.task
};


export default taskReducers;
