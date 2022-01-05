const URL = 'https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT'

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

export const updatePosts = async ({
  title,
  description,
  price,
  willDeliver,
}) => {
  const response = await fetch(`${URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
  console.log(result)
}

export const deletePost = async (params) => {
  const response = await fetch(`${URL}/posts/POST_ID`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(response)
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
  console.log(result)
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
  console.log(result)
  return result.data.token
}

export const testMe = async (authToken) => {
  const response = await fetch(`${URL}/test/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  })
  const result = await response.json()
  console.log(result)
}
