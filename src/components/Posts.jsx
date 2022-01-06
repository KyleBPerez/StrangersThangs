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
              <p className='post-description'>{post.description}</p>
            </div>
          )
        })}
    </div>
  )
}
