import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import '../styles/tasks.css';

const Task = props => {
  const { taskID } = props;
  const task = props.tasks[taskID];

  return (
    <div className="task-container">
      <div className="main-task-box">
        <ISBox level={task.importanceSeverity} dueDate={task.dueDate} />
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
