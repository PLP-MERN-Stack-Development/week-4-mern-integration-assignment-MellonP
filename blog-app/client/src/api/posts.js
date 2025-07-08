import api from './api';

/**
 * Get all posts
 * @param {Object} params - Optional query parameters
 * @returns {Promise<Array>} Array of posts
 */
export const getPosts = async (params = {}) => {
  try {
    const response = await api.get('/posts', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Get a single post by ID
 * @param {string} id - Post ID
 * @returns {Promise<Object>} Post object
 */
export const getPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new post
 * @param {Object} postData - Post data including optional featuredImage file
 * @returns {Promise<Object>} Created post
 */
export const createPost = async (postData) => {
  try {
    const formData = new FormData();
    
    // Append all fields to formData
    Object.keys(postData).forEach(key => {
      if (postData[key] !== undefined && postData[key] !== null) {
        formData.append(key, postData[key]);
      }
    });

    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

/**
 * Update an existing post
 * @param {string} id - Post ID
 * @param {Object} postData - Updated post data
 * @returns {Promise<Object>} Updated post
 */
export const updatePost = async (id, postData) => {
  try {
    const formData = new FormData();
    
    Object.keys(postData).forEach(key => {
      if (postData[key] !== undefined && postData[key] !== null) {
        formData.append(key, postData[key]);
      }
    });

    const response = await api.put(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a post
 * @param {string} id - Post ID
 * @returns {Promise<Object>} Delete confirmation
 */
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
};

/**
 * Search posts by query
 * @param {string} query - Search term
 * @returns {Promise<Array>} Matching posts
 */
export const searchPosts = async (query) => {
  try {
    const response = await api.get('/posts/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

/**
 * Get posts by category
 * @param {string} categoryId - Category ID
 * @returns {Promise<Array>} Posts in category
 */
export const getPostsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/posts/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Add comment to post
 * @param {string} postId - Post ID
 * @param {string} commentText - Comment content
 * @returns {Promise<Object>} Updated post
 */
export const addComment = async (postId, commentText) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { text: commentText });
    return response.data;
  } catch (error) {
    console.error(`Error adding comment to post ${postId}:`, error);
    throw error;
  }
};

/**
 * Delete comment from post
 * @param {string} postId - Post ID
 * @param {string} commentId - Comment ID
 * @returns {Promise<Object>} Updated post
 */
export const deleteComment = async (postId, commentId) => {
  try {
    const response = await api.delete(`/posts/${postId}/comments`, { 
      data: { commentId } 
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment ${commentId} from post ${postId}:`, error);
    throw error;
  }
};

// Export all API functions
export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  getPostsByCategory,
  addComment,
  deleteComment
};