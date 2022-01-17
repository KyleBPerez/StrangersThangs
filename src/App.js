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
    fetchPosts().then((postData) => {
      setOgPosts(postData)
      setPosts(postData)
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
          <Route
            path='/'
            element={
              <Home
                userAuthToken={userAuthToken}
                username={userInfo.username}
              />
            }
          />
          <Route
            path='posts'
            element={
              <Posts
                posts={posts}
                ogPosts={ogPosts}
                setPosts={setPosts}
                setOgPosts={setOgPosts}
              />
            }
          />
          <Route
            path='posts/:postId'
            element={
              <SinglePost
                posts={posts}
                setPosts={setPosts}
                setOgPosts={setOgPosts}
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
                setPosts={setPosts}
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
                setPosts={setPosts}
                setOgPosts={setOgPosts}
                userAuthToken={userAuthToken}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route
            path='profile/:username/edit-post/:postId'
            element={
              <CreatePost
                setPosts={setPosts}
                setOgPosts={setOgPosts}
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
