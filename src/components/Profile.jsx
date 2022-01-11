import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deletePost, fetchUserInfo } from '../api/index'
import '../compCss/Profile.css'

export default function Profile({
  userInfo,
  setUserInfo,
  userAuthToken,
  setUserAuthToken,
}) {
  const [usersPosts, setUsersPosts] = useState([])
  const [userMessages, setUserMessages] = useState([])
  const navigate = useNavigate()

  const deletePostHandler = async (postId) => {
    await deletePost(userAuthToken, postId)
    const updateUserInfo = await fetchUserInfo(userAuthToken)
    setUserInfo(updateUserInfo)
    const newPosts = userInfo.posts.filter((post) => post.active === true)
    setUsersPosts(newPosts)
  }

  useEffect(() => {
    setUsersPosts(userInfo.posts.filter((post) => post.active === true))
  }, [userInfo.posts])

  return (
    <div className='profile-container'>
      <section className='profile-head'>
        <h1 className='profile-name'>{userInfo.username}</h1>
        <section className='profile-head-stats'>
          <h5>
            Messages{' | '}
            <span className='message-count'>{userMessages.length}</span>
          </h5>
          <h5>
            Posts {' | '}
            <span className='post-count'>{usersPosts.length}</span>
          </h5>
          <button
            onClick={() => {
              window.localStorage.removeItem('token')
              setUserAuthToken('')
              navigate('/login')
            }}
          >
            Log Out
          </button>
        </section>
      </section>
      <section className='profile-body'>
        <h2 className='view-messages'>Messages:</h2>
        {userMessages.length > 0 &&
          userMessages.map((message, idx) => {
            return <h1 key={idx}>This is where the messages go</h1>
          })}
        <hr />
        <section className='profile-posts'>
          <Link to={`${userInfo.username}/create-post`}>
            <button className='new-post-btn'>Create New Post</button>
          </Link>
          <h2 className='user-posts'>Posts:</h2>
          <section className='user-posts-container'>
            {usersPosts &&
              usersPosts.map((post, idx) => {
                return (
                  <div key={`${idx}-${post.title}`}>
                    <div className='post-card'>
                      <h1 className='post-title'>{post.title}</h1>
                      <h4 className='post-price'>Price: {post.price}</h4>
                      <p className='post-description'>{post.description}</p>
                      <p>
                        {post.willDeliver
                          ? `I'll come to you!`
                          : `This ain't delivery it's DiGiorno!`}
                      </p>
                      <p className='post-by'>
                        Posted by{' '}
                        <span className='post-user'>{userInfo.username}</span>
                      </p>
                    </div>
                    <button onClick={() => deletePostHandler(post._id)}>
                      Delete
                    </button>
                    <button>Edit?</button>
                  </div>
                )
              })}
          </section>
        </section>
      </section>
    </div>
  )
}
