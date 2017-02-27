import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import Task from './Task';

const sortByGoal = R.sortWith([
  R.descend(R.propEq('taskID', 'adding-task')),
  R.ascend(R.prop('goal')),
  R.ascend(R.prop('dueDate')),
  R.descend(R.prop('lastDateWorkedOn')),
  R.ascend(R.prop('level')),
  R.ascend(R.prop('project'))
]);

const sortByImportanceSeverity = R.sortWith([
  R.descend(R.propEq('taskID', 'adding-task')),
  R.ascend(R.prop('level')),
  R.ascend(R.prop('dueDate')),
  R.descend(R.prop('lastDateWorkedOn')),
  R.ascend(R.prop('project')),
  R.ascend(R.prop('goal'))
]);

const sortByProject = R.sortWith([
  R.descend(R.propEq('taskID', 'adding-task')),
  R.ascend(R.prop('project')),
  R.ascend(R.prop('dueDate')),
  R.descend(R.prop('lastDateWorkedOn')),
  R.ascend(R.prop('level')),
  R.ascend(R.prop('goal'))
]);

const taskComponents = (sortBy) =>
  R.pipe(
    R.prop('tasks'),
    R.values,
    sortBy,
    R.map(task => (<Task taskID={task.taskID} key={task.taskID} />)),
    result => <div>{result}</div>
  );

const Tasks = props => {

  const Tasks = taskComponents(sortByGoal);
  return (
    <div>

      <div className="sort-actions">
        Sort by:
        &nbsp; <a href="#">Importance Severity</a>
        &nbsp; -&nbsp; <a href="#">Goal</a>
        &nbsp; -&nbsp; <a href="#">Project</a>
        <div className="sm-right"><a href="#">Add Task</a></div>
      </div>
      <Tasks tasks={props.tasks} sortBy={props.taskView.sortBy}/>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  taskView: state.taskView
});

export default connect(mapStateToProps)(Tasks);
