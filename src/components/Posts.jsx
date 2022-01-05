export default function Posts({ posts }) {
  return (
    <div className='post-card'>
      {posts &&
        posts.map((post) => {
          return (
            <div className='post' key={post._id}>
              {post.title}
            </div>
          )
        })}
    </div>
  )
}
