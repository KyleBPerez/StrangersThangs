import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import '../compCss/SinglePost.css'
import { DeleteBtn } from './DeleteBtn'
import { LoadingPage } from './LoadingPage'

export default function SinglePost({
  posts,
  setPosts,
  setOgPosts,
  userAuthToken,
  setUserInfo,
  setUsersPosts,
  userInfo: { username, _id: userId, posts: usersPosts },
}) {
  const [singlePost, setSinglePost] = useState({})
  const { postId } = useParams()

  const [filterPosts] = posts.filter((post) => post._id === postId)
  useEffect(() => {
    setSinglePost(filterPosts)
  }, [filterPosts])

  if (!singlePost) return <LoadingPage />

  return singlePost.active ? (
    <div className='post-card single-post-container'>
      <h1 id='single-post-title' className='card-header bg-secondary mb-4'>
        {singlePost.title}
      </h1>
      <Container className='card-body'>
        <h3 className='post-location'>
          Location:{' '}
          <span className='post-highlight'>{singlePost.location}</span>
        </h3>
        <h4 className='post-price'>
          Price: <span className='post-highlight'>{singlePost.price}</span>
        </h4>
        <p className='post-description px-4 text-center'>
          {singlePost.description}
        </p>
        <p>
          {singlePost.willDeliver
            ? `I'll come to you!`
            : `This ain't delivery it's DiGiorno!`}
        </p>
      </Container>
      <div className='message-btn poster-name ps-3'>
        {singlePost.author._id === userId ? (
          <DeleteBtn
            className='delete-single-btn'
            post={singlePost}
            posts={posts}
            userAuthToken={userAuthToken}
            setUserInfo={setUserInfo}
            setUsersPosts={setUsersPosts}
            setPosts={setPosts}
            setOgPosts={setOgPosts}
          />
        ) : (
          <Link to={`${username}/message-${singlePost.author.username}`}>
            <Button>Message</Button>
          </Link>
        )}
        <section className='posters-name'>
          <p className='post-by text-muted'>
            Posted by{' '}
            <span className='post-highlight'>{singlePost.author.username}</span>
          </p>
        </section>
      </div>
    </div>
  ) : (
    <h1>This post does exist</h1>
  )
}
