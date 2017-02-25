import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import _ from 'lodash/fp';
import '../styles/tasks.css';

const Task = props => {
  const { taskID } = props;
  const task = props.tasks[taskID];
  const comments = task.comments;
  const cornerClasses = ['corner-working-on-marker'];

  //TODO: update with something in time zone (or another thought out way)
  if(task.lastDateWorkedOn &&
     Math.floor(Date.now()/86400000) === Math.floor(task.lastDateWorkedOn/86400000)) {
    cornerClasses.push('filled');
  }

  const commentBoxes = _.map(comment => (
    <div className="box task-comment" key={comment.commentID}>
      {comment.from}: {comment.comment} - {dateToTimeElapsed(comment.date)} ago
    </div>
  ))(comments);

  const taskDescription = !task.edit ? task.description :
    <textarea>{task.edit.newDescription}</textarea>;

  return (
    <div className="box task-container">
      <div className="main-task-box">
        <svg width="50" height="50" className={cornerClasses.join(' ')}>
          <path d="M 0,0 L 50,50 L 50,0 Z" />
        </svg>
        <ISBox level={task.importanceSeverity} dateDue={task.dateDue} />
        <div className="task-description">
          {taskDescription}
        </div>
      </div>
      <div className="box task-actions">
        <a href="#">Add comment...</a>
        <span className="right">
          <a href="#">Delete</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="#">Edit</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href="#">Mark&nbsp;complete</a>
        </span>
      </div>
      {commentBoxes}
    </div>
  );
};


const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(Task);

const timeSpans = [
  ['centuries', 'century', time => time/100/365.25/24/60/60/1000],
  ['decades'  , 'decade' , time => time/10/365.25/24/60/60/1000],
  ['years'    , 'year'   , time => time/365.25/24/60/60/1000],
  ['months'   , 'month'  , time => time/30.4/24/60/60/1000],
  ['weeks'    , 'week'   , time => time/7/24/60/60/1000],
  ['days'     , 'day'    , time => time/24/60/60/1000],
  ['hours'    , 'hour'   , time => time/60/60/1000],
  ['minutes'  , 'minute' , time => time/60/1000]
];

function dateToTimeElapsed(date){
  const timeElapsed = (Date.now() - date);
  for(let [pluralUnit, singularUnit, calc] of timeSpans) {
    const timeElaspedInUnit = Math.round(calc(timeElapsed));
    if (timeElaspedInUnit >= 2) {
      return `${timeElaspedInUnit} ${pluralUnit}`;
    }
    if (timeElaspedInUnit >= 1) {
      return `${timeElaspedInUnit} ${singularUnit}`;
    }
  }
  return 'just now';
}
