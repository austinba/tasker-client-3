import React from 'react';
import { connect } from 'react-redux';
import ISBox from './ISBox';
import _ from 'lodash/fp';
import '../styles/tasks.css';
import 'material-design-icons/iconfont/material-icons.css';

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
    <div className="box task-comment">
      {comment.from}: {comment.comment} - 1 hr ago
    </div>
  ))(comments);

  return (
    <div className="box task-container">
      <div className="main-task-box">
        <svg width="50" height="50" className={cornerClasses.join(' ')}>
          <path d="M 0,0 L 50,50 L 50,0 Z" />
        </svg>
        <ISBox level={task.importanceSeverity} dateDue={task.dateDue} />
        <div className="task-description">
          {task.description}
        </div>
      </div>
      <div className="box task-actions">
        Add comment...
        <span className="right">
          Delete&nbsp;&nbsp;-&nbsp;&nbsp;Edit&nbsp;&nbsp;-&nbsp;&nbsp;Mark&nbsp;complete
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
