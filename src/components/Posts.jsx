import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import '../compCss/Posts.css'
import { fetchPosts } from '../api'

export default function Posts({ posts, setPosts, ogPosts, setOgPosts }) {
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
    ogPosts.length > 0 && (
      <div className='posts-container w-100'>
        <section className='search-bar'>
          <InputGroup className='input-group-lg mb-3 w-50'>
            <InputGroup.Text
              className='bg-info text-dark '
              id='search-posts-form'
            >
              Search Posts:{' '}
            </InputGroup.Text>
            <FormControl
              className='bg-dark text-light'
              placeholder='User, Item, Keywords. . .'
              aria-label='Username'
              aria-describedby='search-posts-form'
              value={searchValue}
              onChange={(e) => searchUpdate(e.target.value)}
            />
          </InputGroup>
        </section>
        <div className='posts'>
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                post.active && (
                  <div className='post-card' key={post._id}>
                    <Link
                      to={`${post._id}`}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      <h1 className='post-title card-header bg-secondary rounded'>
                        {post.title}
                      </h1>
                      <h3 className='post-location'>
                        Location:{' '}
                        <span className='post-highlight'>{post.location}</span>
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
              )
            })}
        </div>
      </div>
    )
  )
}
