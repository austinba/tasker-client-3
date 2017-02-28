import React from 'react';

const ShowIf = ({show, children}) => <span>{show ? children : ''}</span>;
export default ShowIf;
