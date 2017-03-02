import { tasks, users, checkIns } from './mockData';
import Promise from 'bluebird';
import R from 'ramda';

const user = 101;

// R.whereEq({
//   assignedTo: userID
// });

export function checkIn(taskID) {
  const now = new Date();
  const taskCheckIns = checkIns[taskID];
  if(!taskCheckIns) {
    checkIns[taskID] = [now];
    return Promise.resolve(now).delay(500);
  }
  const mostRecent = taskCheckIns[0];
  const mostRecentDateString = new Date(mostRecent || 0).toJSON().split('T')[0];
  const nowDateString = now.toJSON().split('T')[0];
  if(nowDateString === mostRecentDateString) {
    delete taskCheckIns[0];
  }
  taskCheckIns.unshift(now);
  return Promise.resolve(now).delay(500);
}

export function cancelCheckIn(taskID) {
  const now = new Date();
  const taskCheckIns = checkIns[taskID];
  if(!taskCheckIns) {
    checkIns[taskID] = [now];
    return Promise.resolve(0).delay(500);
  }
  const mostRecent = taskCheckIns[0];
  const mostRecentDateString = new Date(mostRecent || 0).toJSON().split('T')[0];
  const nowDateString = now.toJSON().split('T')[0];
  if(nowDateString === mostRecentDateString) {
    delete taskCheckIns[0];
  }
  return Promise.resolve(taskCheckIns[0] || 0).delay(500);

}

export function getMyTasks() {
  return Promise.resolve({
    tasks: R.pipe(
      R.filter(task => task.assignedTo === user),
      R.map(task => console.log(checkIns, task.taskID) ||
        R.assoc( 'lastCheckIn',
                 R.reduce(R.max, 0, R.defaultTo([], checkIns[task.taskID])),
                  task)
      ),
      R.map(R.evolve({ comments: R.sortWith([R.descend(R.prop('date'))]) })),
      R.indexBy(R.prop('taskID')),
      R.clone
    )(tasks),

    users: R.pipe(
      R.filter(task => task.assignedTo === user),
      R.map(task => [ task.assignedTo,
                      task.assignedFrom,
                      R.map(comment => comment.from)(task.comments)]),
      R.flatten,
      R.reject(R.isNil),
      R.dropRepeats,
      R.map(userID => R.find(R.propEq('userID', userID))(users)),
      R.indexBy(R.prop('userID')),
      R.clone
    )(tasks)
  }).delay(500);
}
export function getTasksIveAssigned() {
  return Promise.resolve({
    tasks: R.pipe(
      R.filter(task => task.assignedFrom === user),
      R.map(task =>
        R.assoc( 'lastCheckIn',
                 R.reduce(R.max, 0, R.defaultTo([], checkIns[task.taskID])),
                  task)
      ),
      R.indexBy(R.prop('taskID')),
      R.clone
      )(tasks),
    users: R.pipe(
      R.filter(task => task.assignedFrom === user),
      R.map(task => [ task.assignedTo,
                      task.assignedFrom,
                      R.map(comment => comment.from)(task.comments)]),
      R.flatten,
      R.reject(R.isNil),
      R.dropRepeats,
      R.map(userID => R.find(R.propEq('userID', userID))(users)),
      R.indexBy(R.prop('userID')),
      R.clone
    )(tasks)
  }).delay(500);
}
export function addTask({description, assignedTo, assignedFrom, level, dueDate}) {
  const newTask = {
    taskID: Math.floor(Math.random() * 100000),
    assignedTo,
    assignedFrom,
    level,
    dueDate
  }
  tasks.push(newTask);
  return Promise.resolve(R.clone(newTask)).delay(500);
}
export function editTask(taskID, {description, assignedTo, assignedFrom, level, dueDate}) {
  const task = tasks[taskID];
  if(task) {
    if(description) task.description = description;
    if(assignedTo) task.assignedTo = assignedTo;
    if(assignedFrom) task.assignedFrom = assignedFrom;
    if(level) task.level = level;
    if(dueDate) task.dueDate = dueDate;
    return Promise.resolve(R.clone(task)).delay(500);
  }
  return Promise.reject().delay(500);
}
export function deleteTask(taskID) {
  delete tasks[taskID];
  return Promise.resolve();
}
export function saveComment(taskID, comment) {
  const taskIndex = R.findIndex(R.propEq('taskID', taskID))(tasks);
  if(!taskIndex === -1) {
    return Promise.reject().delay(500)
  };
  const newComment = {
    commentID: Math.floor(Math.random() * 100000),
    from: user,
    date: Date.now(),
    comment
  }
  tasks[taskIndex].comments.push(newComment);
  return Promise.resolve(R.clone(newComment)).delay(500);
}
export function getUsers() {
  return Promise.resolve(users).then(R.indexBy(R.prop('userID'))).delay(500);
}

export function getViewPreferences() {

}
export function saveViewPreferences() {

}
