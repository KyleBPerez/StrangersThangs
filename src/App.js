import { useState, useEffect } from 'react'
import { fetchUserInfo } from './api/index'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import {
  Header,
  Home,
  Login,
  Posts,
  Profile,
  CreatePost,
} from './components/index'
// import { updatePosts } from './api/index'

function App() {
  const [userAuthToken, setUserAuthToken] = useState('')
  const [userInfo, setUserInfo] = useState({})

  const handleUser = async (token) => {
    if (token) {
      const user = await fetchUserInfo(token)
      setUserInfo(user)
    }
  }
  useEffect(() => {
    handleUser(userAuthToken)
  }, [userAuthToken])

  useEffect(() => {
    if (localStorage.getItem('userAuthToken')) {
      setUserAuthToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <div className='App'>
      <Header userAuthToken={userAuthToken} />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home userAuthToken={userAuthToken} />} />
          <Route path='posts' element={<Posts />} />
          <Route
            path='profile'
            element={
              <Profile
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                userAuthToken={userAuthToken}
                setUserAuthToken={setUserAuthToken}
              />
            }
          />
          <Route
            path='login'
            element={<Login setUserAuthToken={setUserAuthToken} />}
          />
          <Route
            path='profile/:username/create-post'
            element={
              <CreatePost
                userAuthToken={userAuthToken}
                setUserInfo={setUserInfo}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
