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
  ADD_COMMENT: R.assoc('commentBeingAdded', {comment: ''}),
  CANCEL_ADD_COMMENT: R.omit('commentBeingAdded'),
  ADD_COMMENT_UPDATE: updateFieldPath(['commentBeingAdded', 'comment']),
  ADD_COMMENT_SAVE_SUBMIT: R.assocPath(['commentBeingAdded', 'saving'], true),
  ADD_COMMENT_SAVE_SUCCESS: R.compose(
    R.omit('commentBeingAdded'),
    R.converge(
      R.assoc,
      [ R.always('comment'),
        R.path(['commentBeingAdded', 'comment']),
        R.identity
      ]
    )),
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
  CANCEL_CHECK_IN_FAILURE: R.assoc('error', 'Failed to cancel check in')
};


export default taskReducers;
