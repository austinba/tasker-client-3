import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { prettyTimeElapsed } from '../utilities';
import '../styles/tasks.css';

import * as taskActions from '../actions/task';

const CommentBoxes = R.pipe(
  R.ifElse(
    R.prop('expand'),
    R.prop('comments'),
    R.compose(R.take(3), R.prop('comments'))
  ),
  R.map(comment => (
    <div className="box task-comment" key={comment.commentID}>
      {comment.from}: {comment.comment} - {prettyTimeElapsed(comment.date)} ago
    </div>
  )),
  result => <div>{result}</div>
);

const AddComment = R.pipe(
  R.path(['addComment', 'comment']),
  R.unless(R.not,
    comment =>
      <div className="box task-comment">
        <textarea className='add-comment-text' value={comment} />
      </div>
  ),
  R.defaultTo(<div />)
);

const isDateToday = R.eqBy(date => (new Date(date)).toDateString(), Date.now());
const bindToID = id => R.map(fn => fn.bind(null, id));
const editValIfExists =
  (defaultVal, prop) => R.compose( R.defaultTo(defaultVal),
                                   R.converge(R.defaultTo, [ R.prop(prop), R.path(['edit', prop])])
                                 );



class Task extends React.Component {
  componentWillMount () {
    const { taskID, unboundActions } = this.props;
    this.boundActions = bindToID(taskID)(unboundActions);
  }
  render() {
    const { tasks, taskID } = this.props;
    const task              = tasks[taskID];
    const { workedOn }      = task;

    const comments  = R.defaultTo([], this.props.comments);
    const goal      = R.defaultTo('No Goal', this.props.goal);
    const workingOn = isDateToday(workedOn);
    const actions   = this.boundActions;
    const level     = editValIfExists(4, 'level')(task);


    !(task.edit && task.edit.level) ? task.level : task.edit.level;
    const taskDescription = !task.edit ? task.description :
      <textarea className='edit-task-description' value={task.edit.description || ''} onChange={actions.editDescription} />;

    return (
      <div className="box task-container">
        <div className="main-task-box">
          { (task.edit && task.edit.saving) && <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{position: 'absolute', left: 'calc(50% - 25px)', top: 'calc(50% - 25px)'}}></i>}

          {/* Corner Graphic: Indicates if the user is working on this today */}
          <svg width="50" height="50" className={'corner-working-on-marker' + (workingOn ? ' filled' : '')}>
            <path d="M 0,0 L 50,50 L 50,0 Z" />
          </svg>
          { (typeof task.workedOnEditing !== 'undefined')  && <i className="fa fa-spinner fa-pulse fa-fw corner-working-on-marker-update-indicator"></i>}

          {/* Importance/Severity Box - Also shows days remaining */}
          <div className="IS-KPI-container">
            <ISBox level={level} dateDue={task.dateDue} editing={task.edit} selectLevel={actions.selectLevel}/>
            <p className="task-goal">
              {!task.edit && goal}
              { task.edit && <a className="xs-right">{goal} <i className="fa fa-caret-down" /></a>}
            </p>
          </div>

          {/* Task Description */}
          <div className="task-description">{taskDescription}</div>

        </div>
        { task.error && <div className="task-error"> {task.error} <a href="#"> (click here to report)</a></div> }

        {/* Task Actions - These change depending on the status */}
        <div className="box task-actions">

          {/* Left-hand side options */}
          { (!task.edit && !task.addComment) && <a href="#">Add comment...</a> }
          { (task.edit)                      && <span>&nbsp;</span> }
          { (task.addComment)                &&
            <span>
              <a href="#" className="primary-link">Send Comment</a> &nbsp;- &nbsp;<a href="#">Cancel</a>
            </span>
          }

          {/* Right-hand side options */}
          <span className="xs-right">
            { (task.edit) &&
              <span>
                <a href="#" onClick={actions.cancelTaskEdit}>Cancel</a>&nbsp; -
                &nbsp; <a href="#" className="primary-link">Save</a>
              </span>
            }
            { (!task.edit && !task.addComment) &&
              <span>
                <a href="#">Delete</a>&nbsp; -
                  &nbsp; <a href="#" onClick={actions.startTaskEdit}>Edit</a>&nbsp; -
                  &nbsp; <a href="#">Mark&nbsp;complete</a>
              </span>
            }
          </span>
        </div>

        {/* Add Comment - Box Visible After User Selects "Add Comment" */}
        <AddComment addComment={task.addComment} />

        {/* View all - Visible if more than 3 comments */}
        {!(comments.length > 3 && !task.expandComments) ? '' :
          <div className="box task-comment">
            <a href="#" className="primary-link" onClick={actions.expandComments}>View {comments.length - 3} more comment{comments.length > 4 ? 's' : ''}</a>
          </div>}

        {/* Comments - Up to 3 of the most recent comments */}
        <CommentBoxes comments={comments} expand={task.expandComments} />
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
