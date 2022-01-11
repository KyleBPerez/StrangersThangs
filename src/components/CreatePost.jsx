import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createNewPost, fetchUserInfo } from '../api/index'
import '../compCss/CreatePost.css'

export default function CreatePost({ userAuthToken, setUserInfo }) {
  const [itemName, setItemName] = useState('')
  const [itemValue, setItemValue] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [willDeliver, setWillDeliver] = useState(false)
  const postObj = {
    authToken: userAuthToken,
    title: itemName,
    description: itemDescription,
    price: itemValue,
    willDeliver: willDeliver,
  }
  const { username } = useParams()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    await createNewPost(postObj)
    await fetchUserInfo(userAuthToken).then((data) => setUserInfo(data))
    navigate('/profile')
  }

  const priceHandler = (e) => {
    const regx = /[0-9\b\W]+$/

    if (e === '' || regx.test(e)) {
      setItemValue(e)
    }
  }

  return (
    <div className='create-post-container'>
      <section className='post-head'>
        <h1>{username}</h1>
        <h3>What item would you like to post</h3>
      </section>
      <section className='new-post'>
        <form action='' className='new-post-form' onSubmit={submitHandler}>
          <input
            type='text'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder='Item Name...'
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
              onChange={(e) => setWillDeliver(false)}
              className='no-deli-radio'
              checked
            />
            <label for='false' className='no-deli'>
              No Delivery
            </label>
            <input
              type='radio'
              name='willDeliver'
              id='true'
              value='Will Deliver'
              onChange={(e) => setWillDeliver(true)}
              className='will-deli-radio
'
            />
            <label for='true' className='will-deli'>
              Will Deliver
            </label>
          </aside>
          <button>Submit</button>
        </form>
      </section>
    </div>
  )
}
