export default function PostList() {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div 
          key={post.id} 
          className="border-b border-gray-200 dark:border-gray-700 pb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        </div>
      ))}
    </div>
  )
}