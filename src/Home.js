import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {

  render() {
    return (
      <div>
        <div><Link to="/create-a-team">Create a Team</Link></div>
        <div><Link to="/login">Log in</Link></div>
      </div>
    );
  }
}

export default Home;
