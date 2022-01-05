import { Link } from 'react-router-dom'
import { testMe } from '../api/index'

export default function Home({ currentUser }) {
  return (
    <>
      <h1>This Pages Home</h1>
      <button onClick={() => testMe(currentUser.token)}>TestME</button>
      <Link to='login'>Login Page</Link>
    </>
  )
}
