import R from 'ramda';
import React from 'react';
import Task from '../Task/Task';

const SortedTasks = ({tasks, sortBy, preset}) =>
  R.pipe(
    R.values,
    sortBy,
    R.map(task =>
      <Task taskID={task.taskID} key={'task-' + task.taskID} preset={preset} />),
    taskElements => <div>{taskElements}</div>
  )(tasks);

export default SortedTasks;
