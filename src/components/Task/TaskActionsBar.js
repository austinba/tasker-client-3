import React from 'react';
import { dash } from '../../utilities';
import ShowIf from '../common/ShowIf';

const TaskActionsBar = ({edit, addComment, startTaskEdit, cancelTaskEdit, submitTaskEdits}) => {
  return (
    <div className="box task-actions">

      <ShowIf show={addComment}>
        <span>
          <a href="#nowhere" className="primary-link">Send Comment</a>
          {dash}
          <a href="#nowhere">Cancel</a>
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

      <ShowIf show={!edit && !addComment}>
        <a href="#nowhere">Add comment...</a>
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
