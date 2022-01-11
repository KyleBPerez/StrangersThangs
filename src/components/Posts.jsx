import { useState, useEffect } from 'react'
import { fetchPosts } from '../api'
import '../compCss/Posts.css'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data))
  }, [])

  return (
    <div className='posts'>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div className='post-card' key={post._id}>
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
                <span className='post-user'>{post.author.username}</span>
              </p>
            </div>
          )
        })}
    </div>
  )
}
