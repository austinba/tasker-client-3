import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import '../styles/tasks.css';

const Task = props => {
  const { taskID } = props;
  const task = props.tasks[taskID];

  return (
    <div className="box task-container">
      <div className="main-task-box">
        <ISBox level={task.importanceSeverity} dateDue={task.dateDue} />
        <div className="task-description">
          {task.description}
        </div>
      </div>
      <div className="box task-actions">
        Add comment...
        <span className="right">
          Delete&nbsp;&nbsp;-&nbsp;&nbsp;Edit&nbsp;&nbsp;-&nbsp;&nbsp;Mark&nbsp;complete
        </span>
      </div>
      <div className="box task-comments">
        These are some comments
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(Task);
