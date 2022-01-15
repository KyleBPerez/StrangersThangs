const URL = 'https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT'

export const registerUser = async (username, password) => {
  await fetch(`${URL}/users/register`, {
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
  window.localStorage.setItem('token', result.data.token)
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
  return result.data
}

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${URL}/posts`)
    const result = await response.json()
    if (result.error) throw result.error
    return result.data.posts
  } catch (error) {
    console.error(error, `something went wrong`)
  }
}

export const createNewPost = async ({
  authToken,
  title,
  location,
  description,
  price,
  willDeliver,
}) => {
  await fetch(`${URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        location: location ? location : null,
        price: price ? price : `[On Request]`,
        willDeliver: willDeliver,
      },
    }),
  })
}

export const deletePost = async (userAuthToken, postId) => {
  await fetch(`${URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAuthToken}`,
    },
  })
}

export const editPost = async (
  postId,
  { authToken, title, location, description, price, willDeliver }
) => {
  await fetch(`${URL}/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      post: {
        title: title,
        description: description,
        price: price,
        location: location,
        willDeliver: willDeliver,
      },
    }),
  })
}

export const messageUser = async ({ postId, authToken, message }) => {
  await fetch(`${URL}/posts/${postId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      message: {
        content: message,
      },
    }),
  })
}
