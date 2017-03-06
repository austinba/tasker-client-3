import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShowIf from '../common/ShowIf';
import SortedTasks from './SortedTasks';
import UtilityBar from './UtilityBar';
import * as tasksActions from '../../actions/tasks'
import * as sorters from './sorters';
import '../../styles/tasks.css';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    const { preset, actions } = props;

    if(preset === 'myTasks') {
      actions.getMyTasks();
    } else if (preset === 'tasksIveAssigned') {
      actions.getTasksIveAssigned();
    } else {
      throw new Error('TaskList requires a preset');
    }
  }
  componentWillUnmount() {
    this.props.actions.unmountList();
  }
  render() {
    const { tasks, actions, preset } = this.props;
    const taskCount = Object.keys(tasks).length;

    if(tasks.loading) {
      return (
        <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw task-saving-spinner"></i></div>
      );
    }

    return (
      <div>
        <UtilityBar isAddingTask={!tasks['adding-task']}
                    addTask={actions.addTask} />
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
        <SortedTasks tasks={tasks} sortBy={sorters.sortByProject} preset={preset}/>
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
