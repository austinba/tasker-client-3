export const startTaskEdit = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK', taskID };
};

export const cancelTaskEdit = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK_CANCEL', taskID };
};

export const expandComments = taskID => {
  event.preventDefault();
  return { type: 'VIEW_MORE_COMMENTS', taskID };
}

export const submitTaskEdits = taskID => dispatch => {
  event.preventDefault();
  dispatch({ type: 'EDIT_TASK_SAVE_PENDING', taskID });
  setTimeout(() =>
    dispatch({ type: 'EDIT_TASK_SAVE_SUCCESS', taskID })
  , 1000)
};

export const selectLevel = (taskID, level) => {
  event.preventDefault();
  return ({ type: 'EDIT_IS_LEVEL', level, taskID })
};

export const editDescription = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK_DESCRIPTION', value: event.target.value, taskID };
}

export const toggleWorkingToday = (taskID, isWorking) => {
  event.preventDefault();
  const now = isWorking ? new Date() : '';
  return dispatch => {
    dispatch({ action: 'TOGGLE_WORKING_TODAY_PENDING', value: now });
    setTimeout(() => dispatch({action: 'TOGGLE_WORKING_TODAY_SUCCESS'}));
  };
}

export const addComment = (taskID, event) => {
  event.preventDefault();
  return { type: 'ADD_COMMENT', taskID };
};

export const cancelAddComment = (taskID) => {
  event.preventDefault();
  return {type: 'CANCEL_ADD_COMMENT', taskID};
}
// export const startGoalSelect; // TODO: determine how to deal with this....
// export const goalSelected; // TODO: determine how to deal with this....
