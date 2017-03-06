import R from 'ramda';
import request from 'superagent';
import * as auth from '../auth';

const domain = 'http://localhost:4000';
// const domain = 'http://qstesting1.us-west-2.elasticbeanstalk.com';
// const domain = 'https://api.quarterstretch.com';

const parseJSON = text => JSON.parse(text, (key, value) => {
  if(key.toLowerCase().endsWith('date')) {
    return new Date(value);
  }
  return value;
})
const getBody = R.pipe(R.prop('text'), parseJSON);

export function signin(username, teamdomain, password) {
  return request
    .post(`${domain}/login`)
    .send({username, teamdomain, password})
    .then(getBody)
}

export function getMyInfo(jwtToken) {
  return request
    .post(`${domain}/myinfo`)
    .set('authorization', auth.getToken())
    .send({jwtToken})
    .then(getBody)
}

export function checkIn(taskID) {
  return request
    .post(`${domain}/tasks/checkin`)
    .set('authorization', auth.getToken())
    .send({taskID})
    .then(getBody)
    .then(R.prop('date'))
}

export function cancelCheckIn(taskID) {
  return request
    .post(`${domain}/tasks/cancel-checkin`)
    .set('authorization', auth.getToken())
    .send({taskID})
    .then(getBody)
    .then(R.prop('date'))
}

export function getMyTasks() {
    return request
      .post(`${domain}/tasks/get-my-tasks`)
      .set('authorization', auth.getToken())
      .send()
      .then(getBody);
}

export function getTasksIveAssigned() {
  return request
    .post(`${domain}/tasks/get-tasks-ive-assigned`)
    .set('authorization', auth.getToken())
    .send()
    .then(getBody)
}

// server-side - if no dueDate add one - if no assignment add one
export function addTask({description, assignedTo, assignedFrom, level, dueDate}) {
  return request
    .post(`${domain}/tasks/addTask`)
    .set('authorization', auth.getToken())
    .send({description, assignedTo, assignedFrom, level, dueDate})
    .then(getBody)
}
export function editTask(taskID, taskDetails) {
  return request
    .post(`${domain}/tasks/editTask`)
    .set('authorization', auth.getToken())
    .send({
      taskID,
      taskDetails: R.evolve({dueDate: (d=>d.toJSON()) })(taskDetails)})
    .then(getBody);
}
export function saveComment(taskID, comment) {
  return request
    .post(`${domain}/tasks/saveComment`)
    .set('authorization', auth.getToken())
    .send({taskID, comment})
    .then(getBody);
}
export function getUsers() {
  return request
    .post(`${domain}/users/getUsers`)
    .set('authorization', auth.getToken())
    .send()
    .then(getBody);
}
export function markComplete(taskID) {
  return request
    .post(`${domain}/tasks/markComplete`)
    .set('authorization', auth.getToken())
    .send({taskID})
    .then(getBody)
}
export function markDeleted(taskID) {
  return request
    .post(`${domain}/tasks/markDeleted`)
    .set('authorization', auth.getToken())
    .send({taskID})
    .then(getBody)
}
export function unmarkComplete(taskID) {
  return request
    .post(`${domain}/tasks/unmarkComplete`)
    .set('authorization', auth.getToken())
    .send({taskID})
    .then(getBody)
}
export function unmarkDeleted(taskID) {
  return request
    .post(`${domain}/tasks/unmarkDeleted`)
    .set('authorization', auth.getToken())
    .send({taskID})
    .then(getBody)
}
