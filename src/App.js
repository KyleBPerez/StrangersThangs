import { useState, useEffect } from 'react'
import { fetchPosts } from './api/index'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Posts from './components/Posts'
import Login from './components/Login'
import Home from './components/Home'
// import { updatePosts } from './api/index'

function App() {
  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data))
  }, [])

  return (
    <div className='App'>
      <Header />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home currentUser={currentUser} />} />
          <Route path='posts' element={<Posts posts={posts} />} />
          <Route
            path='login'
            element={<Login setCurrentUser={setCurrentUser} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
