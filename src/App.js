import { useState, useEffect } from 'react'
import { fetchUserInfo } from './api/index'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Header, Home, Login, Posts, Profile } from './components/index'
// import { updatePosts } from './api/index'

function App() {
  const [userAuthToken, setUserAuthToken] = useState('')
  const [userInfo, setUserInfo] = useState({})
  console.log(userInfo, userAuthToken)
  const handleUser = async (token) => {
    if (token) {
      const user = await fetchUserInfo(token)
      setUserInfo(user)
    }
  }
  useEffect(() => {
    handleUser(userAuthToken)
  }, [userAuthToken])

  return (
    <div className='App'>
      <Header />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home userAuthToken={userAuthToken} />} />
          <Route path='posts' element={<Posts />} />
          <Route
            path='profile'
            element={
              <Profile
                userInfo={userInfo}
                userAuthToken={userAuthToken}
                setUserAuthToken={setUserAuthToken}
              />
            }
          />
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
