import R from 'ramda';
import React from 'react';

const timeSpans = [
  ['centuries', 'century', time => time/100/365.25/24/60/60/1000],
  ['decades'  , 'decade' , time => time/10/365.25/24/60/60/1000],
  ['years'    , 'year'   , time => time/365.25/24/60/60/1000],
  ['months'   , 'month'  , time => time/30.4/24/60/60/1000],
  ['weeks'    , 'week'   , time => time/7/24/60/60/1000],
  ['days'     , 'day'    , time => time/24/60/60/1000],
  ['hours'    , 'hour'   , time => time/60/60/1000],
  ['minutes'  , 'minute' , time => time/60/1000]
];

export function prettyTimeElapsed(date){
  const timeElapsed = (Date.now() - date);
  for(let [pluralUnit, singularUnit, calc] of timeSpans) {
    const timeElaspedInUnit = Math.round(calc(timeElapsed));
    if (timeElaspedInUnit >= 2) {
      return `${timeElaspedInUnit} ${pluralUnit}`;
    }
    if (timeElaspedInUnit >= 1) {
      return `${timeElaspedInUnit} ${singularUnit}`;
    }
  }
  return 'just now';
}

/** isDateToday(date) */
export const isDateToday = R.eqBy(date => (new Date(date)).toDateString(), Date.now());

/** bindAll(id, objectOfFunctions) */
export const bindAll = id => R.map(fn => fn.bind(null, id));

export const dash = <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>;
export const bar  = <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>;

export const fullName = users => userID => {
  if(!users || !users[userID]) return 'Unknown User';
  const firstName = R.defaultTo('', users[userID].firstName);
  const lastName  = R.defaultTo('', users[userID].lastName );
  return firstName + ' ' + lastName;
}

export const onActionKey = (enterCallback, escCallback) => event => {
  if(event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    enterCallback && enterCallback(event);
  } else if(event.keyCode === 27) {
    event.preventDefault();
    escCallback && escCallback(event);
  }
}
