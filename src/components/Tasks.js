import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import Task from './Task';

const TaskComponents = R.pipe(
  R.prop('tasks'),
  R.values,
  R.sortWith([
    R.descend(R.propEq('taskID', 'adding-task')),
    R.ascend(R.prop('taskID'))
  ]),
  R.map(task => (<Task taskID={task.taskID} key={task.taskID} />)),
  result => <div>{result}</div>
);

const Tasks = props => {
  return (
    <div>
      <div className="sort-actions">
        Sort by:
        &nbsp; <a href="#">Importance Severity</a>
        &nbsp; -&nbsp; <a href="#">KPI</a>
        &nbsp; -&nbsp; <a href="#">Project</a>
        <div className="sm-right"><a href="#">Add Task</a></div>
      </div>
      <TaskComponents tasks={props.tasks} />
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  taskView: state.taskView
});

export default connect(mapStateToProps)(Tasks);
