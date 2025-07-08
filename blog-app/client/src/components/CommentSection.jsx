export default function CommentSection() {
  return (
    <div className="mt-8">
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Comments
      </h4>
      <div className="space-y-4">
        {comments.map(comment => (
          <div 
            key={comment.id} 
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
          >
            <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}