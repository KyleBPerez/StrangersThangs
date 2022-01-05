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
          <li className='nav-items'>Profile</li>
          <li className='nav-items'>Log Out</li>
        </ul>
      </nav>
    </header>
  )
}
