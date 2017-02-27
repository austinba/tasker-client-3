import React from 'react';
import _ from 'lodash/fp';
_.map = _.map.convert({ 'cap': false }); // fixes lodash issue of not passing in key
import { Menu, MenuItem, MenuItemText } from './common/Menu';
import '../styles/tasks.css';
import DatePicker from 'react-bootstrap-date-picker';


const subBoxClassesByLevel = {
  '1': ['box', 'IS-sub-box', 'important', 'severe'],
  '2': ['box', 'IS-sub-box', 'important'],
  '3': ['box', 'IS-sub-box', 'severe'],
  '4': ['box', 'IS-sub-box'],
}

const ISBoxContainer = props => {
  return (
    <div className={'box IS-box' + (props.editing ? ' edit-task' : '')}>
      {props.children}
    </div>
  );
}

const ISBox = props => {
    const daysRemaining = props.dateDue ? Math.round((props.dateDue - Date.now()) / (24*60*60*1000)) : 0;
    // If Not Editing
    if(!props.editing) {
      return (
        <ISBoxContainer>
          <div className={subBoxClassesByLevel[props.level].join(' ')}>{daysRemaining}</div>
        </ISBoxContainer>
      );
    }

    // If Editing
    let menu = '';
    if(props.editing.menuOpen) {
      menu = (!props.editing || !props.editing.menuOpen) ? '' :
        <Menu>
          <MenuItemText text={'Due Date: ' + (props.dateDue || new Date()).toLocaleDateString()} />
          <MenuItem text="Edit Date" />
          <MenuItem text="Cancel" />
        </Menu>
    }
    const selectLevel = props.selectLevel;
    const subBoxes = _.map((classes, level) => {
      if (level === props.level.toString()) {
        return <div className={classes.join(' ')} key={level}>{menu}{daysRemaining}</div>;
      }
      return <div className={classes.join(' ') + ' unselected'} key={level} onClick={selectLevel.bind(null, level)} />;
    })(subBoxClassesByLevel);
    return (
      <ISBoxContainer editing>
        {subBoxes}
      </ISBoxContainer>
    );

}

export default ISBox;
