import '../compCss/Posts.css'

export default function Posts({ posts }) {
  return (
    <div className='posts'>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div className='post-card' key={post._id}>
              <h1 className='post-title'>{post.title}</h1>
              <p className='post-description'>{post.description}</p>
            </div>
          )
        })}
    </div>
  )
}
