import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import Task from './Task';

const App = props => {
  const taskComponents = _.map(task =>
    <Task taskID={task.taskID} key={task.taskID} />
  )(props.tasks);

  return (
    <div className="main-container">
      {taskComponents}
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(App);
