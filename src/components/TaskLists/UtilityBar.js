import React from 'react';
import ShowIf from '../common/ShowIf';
import { dash } from '../../utilities';

const UtilityBar = ({ isAddingTask, addTask }) =>
  <div className="sort-actions">
    Sort by:
    &nbsp;&nbsp;
    <a href="#">Importance Severity</a>
    {dash}
    <a href="#">Goal</a>
    {dash}
    <a href="#">Project</a>
    <div className="sm-right">
      <ShowIf show={isAddingTask}>
        <a href="#nowhere" onClick={addTask}>Add Task</a>
      </ShowIf>
    </div>
  </div>

export default UtilityBar;
