import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { prettyTimeElapsed, isDateToday, bindAll, dash } from '../utilities';
import '../styles/tasks.css';
import * as taskActions from '../actions/task';

/** getEditField(defaultValue, property, object)
    defaluts to task[prop] is task.edit[prop] doesn't exist  */
const getEditField =
  (defaultVal, prop) => R.compose( R.defaultTo(defaultVal),
                                   R.converge(R.defaultTo,
                                              [ R.prop(prop),
                                                R.path(['edit', prop])
                                              ]));

const ShowIf = ({show, children}) => <span>{show ? children : ''}</span>;

const TaskDescription = props => {
  if(props.editing) {
    return <textarea className='edit-task-description'
                     value={props.value}
                     onChange={props.onChange} />;
  }
  return <div>{props.value}</div>
}



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


class Task extends React.Component {
  componentWillMount () {
    const { taskID, unboundActions } = this.props;
    this.boundActions = bindAll(taskID)(unboundActions);
  }
  render() {
    const { tasks, taskID } = this.props;
    const task = tasks[taskID];
    const { workedOn, edit, error, addComment } = task;

    const isEditing   = !!edit;
    const comments    = R.defaultTo([], task.comments);
    const goal        = R.defaultTo('No Goal', this.props.goal);
    const workingOn   = isDateToday(workedOn);
    const actions     = this.boundActions;
    const level       = getEditField(4 , 'level')(task);
    const description = getEditField('', 'description')(task);

    const viewMoreCommentsText =
      'View ' + (comments.length - 3) +
      ' more comment' + ((comments.length > 4) ? 's' : '');


    return (
      <div className="box task-container">
        <div className="main-task-box">

          {/* Spinner while saving */}
          <ShowIf show={edit && edit.saving}>
            <i className=
              "fa fa-spinner fa-pulse fa-3x fa-fw task-saving-spinner" />
          </ShowIf>

          {/* Is-Working-On Corner Flap */}
          <svg width="50" height="50" className={'corner-working-on-marker' +
                                                 (workingOn ? ' filled' : '')}
          >
            <path d="M 0,0 L 50,50 L 50,0 Z" />
          </svg>
          <ShowIf show={R.has('workingOnUpdatePending', task)}>
            <i className="fa fa-spinner fa-pulse fa-fw working-on-spinner"></i>
          </ShowIf>

          {/* Importance/Severity Box - Also shows days remaining */}
          <div className="IS-KPI-container">
            <ISBox level={level}
                   dateDue={task.dateDue}
                   editing={task.edit}
                   selectLevel={actions.selectLevel}
            />
            <p className="task-goal">
              <ShowIf show={!task.edit}>{goal}</ShowIf>
              <ShowIf show={ task.edit}>
                <a className="xs-right">{goal}&nbsp;
                  <i className="fa fa-caret-down" />
                </a>
              </ShowIf>
            </p>
          </div>

          {/* Task Description */}

          <div className="task-description">
            <TaskDescription value={description}
                             editing={isEditing}
                             onChange={actions.editDescription} />
          </div>

        </div>
        <ShowIf show={error}>
          <div className="task-error">
            &nbsp;{task.error}&nbsp;
            <a href="#nowhere"> (click here to report)</a>
          </div>
        </ShowIf>

        {/* Task Actions - These change depending on the status */}
        <div className="box task-actions">

          <ShowIf show={addComment}>
            <span>
              <a href="#nowhere" className="primary-link">Send Comment</a>
              {dash}
              <a href="#nowhere">Cancel</a>
            </span>
          </ShowIf>

          <ShowIf show={edit}>
            &nbsp;
            <span className="xs-right">
              <a href="#nowhere" onClick={actions.cancelTaskEdit}>Cancel</a>
              {dash}
              <a href="#nowhere" className="primary-link"
                 onClick={actions.submitTaskEdits}>Save</a>
            </span>
          </ShowIf>

          <ShowIf show={!edit && !addComment}>
            <a href="#nowhere">Add comment...</a>
            <span className="xs-right">
              <span>
                <a href="#nowhere">Delete</a>
                {dash}
                <a href="#nowhere" onClick={actions.startTaskEdit}>Edit</a>
                {dash}
                <a href="#nowhere">Mark&nbsp;complete</a>
              </span>
            </span>
          </ShowIf>

        </div>

        {/* Add Comment - Box Visible After User Selects "Add Comment" */}
        <AddComment addComment={task.addComment} />

        {/* View all - Visible if more than 3 comments */}
        <ShowIf show={comments.length > 3 && !task.expandComments}>
          <div className="box task-comment">
            <a href="#nowhere" className="primary-link"
              onClick={actions.expandComments}>
              {viewMoreCommentsText}
            </a>
          </div>
        </ShowIf>
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
