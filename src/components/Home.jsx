import { testMe } from '../api/index'

export default function Home({ userAuthToken }) {
  return (
    <>
      <h1>This Pages Home</h1>
      <button onClick={() => testMe(userAuthToken.token)}>TestME</button>
    </>
  )
}
