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


const mapTasks = sortBy =>
  R.pipe(
    R.values,
    sortBy,
    R.map(task => (<Task taskID={task.taskID} key={'task-' + task.taskID} />))
  );

const SortedTasks = ({tasks}) => {
  return <div>{mapTasks(sortByProject)(tasks)}</div>;
};

const Tasks = props => {
  return (
    <div>
      <div className="sort-actions">
        Sort by:
        &nbsp; <a href="#">Importance Severity</a>
        &nbsp; -&nbsp; <a href="#">Goal</a>
        &nbsp; -&nbsp; <a href="#">Project</a>
        <div className="sm-right"><a href="#">Add Task</a></div>
      </div>
      <SortedTasks tasks={props.tasks} />
    </div>
  );
};
// <Tasks tasks={props.tasks} sortBy={props.taskView.sortBy}/>
// <Task taskID="4" />

const mapStateToProps = state => ({
  tasks: state.tasks,
  taskView: state.taskView
});

export default connect(mapStateToProps)(Tasks);
