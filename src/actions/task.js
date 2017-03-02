import * as api from '../api';

export const startTaskEdit = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK', taskID };
};

export const cancelTaskEdit = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK_CANCEL', taskID };
};

export const expandComments = (taskID, event) => {
  event.preventDefault();
  return { type: 'VIEW_MORE_COMMENTS', taskID };
}

export const submitTaskEdits = (taskID, event) => dispatch => {
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

export const addComment = (taskID, event) => {
  event.preventDefault();
  return { type: 'ADD_COMMENT', taskID };
};

export const cancelAddComment = (taskID, event) => {
  event.preventDefault();
  return {type: 'CANCEL_ADD_COMMENT', taskID};
}

export const checkIn = (taskID, event) => dispatch => { // new
  event.preventDefault();
  dispatch({ type: 'CHECK_IN_PENDING', taskID });
  api.checkIn(taskID).then(
    (date) => dispatch({ type: 'CHECK_IN_SUCCESS', taskID, date })
  ).catch(
    (error) => dispatch({ type: 'CHECK_IN_FAILURE', taskID, error })
  );
}

export const cancelCheckIn = (taskID, event) => dispatch => {
  event.preventDefault();
  dispatch({ type: 'CANCEL_CHECK_IN_PENDING', taskID });
  api.cancelCheckIn(taskID).then(
    (date) => dispatch({ type: 'CANCEL_CHECK_IN_SUCCESS', taskID, date })
  ).catch(
    (error) => dispatch({ type: 'CANCEL_CHECK_IN_FAILURE', taskID, error })
  )
}

// export const startGoalSelect; // TODO: determine how to deal with this....
// export const goalSelected; // TODO: determine how to deal with this....
