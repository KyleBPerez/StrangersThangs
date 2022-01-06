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
        <section className='profile-head'>
          <h1 className='profile-name'>{userInfo.username}</h1>
          <section className='profile-head-stats'>
            <h5>
              Messages{' | '}
              <span className='message-count'>{userInfo.messages.length}</span>
            </h5>
            <h5>
              Posts {' | '}
              <span className='post-count'>{userInfo.posts.length}</span>
            </h5>
          </section>
        </section>
        <section className='profile-body'>
          <h2 className='view-messages'>
            Messages:{' '}
            {userInfo.messages.length > 0 &&
              userInfo.messages.map((message, idx) => {
                return <h1 key={idx}>This is where the messages go</h1>
              })}
          </h2>
          <br />
          <hr />
          <h2 className='user-posts'>
            Posts:{' '}
            {userInfo.posts.length > 0 &&
              userInfo.posts.map((post, idx) => {
                return <h1 key={idx}>This is where the posts go</h1>
              })}
          </h2>
        </section>
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
