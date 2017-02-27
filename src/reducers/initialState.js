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
  'adding-task': {
    taskID: 'adding-task',
    importanceSeverity: 4,
    comments: [],
    edit: {}
  },
  '1': {
    taskID: 1,
    project: 'Ecommerce',
    description: 'Create the design of the shopping website and check in with me. I think it will take about 3 back-and-forths before ready',
    assignedTo: 'Austin Baltes',
    completed: 'no',
    dateDue: new Date(2017, 2, 2),
    importanceSeverity: 1,
    lastDateWorkedOn: hoursAgo(1),
    lastDateWorkedOnPendingUpdate: hoursAgo(0),
    goal: 'Goal #2',
    error: 'Failed updating working-on status',
    comments: [
      {
        commentID: 1,
        from: 'Jiangbo Cheng',
        date: minutesAgo(10),
        comment: `Just swing by the office right now if you're free`
      },
      {
        commentID: 2,
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
    dateDue: new Date(2017, 2, 1),
    importanceSeverity: 1,
    lastDateWorkedOn: hoursAgo(6),
    goal: 'Goal #1',
    edit: {
      newDescription: 'Make sure website is ready for deployment by March 10th. We need this to be in docker containers for our dev-ops team.',
      menuOpen: true
    },
    comments: [
      {
        commentID: 3,
        from: 'Wilson',
        date: daysAgo(2),
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
    dateDue: new Date(2017, 2, 10),
    importanceSeverity: 3,
    lastDateWorkedOn: daysAgo(5),
    expandComments: true,
    addComment: {
      comment: 'Aaron said he can do the tests. Would you mind reassigning to him?'
    },
    comments: [
      {
        commentID: 4,
        from: 'Austin Baltes',
        date: daysAgo(1),
        comment: `Hey, just letting you know. I’m focusing on the shopping site right now, but this is well on it’s way. Wilson is doing a code review and after any modifications, we’ll be able to push the tests`
      },
      {
        commentID: 5,
        from: 'Jiangbo Cheng',
        date: hoursAgo(26),
        comment: `Hey haven’t heard from you in a while, what is happening with this?`
      },
      {
        commentID: 6,
        from: 'Austin Baltes',
        date: daysAgo(8),
        comment: `Okay, thanks for letting me know`
      },
      {
        commentID: 7,
        from: 'Jiangbo Cheng',
        date: daysAgo(9),
        comment: `Heads up. Wilson will be the senior developer on this project now, so you can start to work with him`
      }
    ]
  },
  '4': {
    taskID: 4,
    description: `We need to create a poster for the hackathon next month -- can you take care of this? Also, let me give the okay on your idea before you have the poster made.`,
    assignedTo: 'Austin Baltes',
    completed: 'no',
    dateDue: new Date(2017, 3, 2),
    importanceSeverity: 3,
    lastDateWorkedOn: daysAgo(2),
    expandComments: false,

    comments: [
      {
        commentID: 13,
        from: 'Jiangbo Cheng',
        date: daysAgo(65),
        comment: `Don't worry, we have plenty of time. Just let me know when you have something...`
      },
      {
        commentID: 12,
        from: 'Austin Baltes',
        date: daysAgo(66),
        comment: `Okay, turns out Travis' team is doing that already. We'll have to come up with something else`
      },
      {
        commentID: 11,
        from: 'Austin Baltes',
        date: daysAgo(67),
        comment: `Jim thought on modeling it off the new Resident Evil movie poster. I think it'd be pretty cool for the event.`
      },
      {
        commentID: 10,
        from: 'Jiangbo Cheng',
        date: hoursAgo(68),
        comment: `We did that last year. Any other ideas?`
      },
      {
        commentID: 9,
        from: 'Austin Baltes',
        date: hoursAgo(70),
        comment: `I was talking to Sam, she's thinking a space / asteroids theme. What do you think?`
      },
      {
        commentID: 8,
        from: 'Jiangbo Cheng',
        date: daysAgo(3),
        comment: `Any ideas so far?`
      }
    ]
  }
};

export const taskView = {
  sortBy: 'goal'
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

export const goals = [
  { name: 'KPI #1' },
  { name: 'KPI #2' },
  { name: 'KPI #3' }
];
