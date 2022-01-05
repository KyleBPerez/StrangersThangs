export default function Posts({ posts }) {
  return (
    <div className='post-card'>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div className='post' key={post._id}>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </div>
          )
        })}
    </div>
  )
}
