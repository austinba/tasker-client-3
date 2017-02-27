export const startTaskEdit = (taskID, event) => {
  event.stopPropagation();
  return { type: 'EDIT_TASK', taskID };
};
export const cancelTaskEdit = (taskID, event) => {
  event.stopPropagation();
  return { type: 'EDIT_TASK_CANCEL', taskID };
};
export const expandComments = taskID => { type: 'VIEW_MORE_COMMENTS', taskID };
export const submitTaskEdits = taskID =>
  dispatch => {
    dispatch({ action: 'EDIT_TASK_SAVE_PENDING' });
    setTimeout(() =>
      dispatch({ action: 'EDIT_TASK_SAVE_SUCCESS' })
    , 1000)
  };
// export const startGoalSelect; // TODO: determine how to deal with this....
// export const goalSelected; // TODO: determine how to deal with this....
export const IS_LevelSelected = (taskID, level) => ({ action: 'IS_LEVEL_CHOOSE', value: level });
export const toggleWorkingToday = isWorking => {
  const now = isWorking ? new Date() : '';
  return dispatch => {
    dispatch({ action: 'TOGGLE_WORKING_TODAY_PENDING', value: now });
    setTimeout(() => dispatch({action: 'TOGGLE_WORKING_TODAY_SUCCESS'}));
  };
}
