  import { create } from 'zustand';
  import { axiosInstance } from "../lib/axios.js";

  const useCommunityStore = create((set, get) => ({
    posts: [],
    loading: false,
    error: null,

    // Fetch all posts
    fetchPosts: async () => {
      try {
        set({ loading: true, error: null });
        const response = await axiosInstance.get("/community/fetch");
        set({ posts: response.data, loading: false });
      } catch (error) {
        set({ 
          error: error.response?.data?.message || 'Failed to fetch posts',
          loading: false 
        });
      }
    },

    // Create a new post
    createPost: async (postData) => {
      try {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post("/community/create", postData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        set(state => ({
          posts: [response.data, ...state.posts],
          loading: false
        }));
      } catch (error) {
        set({ 
          error: error.response?.data?.message || 'Failed to create post',
          loading: false 
        });
      }
    },

    // Update a post
    updatePost: async (id, postData) => {
      try {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`/community/update/${id}`, postData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        set(state => ({
          posts: state.posts.map(post => 
            post._id === id ? response.data : post
          ),
          loading: false
        }));
      } catch (error) {
        set({ 
          error: error.response?.data?.message || 'Failed to update post',
          loading: false 
        });
      }
    },

    // Delete a post
    deletePost: async (id) => {
      try {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`/community/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        set(state => ({
          posts: state.posts.filter(post => post._id !== id),
          loading: false
        }));
      } catch (error) {
        set({ 
          error: error.response?.data?.message || 'Failed to delete post',
          loading: false 
        });
      }
    },

    // Toggle like on a post
    toggleLike: async (postId) => {
      try {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/community/posts/${postId}/like`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        set(state => ({
          posts: state.posts.map(post => 
            post._id === postId ? response.data : post
          ),
          loading: false
        }));
      } catch (error) {
        set({ 
          error: error.response?.data?.message || 'Failed to toggle like',
          loading: false 
        });
      }
    },

    // Add a comment to a post
    addComment: async (postId, content) => {
      try {
        set({ loading: true, error: null });
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`/community/add/${postId}/comments`, { content }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        set(state => ({
          posts: state.posts.map(post => 
            post._id === postId ? response.data : post
          ),
          loading: false
        }));
      } catch (error) {
        set({ 
          error: error.response?.data?.message || 'Failed to add comment',
          loading: false 
        });
      }
    },
  }));

  export default useCommunityStore; 