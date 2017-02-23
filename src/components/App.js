import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import Task from './Task';

class App extends Component {
  render() {
    const { taskDetails } = this.props.tasks;

    // convert taskDetails to an array of objects
    const tasks =
      _.map(_.pairs(taskDetails), ([taskID, task]) => ({key: taskID, ...task}));

    const taskComponents =
      tasks.map(task => <Task {...task} user="AB" />);

    return (
      <div>
        {taskComponents}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(App);
