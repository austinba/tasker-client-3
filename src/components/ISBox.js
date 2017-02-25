import React from 'react';
import '../styles/tasks.css';

const ISBox = props => {
  const subBoxClasses = ['box', 'IS-sub-box'];
  if(props.level === 1 || props.level === 3) subBoxClasses.push('severe');
  if(props.level === 1 || props.level === 2) subBoxClasses.push('important');

  const daysRemaining = Math.round((props.dateDue - Date.now()) / (24*60*60*1000));

  return (
    <div className="box IS-box">
      <div className={subBoxClasses.join(' ')}>
      {daysRemaining}
      </div>
    </div>
  );
}

export default ISBox;
