import * as api from '../api';
import R from 'ramda';

export const startTaskEdit = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK', taskID };
};

export const cancelTaskEdit = (taskID, event) => {
  event.preventDefault();
  return { type: 'EDIT_TASK_CANCEL', taskID };
};

export const editDescription = (taskID, event) => {
  return { type: 'EDIT_TASK_DESCRIPTION', value: event.target.value, taskID };
};

export const editAssignedTo = (taskID, event) => {
  return { type: 'EDIT_ASSIGNED_TO', value: event.target.value, taskID };
};

export const editAssignedFrom = (taskID, event) => {
  return { type: 'EDIT_ASSIGNED_FROM', value: event.target.value, taskID };
};

export const editdueDate = (taskID, date) => {
  return { type: 'EDIT_DATE_DUE', value: date, taskID };
}

export const selectLevel = (taskID, level) => {
  event.preventDefault();
  return ({ type: 'EDIT_IS_LEVEL', level, taskID })
};

export const submitTaskEdits = (taskID, otherProps, event) => (dispatch, getState) => {
  event.preventDefault();
  const state = getState();
  const taskEdits  = R.merge(state.tasks[taskID].edit, otherProps);
  console.log(taskEdits);
  dispatch({ type: 'TASK_UPDATING', taskID });
  if(taskID === 'adding-task') {
    api.editTask(taskID, taskEdits).then(
      task => dispatch({ type: 'ADD_TASK_SAVE_SUCCESS', task, taskID })
    ).catch(error => {
      dispatch({ type: 'EDIT_OR_ADD_TASK_SAVE_FAILURE', error, taskID })
      // don't update_complete if 'adding-task' no longe exists
      dispatch({ type: 'TASK_UPDATE_COMPLETE', taskID })
    })
  } else {
    api.editTask(taskID, taskEdits).then(
      task => dispatch({ type: 'ADD_TASK_SAVE_SUCCESS', task, taskID })
    ).catch(
      error => dispatch({ type: 'EDIT_OR_ADD_TASK_SAVE_FAILURE', error, taskID })
    ).then(
      () => dispatch({ type: 'TASK_UPDATE_COMPLETE', taskID })
    )
  }
};

export const expandComments = (taskID, event) => {
  event.preventDefault();
  return { type: 'VIEW_MORE_COMMENTS', taskID };
}

export const addComment = (taskID, event) => {
  event.preventDefault();
  return { type: 'ADD_COMMENT', taskID };
};

export const saveComment = (taskID, event) => (dispatch, getState) => {
  event.preventDefault();
  dispatch({ type: 'SAVE_COMMENT_PENDING', taskID });
  const state = getState();
  const comment = R.path(['tasks', taskID, 'commentBeingAdded', 'comment'])(state) || '';
  api.saveComment(taskID, comment).then(
    comment => dispatch({ type: 'SAVE_COMMENT_SUCCESS', comment, taskID })
  ).catch(
    error => dispatch({ type: 'SAVE_COMMENT_FAILURE', error, taskID })
  )
}

export const addCommentEdit = (taskID, event) => {
  return { type: 'ADD_COMMENT_EDIT', value: event.target.value, taskID }
}

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

export const markDeleted = (taskID) => dispatch => {
  event.stopPropagation();
  dispatch({ type: 'TASK_UPDATING', taskID });
  api.markDeleted(taskID).then(
    (task)  => dispatch({ type: 'UPDATE_SUCCESS', taskID, task })
  ).catch(
    (error) => dispatch({ type: 'MARK_DELETE_FAILURE', taskID, error })
  ).then(
    () => dispatch({ type: 'TASK_UPDATE_COMPLETE', taskID })
  );
}
export const unmarkDeleted = (taskID) => dispatch => {
  event.stopPropagation();
  dispatch({ type: 'TASK_UPDATING', taskID });
  api.unmarkDeleted(taskID).then(
    (task)  => dispatch({ type: 'UPDATE_SUCCESS', taskID, task })
  ).catch(
    (error) => dispatch({ type: 'UNMARK_DELETE_FAILURE', taskID, error })
  ).then(
    () => dispatch({ type: 'TASK_UPDATE_COMPLETE', taskID })
  );
}

export const markComplete = (taskID) => dispatch => {
  event.stopPropagation();
  dispatch({ type: 'TASK_UPDATING', taskID });
  api.markComplete(taskID).then(
    (task)  => dispatch({ type: 'UPDATE_SUCCESS', taskID, task })
  ).catch(
    (error) => dispatch({ type: 'MARK_COMPLETE_FAILURE', taskID, error })
  ).then(
    () => dispatch({ type: 'TASK_UPDATE_COMPLETE', taskID })
  );
}
export const unmarkComplete = (taskID) => dispatch => {
  event.stopPropagation();
  dispatch({ type: 'TASK_UPDATING', taskID });
  api.unmarkComplete(taskID).then(
    (task)  => dispatch({ type: 'UPDATE_SUCCESS', taskID, task })
  ).catch(
    (error) => dispatch({ type: 'UNMARK_COMPLETE_FAILURE', taskID, error })
  ).then(
    () => dispatch({ type: 'TASK_UPDATE_COMPLETE', taskID })
  );
}
// export const startGoalSelect; // TODO: determine how to deal with this....
// export const goalSelected; // TODO: determine how to deal with this....
