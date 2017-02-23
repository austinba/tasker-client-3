const initialState = {
  taskDetails: {
    '2': {
      title: 'Create Backend',
      assignedTo: 'AB', // eventually this will be a userID
      workingOnToday: true,
      hoursWorked: 2,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 1,
      isCompleted: false,
      expanded: true
    },
    '3': {
      title: 'Create Frontend',
      assignedTo: 'AB',
      workingOnToday: true,
      hoursWorked: 1,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 1,
      isCompleted: false,
      expanded: true,
    },
    '4': {
      title: 'Create Authentication System',
      assignedTo: 'MJ',
      workingOnToday: true,
      hoursWorked: 14,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 2,
      isCompleted: false
    },
    '5': {
      title: 'Implement ORM',
      assignedTo: 'TS',
      workingOnToday: true,
      hoursWorked: 3,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 2,
      isCompleted: false
    },
    '6': {
      title: 'Insert Endpoints',
      assignedTo: 'TS',
      workingOnToday: false,
      hoursWorked: 0,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 2,
      isCompleted: false
    },
    '7': {
      title: 'Configure Redux',
      assignedTo: 'AB',
      workingOnToday: false,
      hoursWorked: 3,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 3,
      isCompleted: false,
      expanded: false
    },
    '8': {
      title: 'Build Mockup',
      assignedTo: 'NT',
      workingOnToday: false,
      hoursWorked: 8,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 3,
      isCompleted: true
    },
    '9': {
      title: 'Design Page Graphics',
      assignedTo: 'NT',
      workingOnToday: false,
      hoursWorked: 19,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 8,
      isCompleted: true
    },
    '10': {
      title: 'HTML and CSS Work',
      assignedTo: 'TS',
      workingOnToday: false,
      hoursWorked: 14,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 8,
      isCompleted: true
    },
    '11': {
      title: 'Interactive Elements',
      assignedTo: 'AB',
      workingOnToday: false,
      hoursWorked: 4,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 8,
      isCompleted: true
    },
    '12': {
      title: 'Writing Reducers',
      assignedTo: 'SF',
      workingOnToday: true,
      hoursWorked: 21,
      iconFormat: [...Array(9)].map(() => (Math.random() >= 0.5)),
      parentID: 7,
      isCompleted: false
    }
  },
  taskHierarchy: [
    { taskID: 2, children: [
      { taskID: 4 },
      { taskID: 5 },
      { taskID: 6 }
    ]},
    { taskID: 3, children: [
      { taskID: 7, children: [
        { taskID: 9 },
        { taskID: 10 },
        { taskID: 11 }
      ]},
      { taskID: 8, children: [
        { taskID: 9 },
        { taskID: 10 },
        { taskID: 11 }
      ]}
    ]}
  ]
};


export default initialState;
