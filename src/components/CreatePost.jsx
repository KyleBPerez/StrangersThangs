import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap'
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

  console.log('hello world')

  const priceHandler = (e) => {
    const regx = /[0-9\b\W]+$/

    if (e === '' || regx.test(e)) {
      setItemValue(e)
    }
  }

  useEffect(() => {
    if (postId) {
      userInfo.posts.forEach((userPosts) => {
        if (userPosts._id === postId) {
          setDelivery(userPosts.willDeliver)
          setItemName(userPosts.title)
          setItemValue(userPosts.price)
          setItemLocation(userPosts.location)
          setItemDescription(userPosts.description)
        }
      })
    }
  }, [userInfo, postId])

  return (
    <div className='create-post-container w-100'>
      <section className='post-head text-center'>
        <h1>{username}</h1>
        <h3>What item would you like to post?</h3>
      </section>
      <Container className='d-flex justify-content-center w-100'>
        <Form
          className='w-50 p-3 bg-dark rounded'
          onSubmit={
            postId ? (e) => editPostHandler(e) : (e) => newPostHandler(e)
          }
        >
          <InputGroup className='mb-2'>
            <InputGroup.Text className='input-description'>
              Item Name:{' '}
            </InputGroup.Text>
            <FormControl
              value={itemName}
              placeholder='What kind of item you selling . . .'
              onChange={(e) => setItemName(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-2 '>
            <InputGroup.Text className='input-description'>
              Location:{' '}
            </InputGroup.Text>
            <FormControl
              id='control-location'
              value={
                !itemLocation ? setItemLocation(`[On Request]`) : itemLocation
              }
              onChange={(e) => setItemLocation(e.target.value)}
            />
            <InputGroup.Text
              id='input-price'
              className='input-description  ms-2'
            >
              Price:{' '}
            </InputGroup.Text>
            <FormControl
              value={itemValue}
              placeholder='. . .'
              onChange={(e) => priceHandler(e.target.value)}
            />
          </InputGroup>
          <InputGroup className='mb-2'>
            <InputGroup.Text className='input-description'>
              Description:{' '}
            </InputGroup.Text>
            <FormControl
              value={itemDescription}
              as='textarea'
              placeholder='State, Address, Random Grocery store. . .'
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </InputGroup>
          <ToggleButtonGroup
            name='delivery'
            value={delivery}
            type='radio'
            className='d-flex justify-content-center mb-3'
          >
            <ToggleButton
              id='will-deliver'
              className='will-deliver'
              data-toggle='button'
              value={true}
              onChange={(e) => setDelivery(true)}
              aria-label='Radio button for will Deliver'
            >
              Will Deliver
            </ToggleButton>
            <ToggleButton
              id='no-delivery'
              className='will-deliver'
              data-toggle='button'
              value={false}
              onChange={(e) => setDelivery(false)}
              aria-label='Radio button for will Deliver'
            >
              No Delivery
            </ToggleButton>
          </ToggleButtonGroup>
          <InputGroup className='d-flex gap-3 justify-content-center '>
            <Button className='w-25 rounded' type='submit'>
              Submit
            </Button>
            <Button
              className='w-25 bg-danger rounded'
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </div>
  )
}
