import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { fetchUserInfo } from '../api/index'
import { DeleteBtn } from './DeleteBtn'
import { LoadingPage } from './LoadingPage'
import '../compCss/Profile.css'

export default function Profile({
  userInfo: { username, posts, messages, _id },
  setPosts,
  setOgPosts,
  setUserInfo,
  userAuthToken,
  setUserAuthToken,
}) {
  const [usersPosts, setUsersPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (userAuthToken)
      fetchUserInfo(userAuthToken).then((user) => setUserInfo(user))
  }, [setUserInfo, userAuthToken])

  useEffect(() => {
    posts
      ? setUsersPosts(posts.filter((post) => post.active === true))
      : setUsersPosts([])
  }, [posts])

  const messageCount = () => {
    const recivedMsg = messages.filter(
      ({ fromUser: { _id: posterId } }) => posterId !== _id
    )
    return recivedMsg
  }

  if (!messages) return <LoadingPage />

  return (
    <div className='profile-container'>
      <section className='profile-head w-100'>
        <h1 className='profile-name'>{username}</h1>
        <section className='profile-head-stats'>
          <h5>
            Messages{' | '}
            <span className='msg-post-count p-1 rounded-pill'>
              {messageCount().length}
            </span>
          </h5>
          <h5>
            Posts {' | '}
            <span className='msg-post-count p-1 rounded-pill'>
              {usersPosts.length}
            </span>
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
                navigate('/')
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
            <Button className='new-post-btn'>Create New Post</Button>
          </Link>
          <h2 className='user-posts'>Your Posts:</h2>
          <section className='user-posts-container align-items-center'>
            {usersPosts &&
              usersPosts.map((post, idx) => {
                return (
                  <div className=' post-card' key={`${idx}-${post.title}`}>
                    <h1
                      id='profile-post-title'
                      className='card-header bg-secondary mb-3'
                    >
                      {post.title}
                    </h1>
                    <Container
                      id='profile-card-body'
                      className='card-body pb-0 d-flex flex-column'
                    >
                      <h3 className='post-location '>
                        Location:{' '}
                        <span className='post-highlight profile-highlight'>
                          {post.location}
                        </span>
                      </h3>
                      <h3 className='post-price'>
                        Price:{' '}
                        <span className='post-highlight profile-highlight'>
                          {post.price}
                        </span>
                      </h3>
                      <p className='post-description mx-3'>
                        {post.description}
                      </p>
                    </Container>
                    <p className='mb-0 mt-4 text-center'>
                      {post.willDeliver
                        ? `I'll come to you!`
                        : `This ain't delivery it's DiGiorno!`}
                    </p>
                    <aside className='del-edit-btn d-flex justify-content-center py-2'>
                      <section className='user-post-btns'>
                        <DeleteBtn
                          posts={posts}
                          post={post}
                          userAuthToken={userAuthToken}
                          setUserInfo={setUserInfo}
                          setOgPosts={setOgPosts}
                        />
                        <Link to={`${username}/edit-post/${post._id}`}>
                          <Button className='edit-post-btn w-100'>Edit</Button>
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
}
