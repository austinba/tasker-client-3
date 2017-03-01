import { tasks, users } from './mockData';
import Promise from 'bluebird';
import R from 'ramda';

const user = 101;

// R.whereEq({
//   assignedTo: userID
// });
const tasksIveAssigned = userID => R.where({
  assignedFrom: R.equals(userID)
});

export function getMyTasks() {
  return Promise.resolve({
    tasks: R.pipe(
      R.filter(task => task.assignedTo === user),
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
  return Promise.reject('TASK_DOESNT_EXIST').delay(500);
}
export function deleteTask(taskID) {
  delete tasks[taskID];
  return Promise.resolve();
}
export function setWorkingOnStatus(taskID, workingOn) {
  const task = tasks[taskID];
  if(task) {
    task.workedOn = workingOn;
    return Promise.resolve(R.clone(task));
  }
  return Promise.reject('TASK_DOESNT_EXIST').delay(500);
}
export function addComment(taskID, comment) {
  if(tasks[taskID]) {
    const newComment = {
      commentID: Math.floor(Math.random() * 100000),
      from: user,
      date: Date.now(),
      comment
    };
    tasks[taskID].push(newComment);
    return Promise.resolve(R.clone(newComment)).delay(500);
  }
  return Promise.reject('TASK_DOESNT_EXIST').delay(500);
}

export function getUsers() {
  return Promise.resolve(users).delay(500);
}

export function getViewPreferences() {

}
export function saveViewPreferences() {

}
