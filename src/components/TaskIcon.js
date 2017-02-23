import React from 'react';

const rectStyle = {fill: 'grey', stroke: 'none'};

function TaskIcon({iconFormat}) {
  // in the rare case all the squares are invisible, make them all visible instead
  if(iconFormat.reduce( (memo, val) => memo+val, 0) === 0) {
    iconFormat = iconFormat.map( () => true );
  }
  const rectangles = iconFormat.map((visible, index) => {
    if(!visible) return;
    const x = (index % 3) * 11;
    const y = Math.floor(index / 3) * 11;
    return (
      <rect x={x}  y={y}  width="8" height="8" style={rectStyle} />
    );
  });
  return (
    <svg width="30" height="30" className="task-icon">
      {rectangles}
    </svg>
  );
}

export default TaskIcon;
