import R from 'ramda';
import {isDateToday} from '../../utilities/';

// export const sortByGoal = R.sortWith([
//   R.ascend(R.prop('deleteDate')),
//   R.ascend(R.prop('completionDate')),
//   R.descend(R.prop('lastCheckInDate')),
//   R.descend(R.propEq('taskID', 'adding-task')),
//   R.ascend(R.prop('goal')),
//   R.descend(R.prop('dueDate')),
//   R.ascend(R.prop('level')),
//   R.ascend(R.prop('project'))
// ]);
//
// export const sortByImportanceSeverity = R.sortWith([
//   R.ascend(R.prop('deleteDate')),
//   R.ascend(R.prop('completionDate')),
//   R.descend(R.prop('lastCheckInDate')),
//   R.descend(R.propEq('taskID', 'adding-task')),
//   R.ascend(R.prop('level')),
//   R.descend(R.prop('dueDate')),
//   R.ascend(R.prop('project')),
//   R.ascend(R.prop('goal'))
// ]);

export const sortByProject =
  R.sortWith([
    R.descend(R.propEq('taskID', 'adding-task')),
    R.descend(R.compose(R.isNil, R.prop('deleteDate'))),
    R.descend(R.compose(R.isNil, R.prop('completionDate'))),
    R.descend(R.compose(isDateToday, R.prop('lastCheckInDate'))),
    R.ascend(R.prop('level')),
    R.ascend(R.compose(s=>new Date(s), R.prop('dueDate')))
  ])
