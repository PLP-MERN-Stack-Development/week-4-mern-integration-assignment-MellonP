import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiAlertCircle, FiImage, FiX } from 'react-icons/fi'
import { createPost } from '../api/posts'
import { toast } from 'react-toastify'

const postSchema = yup.object().shape({
  title: yup.string().required('Title is required').max(100, 'Title is too long'),
  content: yup.string().required('Content is required'),
})

const CreatePost = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(postSchema),
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      if (image) {
        formData.append('image', image)
      }

      await createPost(formData)
      toast.success('Post created successfully!')
      reset()
      setImage(null)
      setImagePreview(null)
      navigate('/posts')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                {...register('title')}
                className={`block w-full px-4 py-2 border ${
                  errors.title
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } rounded-md shadow-sm focus:outline-none`}
              />
              {errors.title && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <div className="relative">
              <textarea
                id="content"
                name="content"
                rows={8}
                {...register('content')}
                className={`block w-full px-4 py-2 border ${
                  errors.content
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                } rounded-md shadow-sm focus:outline-none`}
              />
              {errors.content && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiAlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image (Optional)
            </label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-64 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <FiX className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/posts')}
              className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                'Publish Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost