import { useState } from 'react'
import { loginUser } from '../api/index'

export default function Profile({ userInfo, userAuthToken, setUserAuthToken }) {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const loginHandler = async (event) => {
    event.preventDefault()
    const userToken = await loginUser(loginUsername, loginPassword)
    setUserAuthToken(userToken)
    setLoginPassword('')
    setLoginUsername('')
  }

  if (userInfo !== null) {
    return (
      <>
        <h1>{userInfo.username} Profile</h1>
        <br />
        <h4>CREATE POST</h4>
        {userInfo.messages &&
          userInfo.messages.map((msg) => {
            return (
              <div>
                <h1>Message: </h1>
                <div>{msg}</div>
              </div>
            )
          })}
      </>
    )
  } else {
    return (
      <>
        <h1>Log in To View Your profile</h1>
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
      </>
    )
  }
}
