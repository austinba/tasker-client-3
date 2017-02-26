import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import R from 'ramda';
import {prettyTimeElapsed} from '../utilities';
import '../styles/tasks.css';

const CommentBoxes = R.pipe(
  R.prop('comments'),
  R.take(3),
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

const Task = props => {
  const { taskID } = props;
  const task = props.tasks[taskID];
  const comments = task.comments;
  let isWorkingOn = false;

  //TODO: update with something in time zone (or another thought out way)
  if(task.lastDateWorkedOn &&
    Math.floor(Date.now()/86400000) === Math.floor(task.lastDateWorkedOn/86400000)) {
    isWorkingOn = true;
  }

  const commentCount = comments.length;
  const viewAllLink = !(commentCount > 3) ? '' :
    <div className="box task-comment"><a href="#" className="primary-link">View {commentCount - 3} more comment{commentCount > 4 ? 's' : ''}</a></div>;

  const taskDescription = !task.edit ? task.description :
    <textarea className='edit-task-description' value={task.edit.newDescription} />;

  return (
    <div className="box task-container">
      <div className="main-task-box">

        {/* Corner Graphic: Indicates if the user is working on this today */}
        <svg width="50" height="50" className={'corner-working-on-marker' + (isWorkingOn ? ' filled' : '')}>
          <path d="M 0,0 L 50,50 L 50,0 Z" />
        </svg>

        {/* Importance/Severity Box - Also shows days remaining */}
        <div className="IS-KPI-container">
          <ISBox level={task.importanceSeverity} dateDue={task.dateDue} editing={task.edit}/>
          <p className="task-goal">
            {!task.edit && task.departmentGoal}
            { task.edit && <a className="xs-right">{task.departmentGoal}<i className="fa fa-caret-down" /></a>}
          </p>
        </div>

        {/* Task Description */}
        <div className="task-description">{taskDescription}</div>
      </div>

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
        <span className="right">
          { (task.edit) &&
            <span>
              <a href="#">Cancel</a>&nbsp; -
              &nbsp; <a href="#" className="primary-link">Save</a>
            </span>
          }
          { (!task.edit && !task.addComment) &&
            <span>
              <a href="#">Delete</a>&nbsp; -
                &nbsp; <a href="#">Edit</a>&nbsp; -
                &nbsp; <a href="#">Mark&nbsp;complete</a>
            </span>
          }
        </span>
      </div>

      {/* Add Comment - Box Visible After User Selects "Add Comment" */}
      <AddComment addComment={task.addComment} />

      {/* View all - Visible if more than 3 comments */}
      {viewAllLink}

      {/* Comments - Up to 3 of the most recent comments */}
      <CommentBoxes comments={comments} />
    </div>
  );
};


const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(Task);
