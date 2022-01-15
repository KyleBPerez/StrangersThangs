import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { fetchPosts, fetchUserInfo } from './api/index'
import {
  Header,
  Home,
  Login,
  Posts,
  SinglePost,
  MessageForm,
  Profile,
  ViewMessages,
  ListMessages,
  CreatePost,
} from './components/index'

function App() {
  const [userAuthToken, setUserAuthToken] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const [posts, setPosts] = useState([])
  const [ogPosts, setOgPosts] = useState([])

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data)
      setOgPosts(data)
    })
  }, [])

  useEffect(() => {
    if (localStorage.getItem('userAuthToken')) {
      setUserAuthToken(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    handleUser(userAuthToken)
  }, [userAuthToken])

  const handleUser = async (token) => {
    if (token) {
      const user = await fetchUserInfo(token)
      setUserInfo(user)
    }
  }

  return (
    <div className='App'>
      <Header userAuthToken={userAuthToken} />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home userAuthToken={userAuthToken} />} />
          <Route
            path='posts'
            element={
              <Posts posts={posts} setPosts={setPosts} ogPosts={ogPosts} />
            }
          />
          <Route
            path='posts/:postId'
            element={
              <SinglePost
                posts={posts}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                userAuthToken={userAuthToken}
                setUserAuthToken={setUserAuthToken}
              />
            }
          />
          <Route
            path='posts/:postId/:loggedInUsername/message-:postersUsername'
            element={<MessageForm userAuthToken={userAuthToken} />}
          />
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
          <Route path='profile/:username/messages' element={<ViewMessages />}>
            <Route
              path='sent'
              element={
                <ListMessages messages={userInfo.messages} posts={ogPosts} />
              }
            />
            <Route
              path='recieved'
              element={
                <ListMessages messages={userInfo.messages} posts={ogPosts} />
              }
            />
          </Route>
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
          <Route
            path='profile/:username/edit-post/:postId'
            element={
              <CreatePost
                userAuthToken={userAuthToken}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
