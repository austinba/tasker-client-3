import React from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import ISBox from './ISBox';
import ShowIf from '../common/ShowIf';
import Comments from './Comments';
import TaskActionsBar from './TaskActionsBar';
import InactiveTask from './InactiveTask';
import UsersDropDown from './UsersDropDown';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { bindAll, onActionKey, fullName } from '../../utilities';
import * as taskActions from '../../actions/task';

/** getEditField(defaultValue, property, object)
    defaluts to task[prop] is task.edit[prop] doesn't exist  */
const getEditField =
  (defaultVal, prop) => R.compose( R.defaultTo(defaultVal),
                                   R.converge(R.defaultTo,
                                              [ R.prop(prop),
                                                R.path(['edit', prop])
                                              ]));


const TaskDescription = props => {
  if(props.editing) {
    return <Textarea className='edit-task-description'
                     minRows={2}
                     value={props.value}
                     onChange={props.onChange}
                     onKeyDown={onActionKey(props.submitTaskEdits,
                                            props.cancelTaskEdit)} />;
  }
  return <div>{props.value}</div>
}


class Task extends React.Component {
  constructor(props) {
    super(props);
    const { taskID, unboundActions, preset } = props;
    this.boundActions = bindAll(taskID)(unboundActions);

    this.preset = {type: preset};
    if(preset === 'myTasks') {
      this.preset.myTasks = true;
      this.preset.assignmentLabel = 'Assigned From';
      this.preset.assignmentKey = 'assignedFrom';
      this.preset.assignmentEditAction = this.boundActions.editAssignedFrom;
    } else if (preset === 'tasksIveAssigned') {
      this.preset.tasksIveAssigned = true;
      this.preset.assignmentLabel = 'Assigned To';
      this.preset.assignmentKey = 'assignedTo';
      this.preset.assignmentEditAction = this.boundActions.editAssignedTo;
    } else {
      throw new Error('Task requires a preset');
    }
  }
  render() {
    const { tasks, taskID, users, session } = this.props;
    const task = tasks[taskID];

    const comments    = R.defaultTo([], task.comments);
    const checkedIn   = R.eqBy(date => new Date(date || 0).toJSON().split('T')[0],
                               new Date())(task.lastCheckInDate);
    const actions     = this.boundActions;
    const level       = getEditField(4 , 'level')(task);
    const description = getEditField('', 'description')(task);
    let submitTaskEdits;

    if(R.path(['user', 'userID'], session)) {
      if(this.preset.type === 'myTasks') {
        submitTaskEdits = actions.submitTaskEdits.bind(null, {assignedTo: session.user.userID});
      } else if(this.preset.type === 'tasksIveAssigned') {
        submitTaskEdits = actions.submitTaskEdits.bind(null, {assignedFrom: session.user.userID});
      } else {
        throw new Error('Task requires a preset');
      }
    }

    if(task.deleteDate) {
      return <InactiveTask label="DELETED"
                           className="deleted-task"
                           date={task.deleteDate}
                           description={task.description}
                           undo={actions.unmarkDeleted} />;
    }
    if(task.completionDate) {
      return <InactiveTask label="COMPLETED"
                           className="completed-task"
                           date={task.completionDate}
                           description={task.description}
                           undo={actions.unmarkComplete} />;
    }

    const toggleCheckIn = checkedIn ? actions.cancelCheckIn : actions.checkIn;
    console.log(users);
    return (
      <div className="box task-container">
        <div className="main-task-box">

          {/* Spinner while saving */}
          <ShowIf show={task.isUpdating}>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw task-saving-spinner" />
          </ShowIf>

          {/* CheckedIn Corner Flap */}
          <a href={this.preset.myTasks && '#nowhere'}
             onClick={this.preset.myTasks && toggleCheckIn}>

             <svg width="50" height="50"
                  className={[ 'corner-checked-in-marker',
                               (checkedIn ? 'filled' : ''),
                               (this.preset.myTasks ? 'enabled' : '')
                             ].join(' ')}
             >
               {/*<path d="M 0,0 L 50,50 L 50,0 Z" />*/}
               <path d="M 50,50 L 50,5 A5,5 0 0,0 45,0 L 0,0 Z" />
               {/*<path d="M 50,50 L 50,5 A5,5 0 0,0 45,0 L 0,0 A 120,120 0 0,1 50,50 Z" />*/}
             </svg>
             <ShowIf show={R.has('checkInUpdatePending', task)}>
               <i className="fa fa-spinner fa-pulse fa-fw checked-in-spinner"></i>
             </ShowIf>
          </a>

          <div className="IS-KPI-container">
            <ISBox level={level}
                   dueDate={(task.edit && task.edit.dueDate) || task.dueDate}
                   editing={task.edit}
                   selectLevel={actions.selectLevel}
                   editdueDate={actions.editdueDate}
            />
          {/*}
            <p className="task-goal">
              <ShowIf show={!task.edit}>{goal}</ShowIf>
              <ShowIf show={ task.edit}>
                <a className="xs-right">{goal}&nbsp;
                  <i className="fa fa-caret-down" />
                </a>
              </ShowIf>
            </p>
          {*/}
          </div>

          <div className="task-description">
            <div>
              <TaskDescription value={description}
                editing={!!task.edit}
                onChange={actions.editDescription}
                cancelTaskEdit={actions.cancelTaskEdit}
                submitTaskEdits={submitTaskEdits} />
              <div className="task-assignment-text">
                {this.preset.assignmentLabel}:
                <ShowIf show={task.edit}>
                  &nbsp;&nbsp;&nbsp;
                  <UsersDropDown
                    recentUsers={users.recentUsers}
                    allUsers={users.allUsers}
                    userID={R.path(['user', 'userID'], session)}
                    onChange={this.preset.assignmentEditAction}
                    value={(task.edit && task.edit[this.preset.assignmentKey]) ||
                           task[this.preset.assignmentKey] }/>
                </ShowIf>
                <ShowIf show={!task.edit}>
                  &nbsp;
                  {fullName(users.allUsers || {})(
                     task[this.preset.assignmentKey]
                  )}
                </ShowIf>
              </div>
            </div>
          </div>
        </div>

        <ShowIf show={task.error}>
          <div className="task-error">
            &nbsp;{task.error}&nbsp;
            {/*<a href="#nowhere"> (click here to report)</a>*/}
          </div>
        </ShowIf>

        <TaskActionsBar edit={task.edit}
                        commentBeingAdded={task.commentBeingAdded}
                        addComment={actions.addComment}
                        cancelAddComment={actions.cancelAddComment}
                        startTaskEdit={actions.startTaskEdit}
                        cancelTaskEdit={actions.cancelTaskEdit}
                        submitTaskEdits={submitTaskEdits}
                        saveComment={actions.saveComment}
                        markDeleted={actions.markDeleted}
                        markComplete={actions.markComplete} />

        <Comments comments={comments}
                  expanded={task.expandComments}
                  commentBeingAdded={task.commentBeingAdded}
                  editComment={actions.editComment}
                  saveComment={actions.saveComment}
                  cancelAddComment={actions.cancelAddComment}
                  addCommentEdit={actions.addCommentEdit}
                  expand={actions.expandComments}/>


      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  unboundActions: bindActionCreators(taskActions, dispatch)
});

const mapStateToProps = state => ({
  tasks: state.tasks,
  users: state.users,
  session: state.session
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
