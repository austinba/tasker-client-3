import React from 'react';
import { connect } from 'react-redux';
import '../styles/tasks.css';

const Task = props => {
  const { taskID } = props;
  const task = props.tasks[taskID];

  return (
    <div className="task-container">
      <div className="main-task-box">
        <div className="task-description">
          {task.description}
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(Task);
