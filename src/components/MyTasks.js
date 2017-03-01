import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import ShowIf from './common/ShowIf';
import Task from './Task';
import * as tasksActions from '../actions/tasks'
import { dash } from '../utilities';
import '../styles/tasks.css';


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

class Tasks extends React.Component {
  componentDidMount() {
    this.props.actions.getMyTasks();
  }
  render() {
    const { tasks, actions } = this.props;
    const taskCount = Object.keys(tasks).length;

    if(tasks.loading) {
      return (
        <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw task-saving-spinner"></i></div>
      );
    }

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
            <ShowIf show={!tasks['adding-task']}>
              <a href="#nowhere" onClick={actions.addTask}>Add Task</a>
            </ShowIf>
          </div>
        </div>
        <ShowIf show={taskCount === 0 }>
          <div className="no-tasks-message">
            <div className="main-message">You have no tasks assigned to you</div>
            <p>
              <a href="#nowhere" onClick={actions.addTask}>
                <em>Create a task for yourself</em>
              </a>
            </p>
            <p>or</p>
            <p><a href="#nowhere"><em>View tasks you've assigned</em></a></p>
          </div>
        </ShowIf>
        <SortedTasks tasks={tasks} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  tasks: state.tasks,
  view: state.view,
  taskView: state.taskView
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(tasksActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
