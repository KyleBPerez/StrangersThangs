import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../api/index'
import '../compCss/Login.css'

export default function Login({ setUserAuthToken }) {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const navigate = useNavigate()

  const loginHandler = async (event) => {
    event.preventDefault()
    const userToken = await loginUser(loginUsername, loginPassword)
    setUserAuthToken(userToken)
    navigate('/profile')
  }

  const registerHandler = async (event) => {
    event.preventDefault()
    await registerUser(registerUsername, registerPassword)
    const userToken = await loginUser(registerUsername, registerPassword)
    setUserAuthToken(userToken)
    navigate('/profile')
  }

  //created login for project u: tastyChips , p: fishyBits

  return (
    <>
      <div className='login-card'>
        <form
          className='login-form'
          action='submit'
          onSubmit={(e) => loginHandler(e)}
        >
          <h2>Log In</h2>
          <input
            placeholder='Username'
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className='login-btn'>Login</button>
        </form>
      </div>
      <div className='register-card'>
        <form
          className='register-form'
          action='submit'
          onSubmit={(e) => registerHandler(e)}
        >
          <h2>Or Sign up </h2>
          <input
            placeholder='Username'
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button className='register-btn'>Register Account</button>
        </form>
      </div>
    </>
  )
}
