import { Button } from 'react-bootstrap'
import { fetchUserInfo, deletePost } from '../api/index'

export const DeleteBtn = ({
  userAuthToken,
  setUserInfo,
  setUsersPosts,
  posts,
  post,
  className,
}) => {
  const deletePostHandler = async (postId) => {
    await deletePost(userAuthToken, postId)
    const updateUserInfo = await fetchUserInfo(userAuthToken)
    setUserInfo(updateUserInfo)
    const newPosts = posts.filter((post) => post.active === true)
    setUsersPosts(newPosts)
  }

  return (
    <Button
      variant='info'
      className={`${className ? className : ''} delete-post-btn w-10`}
      onClick={() => deletePostHandler(post._id)}
    >
      Delete
    </Button>
  )
}
