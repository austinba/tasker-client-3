import React from 'react';
import { dash } from '../../utilities';
import ShowIf from '../common/ShowIf';

const TaskActionsBar = ({edit, commentBeingAdded, addComment, cancelAddComment, startTaskEdit, cancelTaskEdit, submitTaskEdits}) => {
  return (
    <div className="box inner-box task-actions">

      <ShowIf show={commentBeingAdded}>
        <span>
          <a href="#nowhere" className="primary-link">Send Comment</a>
          {dash}
          <a href="#nowhere" onClick={cancelAddComment}>Cancel</a>
        </span>
      </ShowIf>

      <ShowIf show={edit}>
        &nbsp;
        <span className="xs-right">
          <a href="#nowhere" onClick={cancelTaskEdit}>Cancel</a>
          {dash}
          <a href="#nowhere" className="primary-link"
             onClick={submitTaskEdits}>Save</a>
        </span>
      </ShowIf>

      <ShowIf show={!edit && !commentBeingAdded}>
        <a href="#nowhere" onClick={addComment}>Add comment...</a>
        <span className="xs-right">
          <span>
            <a href="#nowhere">Delete</a>
            {dash}
            <a href="#nowhere" onClick={startTaskEdit}>Edit</a>
            {dash}
            <a href="#nowhere">Mark&nbsp;complete</a>
          </span>
        </span>
      </ShowIf>
    </div>
  );
}

export default TaskActionsBar;
