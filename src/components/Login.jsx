import { useState } from 'react'
import { registerUser, loginUser } from '../api/index'
import '../compCss/Login.css'

export default function Login({ setUserAuthToken }) {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const loginHandler = async (event) => {
    event.preventDefault()
    const userToken = await loginUser(loginUsername, loginPassword)
    setUserAuthToken(userToken)
    setLoginPassword('')
    setLoginUsername('')
  }

  const registerHandler = async (event) => {
    event.preventDefault()
    const userToken = await registerUser(registerUsername, registerPassword)
    setUserAuthToken(userToken)
    setRegisterPassword('')
    setRegisterUsername('')
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
          <button>Login</button>
        </form>
      </div>
      <div className='register-card'>
        <form
          className='register-form'
          action='submit'
          onSubmit={(e) => registerHandler(e)}
        >
          <h2>Sign Up</h2>
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
          <button>Register Account</button>
        </form>
      </div>
    </>
  )
}
