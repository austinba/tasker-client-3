import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import ShowIf from './common/ShowIf';
import Task from './Task';
import * as tasksActions from '../actions/tasks'
import { dash } from '../utilities';

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
        &nbsp;&nbsp;
        <a href="#">Importance Severity</a>
        {dash}
        <a href="#">Goal</a>
        {dash}
        <a href="#">Project</a>
        <div className="sm-right">
          <ShowIf show={!props.tasks['adding-task']}>
            <a href="#" onClick={props.actions.addTask}>Add Task</a>
          </ShowIf>
        </div>
      </div>
      <SortedTasks tasks={props.tasks} />
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  taskView: state.taskView
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(tasksActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
