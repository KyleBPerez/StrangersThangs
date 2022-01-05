import { useState, useEffect } from 'react'
import { fetchPosts } from './api/index'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Header, Home, Login, Posts, Profile } from './components/index'
// import { updatePosts } from './api/index'

function App() {
  const [posts, setPosts] = useState([])
  const [userAuthToken, setUserAuthToken] = useState([])

  useEffect(() => {
    fetchPosts().then((data) => setPosts(data))
  }, [])

  return (
    <div className='App'>
      <Header />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home userAuthToken={userAuthToken} />} />
          <Route path='posts' element={<Posts posts={posts} />} />
          <Route path='profile' element={<Profile />} />
          <Route
            path='login'
            element={<Login setUserAuthToken={setUserAuthToken} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
