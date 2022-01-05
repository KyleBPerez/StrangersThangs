import { NavLink } from 'react-router-dom'

import '../compCss/Header.css'
export default function Header(params) {
  return (
    <header className='page-header'>
      <div className='header-left'>
        <h1 className='header-title'>Stranger's Things</h1>
      </div>
      <nav className='nav-list header-right'>
        <ul>
          <NavLink to='/'>
            <li className='nav-items'>Home</li>
          </NavLink>
          <NavLink to='posts'>
            <li className='nav-items'>Posts</li>
          </NavLink>
          <NavLink to='profile'>
            <li className='nav-items'>Profile</li>
          </NavLink>
          <NavLink to='login'>
            <li className='nav-items'>Log Out</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}
