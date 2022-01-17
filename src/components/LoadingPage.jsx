import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

export const LoadingPage = () => {
  return (
    <Container className='loading-container mw-100 mh-100 mt-5 d-flex justify-content-center align-items-center'>
      <Button
        className='loading-btn d-flex align-items-center border border-light '
        variant='info'
        disabled
      >
        <span className='display-4 text-nowrap'>Page is Loading</span>
        <Container className='test d-flex align-self-end gap-5'>
          <Spinner
            className='text-dark display-1'
            as='span'
            animation='grow'
            size='lg'
            role='status'
            aria-hidden='true'
          />{' '}
          <Spinner
            className='text-dark display-1'
            as='span'
            animation='grow'
            size='lg'
            role='status'
            aria-hidden='true'
          />{' '}
          <Spinner
            className='text-dark display-1'
            as='span'
            animation='grow'
            size='lg'
            role='status'
            aria-hidden='true'
          />
        </Container>
      </Button>
    </Container>
  )
}
