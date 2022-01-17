import { NavLink } from 'react-router-dom'

import '../compCss/Header.css'
export default function Header({ userAuthToken }) {
  return (
    <header className='page-header flex-sm-column align-items-sm-center flex-md-row'>
      <div className='header-left ms-sm-0 ms-md-5'>
        <h1 className='header-title'>Stranger's Things</h1>
      </div>
      <nav className='nav-list header-right'>
        <ul className='m-sm-0 p-sm-0'>
          <NavLink
            to='/'
            style={{ textDecoration: 'none' }}
            className='flex-sm-grow-1 flex-md-grow-0 d-flex justify-content-center text-decoration-none'
          >
            <li className='nav-items w-100 text-center'>Home</li>
          </NavLink>
          <NavLink
            to='posts'
            style={{ textDecoration: 'none' }}
            className='flex-sm-grow-1 flex-md-grow-0 d-flex justify-content-center text-decoration-none'
          >
            <li className='nav-items w-100 text-center'>Posts</li>
          </NavLink>
          {userAuthToken ? (
            <NavLink
              to='profile'
              className='flex-sm-grow-1 flex-md-grow-0 d-flex justify-content-center text-decoration-none'
            >
              <li className='nav-items w-100 text-center'>Profile</li>
            </NavLink>
          ) : (
            <NavLink
              to='login'
              style={{ textDecoration: 'none' }}
              className='flex-sm-grow-1 flex-md-grow-0 d-flex justify-content-center text-decoration-none'
            >
              <li className='nav-items w-100 text-center'>Log In</li>
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  )
}
