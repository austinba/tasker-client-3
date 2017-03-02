import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import ShowIf from '../common/ShowIf';
import Comments from './Comments';
import TaskActionsBar from './TaskActionsBar';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { isDateToday, bindAll, dash, onActionKey } from '../../utilities';
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
    return <textarea className='edit-task-description'
                     value={props.value}
                     onChange={props.onChange}
                     onKeyDown={onActionKey(props.submitTaskEdits,
                                            props.cancelTaskEdit)} />;
  }
  return <div>{props.value}</div>
}


class Task extends React.Component {
  componentWillMount () {
    const { taskID, unboundActions } = this.props;
    this.boundActions = bindAll(taskID)(unboundActions);
  }
  render() {
    const { tasks, taskID } = this.props;
    const task = tasks[taskID];

    const comments    = R.defaultTo([], task.comments);
    const goal        = R.defaultTo('No Goal', this.props.goal);
    const checkedIn   = R.eqBy(date => new Date(date || 0).toJSON().split('T')[0],
                               new Date())(task.lastCheckIn);
    const actions     = this.boundActions;
    const level       = getEditField(4 , 'level')(task);
    const description = getEditField('', 'description')(task);

    return (
      <div className="box task-container">
        <div className="main-task-box">

          {/* Spinner while saving */}
          <ShowIf show={task.edit && task.edit.saving}>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw task-saving-spinner" />
          </ShowIf>

          {/* CheckedIn Corner Flap */}
          <a href="#nowhere"
             onClick={checkedIn ? actions.cancelCheckIn : actions.checkIn}>

             <svg width="50" height="50" className={'corner-checked-in-marker' +
               (checkedIn ? ' filled' : '')}
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
                   dateDue={task.dateDue}
                   editing={task.edit}
                   selectLevel={actions.selectLevel}
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
            <TaskDescription value={description}
                             editing={!!task.edit}
                             onChange={actions.editDescription}
                             cancelTaskEdit={actions.cancelTaskEdit}
                             submitTaskEdits={actions.submitTaskEdits} />
          </div>
        </div>

        <ShowIf show={task.error}>
          <div className="task-error">
            &nbsp;{task.error}&nbsp;
            <a href="#nowhere"> (click here to report)</a>
          </div>
        </ShowIf>

        <TaskActionsBar edit={task.edit}
                        commentBeingAdded={task.commentBeingAdded}
                        addComment={actions.addComment}
                        cancelAddComment={actions.cancelAddComment}
                        startTaskEdit={actions.startTaskEdit}
                        cancelTaskEdit={actions.cancelTaskEdit}
                        submitTaskEdits={actions.submitTaskEdits} />

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
  tasks: state.tasks
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);