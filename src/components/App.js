import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import Task from './Task';

const App = props => {
  const taskComponents = _.map(task =>
    <Task taskID={task.taskID} key={task.taskID} />
  )(props.tasks);

  const menuIcon = (
    <svg width="30" height="20" xmlns="http://www.w3.org/2000/svg" className="menu-icon">
      <path d="M1,1 L29,1 M1,10 L29,10 M1,19 L29,19" />
    </svg>
  );

  return (
    <div className="main-container">
      {menuIcon}
      <div className="sort-actions">
        Sort by:
        &nbsp; <a href="#">Importance Severity</a>
        &nbsp; -&nbsp; <a href="#">KPI</a>
        &nbsp; -&nbsp; <a href="#">Project</a>
      <div className="right">
        <a href="#">Add Task</a>
      </div>
      </div>
      {taskComponents}
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(App);
