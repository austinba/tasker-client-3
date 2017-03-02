import React from 'react';
const CompletedTask = ({ date, undo, description }) => {
  const dateString = date.toLocaleDateString();
  return (
    <div className="box task-container completed-task">
      <div className="main-task-box">
        <div className="task-description">
          <span>
            COMPLETED
            (<a href="#nowhere" onClick={undo}>
              <em>undo</em>
            </a>) {dateString}:&nbsp;&nbsp;
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompletedTask;
