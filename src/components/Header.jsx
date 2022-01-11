import { NavLink } from 'react-router-dom'

import '../compCss/Header.css'
export default function Header({ userAuthToken }) {
  return (
    <header className='page-header'>
      <div className='header-left'>
        <h1 className='header-title'>Stranger's Things</h1>
      </div>
      <nav className='nav-list header-right'>
        <ul>
          <NavLink to='/' style={{ textDecoration: 'none' }}>
            <li className='nav-items'>Home</li>
          </NavLink>
          <NavLink to='posts' style={{ textDecoration: 'none' }}>
            <li className='nav-items'>Posts</li>
          </NavLink>
          {userAuthToken ? (
            <NavLink to='profile' style={{ textDecoration: 'none' }}>
              <li className='nav-items'>Profile</li>
            </NavLink>
          ) : (
            <NavLink to='login' style={{ textDecoration: 'none' }}>
              <li className='nav-items'>Log In</li>
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  )
}
