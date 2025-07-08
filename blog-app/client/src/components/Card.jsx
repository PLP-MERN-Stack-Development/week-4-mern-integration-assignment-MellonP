export default function Card({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.content}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  )
}