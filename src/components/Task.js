import React from 'react';
import '../styles/tasks.css'

function Task(props) {
  const { title, assignedTo, workingOnToday, hoursWorked,
          iconFormat, parentID, isCompleted, expanded, user } = props;

  const containerClasses = ['task-container'];
  if(assignedTo === user) containerClasses.push('assigned-to-me');
  if(isCompleted) containerClasses.push('completed');


  return (
    <div className={containerClasses.join(' ')}>
      <div className="task-title">{title}</div>
      <div className="assignment" data-working-on={workingOnToday}>
        <div className="assigned-to">{assignedTo}</div>
        <div className="hoursWorked">{hoursWorked}</div>
      </div>
    </div>
  );
}

export default Task;
