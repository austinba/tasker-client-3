const startTaskEdit = () => [type: 'EDIT_TASK'];
const submitTaskEdits = (parameters) =>
  dispatch => {
    setTimeout(() =>
      dispatch({ action: 'EDIT_TASK_SAVE_PENDING', value: now });
      dispatch({ action: 'EDIT_TASK_SAVE_SUCCESS' })
    , 1000)
  };
const startGoalSelect; // TODO: determine how to deal with this....
const goalSelected; // TODO: determine how to deal with this....
const ISLevelSelected = level => { action: 'IS_LEVEL_CHOOSE', value: level },
const toggleWorkingToday = isWorking => {
  const now = isWorking ? new Date() : '';
  return dispatch => {
    dispatch({ action: 'TOGGLE_WORKING_TODAY_PENDING', value: now });
    setTimeout(() => dispatch({action: 'TOGGLE_WORKING_TODAY_SUCCESS'}));
  };
}
