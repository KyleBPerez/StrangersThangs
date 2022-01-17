import { useNavigate } from 'react-router-dom'
import { Container, InputGroup, Button } from 'react-bootstrap'

export default function Home({ userAuthToken, username }) {
  const navigate = useNavigate()
  return (
    <Container className='d-flex p-sm-5 flex-column w-100 align-items-center bg-dark rounded-pill mt-5 gap-2 border border-light shadow-lg'>
      {!userAuthToken ? (
        <h1 className='display-4 text-light text-center p-5'>
          Welcome to Strager's Things
        </h1>
      ) : (
        <h1 className='display-4 text-light text-center p-5'>
          Welcome Back{' '}
          <span id='logged-in-name' className='display-4 text-info '>
            {username}
          </span>{' '}
          to Stranger's Things
        </h1>
      )}

      <h1 className='display-5 text-light text-center'>
        {!userAuthToken
          ? 'Where you can Buy / Sell / or Trade'
          : 'You trying to Buy / Sell / TRADE?'}
      </h1>
      <Container className='d-flex flex-column gap-3 p-5 w-75'>
        <InputGroup className='mb-3'>
          <InputGroup.Text
            className='bg-secondary text-light w-50 d-flex justify-content-center text-wrap'
            id='search-posts-form'
          >
            {!userAuthToken
              ? ` Start with logging in or Registering a new Account `
              : ` Go Check Your messages!!! `}
          </InputGroup.Text>
          <Button
            id='button-addon2'
            className='w-50'
            onClick={() =>
              userAuthToken ? navigate('./profile') : navigate('./login')
            }
          >
            {!userAuthToken
              ? 'Go to Log in!!!'
              : `Head over to your messages!!!`}
          </Button>
        </InputGroup>
        <InputGroup className='mb-3'>
          <Button
            id='button-addon2'
            className='w-50 '
            onClick={() => navigate('./posts')}
          >
            Head over to and Check out
          </Button>
          <InputGroup.Text
            className='bg-secondary text-light w-50 d-flex justify-content-center text-wrap'
            id='search-posts-form'
          >
            All the goods we have
          </InputGroup.Text>
        </InputGroup>
      </Container>
    </Container>
  )
}
