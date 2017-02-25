import React from 'react';
import '../styles/tasks.css';

const ISBox = props => {
  const subBoxClasses = ['IS-sub-box'];
  if(props.level === 1 || props.level === 3) subBoxClasses.push('severe');
  if(props.level === 1 || props.level === 2) subBoxClasses.push('important');

  return (
    <div className="IS-box">
      <div className={subBoxClasses.join(' ')}>
      </div>
    </div>
  );
}

export default ISBox;
