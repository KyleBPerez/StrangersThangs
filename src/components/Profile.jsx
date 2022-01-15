import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { /* deletePost, */ fetchUserInfo } from '../api/index'
import { DeleteBtn } from './DeleteBtn'
import '../compCss/Profile.css'

export default function Profile({
  userInfo: { username, posts, messages, _id },
  setUserInfo,
  userAuthToken,
  setUserAuthToken,
}) {
  const [usersPosts, setUsersPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserInfo(userAuthToken).then((user) => setUserInfo(user))
  }, [setUserInfo, userAuthToken])

  useEffect(() => {
    setUsersPosts(posts.filter((post) => post.active === true))
  }, [posts])

  return (
    _id && (
      <div className='profile-container'>
        <section className='profile-head w-100'>
          <h1 className='profile-name'>{username}</h1>
          <section className='profile-head-stats'>
            <h5>
              Messages{' | '}
              <span className='post-count'>{messages.length}</span>
            </h5>
            <h5>
              Posts {' | '}
              <span className='post-count'>{usersPosts.length}</span>
            </h5>
          </section>
          <Container className='d-flex gap-3 justify-content-center'>
            <Link to={`${username}/messages`} className='w-10'>
              <Button>Go to messages</Button>
            </Link>
            <div>
              <Button
                className='log-out-btn d-flex justify-content-center align-items-center w-100'
                onClick={() => {
                  window.localStorage.removeItem('token')
                  setUserAuthToken('')
                  navigate('/login')
                }}
              >
                Log Out
              </Button>
            </div>
          </Container>
        </section>
        <section className='profile-body'>
          <hr />
          <section className='profile-posts'>
            <Link to={`${username}/create-post`}>
              <button className='new-post-btn'>Create New Post</button>
            </Link>
            <h2 className='user-posts'>Posts:</h2>
            <section className='user-posts-container'>
              {usersPosts &&
                usersPosts.map((post, idx) => {
                  return (
                    <div
                      className='profile-post-card post-card'
                      key={`${idx}-${post.title}`}
                    >
                      <div>
                        <h1 className='post-title'>{post.title}</h1>
                        <h3 className='post-location'>
                          Location:{' '}
                          <span className='post-highlight'>
                            {post.location}
                          </span>
                        </h3>
                        <h4 className='post-price'>
                          Price:{' '}
                          <span className='post-highlight'>{post.price}</span>
                        </h4>
                        <p className='post-description'>{post.description}</p>
                        <p>
                          {post.willDeliver
                            ? `I'll come to you!`
                            : `This ain't delivery it's DiGiorno!`}
                        </p>
                      </div>
                      <aside className='user-post-info'>
                        <section className='posters-name'>
                          <p className='post-by'>
                            Posted by{' '}
                            <span className='post-highlight'>{username}</span>
                          </p>
                        </section>
                        <section className='user-post-btns'>
                          <DeleteBtn
                            posts={posts}
                            post={post}
                            userAuthToken={userAuthToken}
                            setUserInfo={setUserInfo}
                            setUsersPosts={setUsersPosts}
                          />
                          <Link to={`${username}/edit-post/${post._id}`}>
                            <button className='edit-post-btn'>Edit</button>
                          </Link>
                        </section>
                      </aside>
                    </div>
                  )
                })}
            </section>
          </section>
        </section>
      </div>
    )
  )
}
