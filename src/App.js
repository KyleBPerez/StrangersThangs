import { useState, useEffect } from 'react'
import { fetchPosts } from './api/index'
import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Posts from './components/Posts'
import { updatePosts } from './api/index'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts(setPosts)
  }, [])
  const testObject = {
    title: 'chair',
    description: "it's a chair",
    price: 'more then you have',
    willDeliver: false,
  }
  const postHandler = () => {
    updatePosts(testObject)
  }

  return (
    <div className='App'>
      <Header />
      <div className='content-container'>
        <Routes>
          <Route
            path='/'
            element={
              <button onClick={postHandler}>Click This DAMN BUTTON</button>
            }
          />
          <Route path='posts' element={<Posts posts={posts} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
