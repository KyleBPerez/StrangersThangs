import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../api/index'
import '../compCss/Profile.css'

export default function Profile({ userInfo, userAuthToken, setUserAuthToken }) {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  console.log(userInfo)

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
          <h2 className='view-messages'>Messages:</h2>
          {userInfo.messages.length > 0 &&
            userInfo.messages.map((message, idx) => {
              return <h1 key={idx}>This is where the messages go</h1>
            })}
          <hr />
          <section className='profile-posts'>
            <Link to={`${userInfo.username}/create-post`}>
              <button className='new-post'>Create New Post</button>
            </Link>
            <h2 className='user-posts'>Posts:</h2>
            {userInfo.posts.length > 0 &&
              userInfo.posts.map((post, idx) => {
                return (
                  <div key={`${idx}-${post.title}`}>
                    <div className='post-card'>
                      <h1 className='post-title'>{post.title}</h1>
                      <h4 className='post-price'>Price: {post.price}</h4>
                      <p className='post-description'>{post.description}</p>
                      <p className='post-by'>
                        Posted by{' '}
                        <span className='post-user'>{userInfo.username}</span>
                      </p>
                    </div>
                  </div>
                )
              })}
          </section>
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
