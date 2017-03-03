import React from 'react';
const InactiveTask = ({ label, className, date, undo, description }) => {
  const dateString = date.toLocaleDateString();
  return (
    <div className={['box task-container', className].join(' ')}>
      <div className="main-task-box">
        <div className="task-description">
          <span>
            {label} (
            <a href="#nowhere" onClick={undo}>
              <em>undo</em>
            </a>) {dateString}:&nbsp;&nbsp;
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InactiveTask;
