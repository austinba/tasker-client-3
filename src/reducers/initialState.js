function minutesAgo(minutes) {
  return new Date(Date.now() - (minutes*60*1000))
}
function hoursAgo(hours) {
  return minutesAgo(hours * 60);
}
function daysAgo(days) {
  return hoursAgo(days * 24);
}

export const tasks = {
  '1': {
    taskID: 1,
    project: 'Ecommerce',
    description: 'Create the design of the shopping website and check in with me. I think it will take about 3 back-and-forths before ready',
    assignedTo: 'Austin Baltes',
    completed: 'no',
    dateDue: new Date(2017, 3, 2),
    importanceSeverity: 1,
    lastDateWorkedOn: Date.now(),
    departmentGoal: 'Goal #1',
    comments: [
      {
        from: 'Jiangbo Cheng',
        date: minutesAgo(10),
        comment: `Just swing by the office right now if you're free`
      },
      {
        from: 'Austin Baltes',
        date: hoursAgo(1),
        comment: `Okay, just made the first design, when do you think you'll be ready to take a look?`
      }
    ]
  },
  '2': {
    taskID: 2,
    project: 'Dragonfly',
    description: 'Make sure website is ready for deployment by March 10th',
    assignedTo: 'Wilson',
    completed: 'pending',
    dateDue: new Date(2017, 3, 10),
    importanceSeverity: 1,
    lastDateWorkedOn: Date.now(),
    departmentGoal: 'Goal #1',
    comments: [
      {
        from: 'Wilson',
        date: daysAgo(1),
        comment: `Wanted to give you a status update. Everything is on schedule except the graphic design. The designers need to update the logos to match the rebranding campaign we just had. If they aren't ready, we'll just use the old logos.`
      }
    ]
  },
  '3': {
    taskID: 3,
    project: 'Dragonfly',
    description: `We need to create tests for our logging system. Deployment of our Dragonfly system is scheduled on March 10th, so we absolutely have to have this done by then`,
    assignedTo: 'Austin Baltes',
    completed: 'no',
    dateDue: new Date(2017, 3, 10),
    importanceSeverity: 1,
    lastDateWorkedOn: Date.now(),
    departmentGoal: 'Goal #1',
    comments: [
      {
        from: 'Austin Baltes',
        date: daysAgo(1),
        comment: `Hey, just letting you know. I’m focusing on the shopping site right now, but this is well on it’s way. Wilson is doing a code review and after any modifications, we’ll be able to push the tests`
      },
      {
        from: 'Jiangbo Cheng',
        date: hoursAgo(26),
        comment: `Hey haven’t heard from you in a while, what is happening with this?`
      },
      {
        from: 'Austin Baltes',
        date: daysAgo(8),
        comment: `Okay, thanks for letting me know`
      },
      {
        from: 'Jiangbo Cheng',
        date: daysAgo(9),
        comment: `Heads up. Wilson will be the senior developer on this project now, so you can start to work with him`
      }
    ]
  }
};

export const notifications = [
  {
    type: 'confirm-completion',
    date: hoursAgo(5),
    data: {
      taskID: 2,
      description: `Make sure website is ready for deployment by March 10th`,
      assignedTo: 'Wilson'
    }
  }
];

export const statistics = {
  last30daysKPIHours: {
    'KPI #1': 113,
    'KPI #2': 18,
    'KPI #3': 261,
    'non-KPI': 60,
    'unassigned': 52
  },
  todayKPIHoursForecasted: {
    'KPI #1': 14,
    'KPI #2': 4,
    'KPI #3': 0,
    'non-KPI': 2,
    'unassigned': 2
  },
  last30daysProjectHours: {
    'Dragonfly': 360,
    'Ecommerce': 182,
    'unassigned': 18
  },
  todayProjectHoursForecasted: {
    'KPI #1': 14,
    'KPI #2': 4,
    'KPI #3': 0,
    'non-KPI': 2,
    'unassigned': 2
  }
};

export const users = [
  'Austin Baltes',
  'Wilson',
  'Jiangbo Cheng'
];

export const projects = [
  'Ecommerce',
  'Dragonfly'
];

export const departmentGoals = [
  { name: 'KPI #1' },
  { name: 'KPI #2' },
  { name: 'KPI #3' }
];
