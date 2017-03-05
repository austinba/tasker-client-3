function minutesAgo(minutes) {
  return new Date(Date.now() - (minutes*60*1000))
}
function hoursAgo(hours) {
  return minutesAgo(hours * 60);
}
function daysAgo(days) {
  return hoursAgo(days * 24);
}
export const tasks = {};

export const view = {
  menuOpen: false
}

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

export const currentUser = {
  userID: '00000000-0000-0000-0000-000000000101'
}
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
