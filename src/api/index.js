const URL = 'https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT'

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${URL}/posts`)
    const result = await response.json()
    if (result.error) throw result.error
    console.log(result)
    return result.data.posts
  } catch (error) {
    console.error(error, `something went wrong`)
  }
}

export const createNewPost = async ({
  authToken,
  title,
  description,
  price,
  willDeliver,
}) => {
  const response = await fetch(`${URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        willDeliver: willDeliver,
      },
    }),
  })
  const result = response.json()
  console.log('createNewPost:', result)
}

export const deletePost = async (params) => {
  const response = await fetch(`${URL}/posts/POST_ID`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  console.log('deletePost:', result)
}

export const registerUser = async (username, password) => {
  const response = await fetch(`${URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })
  const result = await response.json()
  console.log('registerUser:', result)
}

export const loginUser = async (username, password) => {
  const response = await fetch(`${URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
      },
    }),
  })
  const result = await response.json()
  console.log('loginUser result:', result)
  return result.data.token
}

export const fetchUserInfo = async (authToken) => {
  const response = await fetch(`${URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
  const result = await response.json()
  console.log('fetchUserInfo result:', result)
  return result.data
}
