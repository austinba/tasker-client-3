import React from 'react';
import _ from 'lodash/fp';
_.map = _.map.convert({ 'cap': false }); // fixes lodash issue of not passing in key
import '../styles/tasks.css';

const subBoxes = [
  ({daysRemaining}) => <div className="box IS-sub-box important severe">{daysRemaining}</div>,
  ({daysRemaining}) => <div className="box IS-sub-box important">{daysRemaining}</div>,
  ({daysRemaining}) => <div className="box IS-sub-box severe">{daysRemaining}</div>,
  ({daysRemaining}) => <div className="box IS-sub-box important severe">{daysRemaining}</div>
];

const subBoxClassesByLevel = {
  '1': ['box', 'IS-sub-box', 'important', 'severe'],
  '2': ['box', 'IS-sub-box', 'important'],
  '3': ['box', 'IS-sub-box', 'severe'],
  '4': ['box', 'IS-sub-box'],
}

const ISBox = props => {
  const subBoxClasses = ['box', 'IS-sub-box'];

  const daysRemaining = Math.round((props.dateDue - Date.now()) / (24*60*60*1000));

  let subBoxes;
  if(!props.isEditing) {
    subBoxes = <div className={subBoxClassesByLevel[props.level].join(' ')}>{daysRemaining}</div>;
  } else {
    subBoxes = _.map((classes, level) => {
      if (level == props.level) return <div className={classes.join(' ')}>{daysRemaining}</div>
      return <div className={_.concat(classes, ['unselected']).join(' ')} />
    })(subBoxClassesByLevel);
  }

  const ISBoxClasses = ['box', 'IS-box'];
  if(props.isEditing) ISBoxClasses.push('edit-task');

  return (
    <div className={ISBoxClasses.join(' ')}>
      {subBoxes}
    </div>
  );
}

export default ISBox;
