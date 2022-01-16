import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { messageUser } from '../api/index'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../compCss/Messsage.css'

export default function MessageForm({ userAuthToken }) {
  const [userMessage, setUserMessage] = useState('')
  const { postId, username, postersUsername } = useParams()
  const navigate = useNavigate()
  const messageObj = {
    postId: postId,
    authToken: userAuthToken,
    message: userMessage,
  }

  console.log(
    `postId: ${postId}, LoggedInUsername: ${username}, postersUsernamee: ${postersUsername}`
  )

  const submitMessage = async () => {
    await messageUser(messageObj)
    navigate(`/posts/${postId}`)
  }

  return (
    <div className='message-container w-75 shadow-lg mt-5 '>
      <Form>
        <div className='d-grid gap-4 bg-dark rounded-3'>
          <Form.Group
            className='mb-3 p-4'
            controlId='exampleForm.ControlTextarea1'
          >
            <Form.Label className='display-1 text-light p-3'>
              {`Message: 
              ${postersUsername}`}
            </Form.Label>
            <Form.Control
              className='p-2 bg-dark text-white'
              as='textarea'
              rows={10}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </Form.Group>
          <Button
            variant='info'
            size='sm'
            className='message-submit-btn rounded-3'
            onClick={submitMessage}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}
