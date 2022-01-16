import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  createNewPost,
  fetchUserInfo,
  editPost,
  fetchPosts,
} from '../api/index'
import '../compCss/CreatePost.css'

export default function CreatePost({
  userAuthToken,
  setUserInfo,
  userInfo,
  setPosts,
  setOgPosts,
}) {
  const [itemName, setItemName] = useState('')
  const [itemValue, setItemValue] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemLocation, setItemLocation] = useState('')
  const [delivery, setDelivery] = useState(false)
  const { username, postId } = useParams()
  const navigate = useNavigate()
  const postObj = {
    authToken: userAuthToken,
    location: itemLocation,
    title: itemName,
    description: itemDescription,
    price: itemValue,
    willDeliver: delivery,
  }

  const newPostHandler = async (e) => {
    e.preventDefault()
    await createNewPost(postObj)
    await fetchUserInfo(userAuthToken).then((data) => setUserInfo(data))
    await fetchPosts().then((postData) => {
      setPosts(postData)
      setOgPosts(postData)
    })
    navigate('/profile')
  }

  const editPostHandler = async (e) => {
    e.preventDefault()
    await editPost(postId, postObj)
    await fetchUserInfo(userAuthToken).then((data) => setUserInfo(data))
    await fetchPosts().then((postData) => {
      setPosts(postData)
      setOgPosts(postData)
    })
    navigate('/profile')
  }

  const priceHandler = (e) => {
    const regx = /[0-9\b\W]+$/

    if (e === '' || regx.test(e)) {
      setItemValue(e)
    }
  }

  useEffect(() => {
    if (postId) {
      for (let i = 0; i < userInfo.posts.length; i++) {
        if (userInfo.posts[i]._id === postId) {
          setDelivery(userInfo.posts[i].willDeliver)
          setItemName(userInfo.posts[i].title)
          setItemValue(userInfo.posts[i].price)
          setItemLocation(userInfo.posts[i].location)
          setItemDescription(userInfo.posts[i].description)
        }
      }
    }
  }, [userInfo, postId])

  return (
    <div className='create-post-container'>
      <section className='post-head'>
        <h1>{username}</h1>
        <h3>What item would you like to post</h3>
      </section>
      <section className='new-post'>
        <form
          action=''
          className='new-post-form'
          onSubmit={postId ? editPostHandler : newPostHandler}
        >
          <input
            type='text'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder='Item Name...'
          />
          <input
            type='text'
            value={itemLocation}
            onChange={(e) => setItemLocation(e.target.value)}
            placeholder='Location...'
          />
          <input
            type='text'
            value={itemValue}
            onChange={(e) => priceHandler(e.target.value)}
            placeholder='Item Price...'
          />
          <textarea
            style={{ resize: 'none' }}
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder='Enter Item Description . . .'
            rows={10}
            cols={50}
          />
          <aside className='delivery-options'>
            <input
              type='radio'
              name='willDeliver'
              id='false'
              value='No Delivery'
              onChange={(e) => setDelivery(false)}
              className='no-deli-radio'
              checked
            />
            <label htmlFor='false' className='no-deli'>
              No Delivery
            </label>
            <input
              type='radio'
              name='willDeliver'
              id='true'
              value='Will Deliver'
              onChange={(e) => setDelivery(true)}
              className='will-deli-radio'
            />
            <label htmlFor='true' className='will-deli'>
              Will Deliver
            </label>
          </aside>
          <button>Submit</button>
        </form>
      </section>
    </div>
  )
}
