import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import Container from 'react-bootstrap/Container'

export default function ListMessages({ messages, posts }) {
  const [msgSent, setMsgSent] = useState([])
  const [msgRecived, setMsgRecived] = useState([])
  const { username } = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    const sentArray = []
    const recievedArray = []

    if (messages) {
      messages.forEach((msgData) =>
        msgData.fromUser.username !== username
          ? recievedArray.push(msgData)
          : sentArray.push(msgData)
      )
    }

    setMsgRecived(recievedArray)
    setMsgSent(sentArray)
  }, [messages, username])

  return pathname.includes('sent') ? (
    <Container className='d-flex justify-content-center flex-wrap gap-4 w-100'>
      {msgSent.map((singleMsg, idx) => {
        return (
          <Card
            style={{ boxShadow: '2px 2px 5px #00adb5' }}
            className='w-75'
            key={idx}
          >
            <CardHeader className='bg-dark text-light'>
              <Card.Title>{singleMsg.post.title}</Card.Title>
              {posts.map((post, idx) => {
                if (post._id === singleMsg.post._id) {
                  return (
                    <Card.Text key={idx} className='text-secondary'>
                      Posted By:{' '}
                      <span className='post-highlight'>
                        {post.author.username}
                      </span>
                    </Card.Text>
                  )
                }
              })}
            </CardHeader>
            <CardGroup className='p-4 bg-secondary text-light'>
              <Card.Title>{singleMsg.content}</Card.Title>
            </CardGroup>
            <Container className='card-footer bg-dark text-light'>
              <Card.Text>
                Message Sent By:
                <span className='post-highlight'>
                  {' '}
                  {singleMsg.fromUser.username}
                </span>
              </Card.Text>
            </Container>
          </Card>
        )
      })}
    </Container>
  ) : (
    <Container className='d-flex justify-content-center flex-wrap gap-4 w-100'>
      {msgRecived.map((singleMsg, idx) => {
        return (
          <Card
            style={{ boxShadow: '2px 2px 5px #00adb5' }}
            className='w-75'
            key={idx}
          >
            <CardHeader className='bg-dark text-light'>
              <Card.Title>{singleMsg.post.title}</Card.Title>
              {posts.map((post, idx) => {
                return (
                  post._id === singleMsg.post._id && (
                    <Card.Text key={idx} className='text-secondary'>
                      Posted By: {post.author.username}
                    </Card.Text>
                  )
                )
              })}
            </CardHeader>
            <CardGroup className='p-4 bg-secondary text-light'>
              <Card.Title>{singleMsg.content}</Card.Title>
            </CardGroup>
            <Container className='card-footer bg-dark text-light'>
              <Card.Text className='fs-6'>
                Sent By: {singleMsg.fromUser.username}
              </Card.Text>
            </Container>
          </Card>
        )
      })}
    </Container>
  )
}
