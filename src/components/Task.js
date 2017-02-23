import React from 'react';
import '../styles/tasks_trans.css'
import TaskIcon from './TaskIcon';

function Task(props) {
  const { title, assignedTo, workingOnToday, hoursWorked,
          iconFormat, parentID, isCompleted, expanded, user } = props;

  const containerClasses = ['task-container'];
  if(assignedTo === user) containerClasses.push('assigned-to-me');
  if(workingOnToday) containerClasses.push('working-on');
  if(isCompleted) containerClasses.push('completed');


  const assignment = (
    <div className="assignment">
      <div className="assigned-to">{assignedTo}</div>
      <div className="hours-worked">{hoursWorked}</div>
    </div>
  );

  const taskIcon = (
    <TaskIcon iconFormat={iconFormat} />
  );

  return (
    <div className={containerClasses.join(' ')}>
      {!isCompleted ? taskIcon : ''}
      <div className="task-title">{title}</div>
      {!isCompleted ? assignment : ''}
    </div>
  );
}

export default Task;
