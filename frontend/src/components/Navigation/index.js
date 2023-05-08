// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser)

  return (
    <nav >
      <ul className='nav-ul'>
        <li className='home-link'>
          <NavLink style={{textDecoration:"none",color:"#FF5A5F",cursor:"pointer"}}exact to="/">
            <i class="fa-brands fa-airbnb fa-flip-vertical"></i><span>acor</span>
          </NavLink>
        </li>
        {isLoaded && (
          <li className='newSpot-profile-container'>
            {sessionUser &&  <NavLink style={{textDecoration:"none",cursor:"pointer"}} exact to="/spots/new"> Create New Spot</NavLink>}
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>


    </nav>
  );
}

export default Navigation;
