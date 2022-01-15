import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../compCss/SinglePost.css'
import { DeleteBtn } from './DeleteBtn'
import { Container } from 'react-bootstrap'

export default function SinglePost({
  posts,
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

  return singlePost._id ? (
    <div className='post-card single-post-card'>
      <h1 className='post-title'>{singlePost.title}</h1>
      <h3 className='post-location'>
        Location: <span className='post-highlight'>{singlePost.location}</span>
      </h3>
      <h4 className='post-price'>
        Price: <span className='post-highlight'>{singlePost.price}</span>
      </h4>
      <p className='post-description'>{singlePost.description}</p>
      <p>
        {singlePost.willDeliver
          ? `I'll come to you!`
          : `This ain't delivery it's DiGiorno!`}
      </p>
      <div className='message-btn poster-name'>
        {singlePost.author._id === userId ? (
          <DeleteBtn
            className='delete-single-btn'
            post={singlePost}
            posts={posts}
            userAuthToken={userAuthToken}
            setUserInfo={setUserInfo}
            setUsersPosts={setUsersPosts}
          />
        ) : (
          <Link to={`${username}/message-${singlePost.author.username}`}>
            <Button variant='info'>Message</Button>
          </Link>
        )}
        <section className='posters-name'>
          <p className='post-by'>
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
