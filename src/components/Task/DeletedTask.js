import React from 'react';
const DeletedTask = ({ date, undo, description }) => {
  const dateString = date.toLocaleDateString();
  return (
    <div className="box task-container deleted-task">
      <div className="main-task-box">
        <div className="task-description">
          <span>
            DELETED
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

export default DeletedTask;
