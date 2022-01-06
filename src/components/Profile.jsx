import { useState } from 'react'
import { loginUser } from '../api/index'
import '../compCss/Profile.css'

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

  if (Object.keys(userInfo).length > 0) {
    return (
      <div className='profile-container'>
        <h1 className='profile-name'>{userInfo.username} Profile</h1>
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
      </div>
    )
  } else {
    return (
      <div className='login-profile'>
        <form
          className='login-form'
          action='submit'
          onSubmit={(e) => loginHandler(e)}
        >
          <h1 className='login-text'>Log in To View Your profile</h1>
          <input
            className='username-input'
            placeholder='Username'
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            className='password-input'
            type='password'
            placeholder='Password'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className='login-button'>Login</button>
        </form>
      </div>
    )
  }
}
