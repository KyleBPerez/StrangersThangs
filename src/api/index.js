const URL = 'https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT'

export const fetchPosts = async (stateFunction) => {
  await fetch(`${URL}/posts`)
    .then((response) => response.json())
    .then((data) => stateFunction(data.data.posts))
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
}
