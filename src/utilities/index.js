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