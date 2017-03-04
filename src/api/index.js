// import { tasks, users, checkIns } from './mockData';
// import Promise from 'bluebird';
import R from 'ramda';
// import http from 'http';
import request from 'superagent';
// request.prototype.endAsync = Promise.promisify(request.prototype.end);

// const user = 101;
// const getTaskIndex = (taskID) => R.findIndex(R.propEq('taskID', taskID))(tasks);

const parseJSON = text => JSON.parse(text, (key, value) => {
  if(key.toLowerCase().endsWith('date')) {
    return new Date(value);
  }
  return value;
})
const getBody = R.pipe(R.prop('text'), parseJSON);

export function checkIn(taskID) {
  return request
    .post('http://localhost:4000/mockapi/checkin')
    .send({taskID})
    .then(getBody)
    .then(R.prop('date'))
}

export function cancelCheckIn(taskID) {
  return request
    .post('http://localhost:4000/mockapi/cancel-checkin')
    .send({taskID})
    .then(getBody)
    .then(R.prop('date'))
}

export function getMyTasks() {
    return request
      .post('http://localhost:4000/mockapi/get-my-tasks')
      .send()
      .then(getBody);
}

export function getTasksIveAssigned() {
  return request
    .post('http://localhost:4000/mockapi/get-tasks-ive-assigned')
    .send()
    .then(getBody)
}

// server-side - if no dueDate add one - if no assignment add one
export function addTask({description, assignedTo, assignedFrom, level, dueDate}) {
  return request
    .post('http://localhost:4000/mockapi/addTask')
    .send({description, assignedTo, assignedFrom, level, dueDate})
    .then(getBody)
}
export function editTask(taskID, taskDetails) {
  return request
    .post('http://localhost:4000/mockapi/editTask')
    .send({
      taskID,
      taskDetails: R.evolve({dueDate: (d=>d.toJSON()) })(taskDetails)})
    .then(getBody);
}
export function saveComment(taskID, comment) {
  return request
    .post('http://localhost:4000/mockapi/saveComment')
    .send({taskID, comment})
    .then(getBody);
}
export function getUsers() {
  return request
    .post('http://localhost:4000/mockapi/getUsers')
    .send()
    .then(getBody);
}
export function markComplete(taskID) {
  return request
    .post('http://localhost:4000/mockapi/markComplete')
    .send({taskID})
    .then(getBody)
}
export function markDeleted(taskID) {
  return request
    .post('http://localhost:4000/mockapi/markDeleted')
    .send({taskID})
    .then(getBody)
}
export function unmarkComplete(taskID) {
  return request
    .post('http://localhost:4000/mockapi/unmarkComplete')
    .send({taskID})
    .then(getBody)
}
export function unmarkDeleted(taskID) {
  return request
    .post('http://localhost:4000/mockapi/unmarkDeleted')
    .send({taskID})
    .then(getBody)
}
