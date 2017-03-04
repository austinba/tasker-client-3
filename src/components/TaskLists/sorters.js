import R from 'ramda';

export const sortByGoal = R.sortWith([
  R.descend(R.propEq('taskID', 'adding-task')),
  R.ascend(R.prop('goal')),
  R.ascend(R.prop('dueDate')),
  R.descend(R.prop('lastCheckInDate')),
  R.ascend(R.prop('level')),
  R.ascend(R.prop('project'))
]);

export const sortByImportanceSeverity = R.sortWith([
  R.descend(R.propEq('taskID', 'adding-task')),
  R.ascend(R.prop('level')),
  R.ascend(R.prop('dueDate')),
  R.descend(R.prop('lastCheckInDate')),
  R.ascend(R.prop('project')),
  R.ascend(R.prop('goal'))
]);

export const sortByProject = R.sortWith([
  R.descend(R.propEq('taskID', 'adding-task')),
  R.ascend(R.prop('project')),
  R.ascend(R.prop('dueDate')),
  R.descend(R.prop('lastCheckInDate')),
  R.ascend(R.prop('level')),
  R.ascend(R.prop('goal'))
]);
