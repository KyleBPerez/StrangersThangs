import LinkContainer from 'react-router-bootstrap/LinkContainer'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Outlet } from 'react-router-dom'

export default function ViewMessages() {
  return (
    <div className='messages-container w-100 d-flex flex-column align-items-center '>
      <Navbar bg='dark' variant='dark' className='w-100'>
        <Container className='w-100 d-flex justify-content-around'>
          <Navbar.Brand>Messages: </Navbar.Brand>
          <Nav className='gap-2 d-flex justify-content-around w-100'>
            <LinkContainer to='sent' className='w-50'>
              <Button variant='info'>Sent</Button>
            </LinkContainer>
            <LinkContainer to='recieved' className='w-50'>
              <Button variant='info'>Recieved</Button>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}
