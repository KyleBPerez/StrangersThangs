import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { fetchUserInfo, deletePost, fetchPosts } from '../api/index'

export const DeleteBtn = ({
  userAuthToken,
  setUserInfo,
  posts,
  post,
  setPosts,
  setOgPosts,
  setUserPosts,
  className,
}) => {
  const navigate = useNavigate()
  const deletePostHandler = async (postId) => {
    await deletePost(userAuthToken, postId)
    await fetchUserInfo(userAuthToken).then((updateUserInfo) =>
      setUserInfo(updateUserInfo)
    )
    await fetchPosts().then((postData) => {
      setPosts(postData)
      setOgPosts(postData)
    })
    if (className) navigate('/posts')
  }

  return (
    <Button
      className={`${className ? className : ''} delete-post-btn w-10`}
      onClick={() => deletePostHandler(post._id)}
    >
      Delete
    </Button>
  )
}
