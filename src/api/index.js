import R from 'ramda';
import request from 'superagent';

// const domain = 'http://localhost:4000';
const domain = 'http://qstesting1.us-west-2.elasticbeanstalk.com';

const parseJSON = text => JSON.parse(text, (key, value) => {
  if(key.toLowerCase().endsWith('date')) {
    return new Date(value);
  }
  return value;
})
const getBody = R.pipe(R.prop('text'), parseJSON);

export function checkIn(taskID) {
  return request
    .post(`${domain}/mockapi/checkin`)
    .send({taskID})
    .then(getBody)
    .then(R.prop('date'))
}

export function cancelCheckIn(taskID) {
  return request
    .post(`${domain}/mockapi/cancel-checkin`)
    .send({taskID})
    .then(getBody)
    .then(R.prop('date'))
}

export function getMyTasks() {
    return request
      .post(`${domain}/mockapi/get-my-tasks`)
      .send()
      .then(getBody);
}

export function getTasksIveAssigned() {
  return request
    .post(`${domain}/mockapi/get-tasks-ive-assigned`)
    .send()
    .then(getBody)
}

// server-side - if no dueDate add one - if no assignment add one
export function addTask({description, assignedTo, assignedFrom, level, dueDate}) {
  return request
    .post(`${domain}/mockapi/addTask`)
    .send({description, assignedTo, assignedFrom, level, dueDate})
    .then(getBody)
}
export function editTask(taskID, taskDetails) {
  return request
    .post(`${domain}/mockapi/editTask`)
    .send({
      taskID,
      taskDetails: R.evolve({dueDate: (d=>d.toJSON()) })(taskDetails)})
    .then(getBody);
}
export function saveComment(taskID, comment) {
  return request
    .post(`${domain}/mockapi/saveComment`)
    .send({taskID, comment})
    .then(getBody);
}
export function getUsers() {
  return request
    .post(`${domain}/mockapi/getUsers`)
    .send()
    .then(getBody);
}
export function markComplete(taskID) {
  return request
    .post(`${domain}/mockapi/markComplete`)
    .send({taskID})
    .then(getBody)
}
export function markDeleted(taskID) {
  return request
    .post(`${domain}/mockapi/markDeleted`)
    .send({taskID})
    .then(getBody)
}
export function unmarkComplete(taskID) {
  return request
    .post(`${domain}/mockapi/unmarkComplete`)
    .send({taskID})
    .then(getBody)
}
export function unmarkDeleted(taskID) {
  return request
    .post(`${domain}/mockapi/unmarkDeleted`)
    .send({taskID})
    .then(getBody)
}
