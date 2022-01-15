import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../compCss/Posts.css'

export default function Posts({ posts, setPosts, ogPosts }) {
  const [searchValue, setSearchValue] = useState('')

  function searchUpdate(searchQuery) {
    setSearchValue(searchQuery)
    const updatePosts = ogPosts.filter(
      ({ title, description, author: { username } }) => {
        return (
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    )
    setPosts(updatePosts)
  }

  return (
    <div className='posts-container'>
      <section className='search-bar'>
        <input
          type='text'
          value={searchValue}
          placeholder='Search Posts...'
          onChange={(e) => searchUpdate(e.target.value)}
        ></input>
      </section>
      <div className='posts'>
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <div className='post-card' key={post._id}>
                <Link
                  to={`${post._id}`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <h1 className='post-title'>{post.title}</h1>
                  <h3 className='post-location'>
                    Location:{' '}
                    <span className='post-highlight'>{post.location}</span>
                  </h3>
                  <h4 className='post-price'>
                    Price: <span className='post-highlight'>{post.price}</span>
                  </h4>
                  <p className='post-description'>{post.description}</p>
                  <p>
                    {post.willDeliver
                      ? `I'll come to you!`
                      : `This ain't delivery it's DiGiorno!`}
                  </p>
                  <section className='posters-name'>
                    <p className='post-by'>
                      Posted by{' '}
                      <span className='post-highlight'>
                        {post.author.username}
                      </span>
                    </p>
                  </section>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}
