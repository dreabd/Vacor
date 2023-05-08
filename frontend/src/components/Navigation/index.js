// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser)

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {sessionUser && <Link exact to="/spots/new"> Create New Spot</Link> }
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
