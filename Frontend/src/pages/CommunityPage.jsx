import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Heart,
  Users,
  Briefcase,
  GraduationCap,
  Code,
  Lightbulb,
  Trash2,
  Plus,
  Filter,
  Search,
  TrendingUp,
  AlertCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Image,
  Smile,
  Hash,
  Award,
  Clock,
  Eye,
  ThumbsUp,
  Sparkles,
  Star,
  Flame,
  Zap,
  MessageSquare,
  ArrowUp,
  Pin,
  Edit,
  CheckCircle,
} from 'lucide-react';
import useCommunityStore from '../store/useCommunityStore.js';

const CommunityPage = () => {
  // Local state for UI
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('General');
  const [commentContent, setCommentContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, popular, trending
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Zustand store
  const {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    deletePost,
    toggleLike,
    addComment,
  } = useCommunityStore();

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const categories = [
    {
      name: 'All',
      icon: Users,
      gradient: 'from-gray-400 to-gray-600',
      color: 'bg-gray-100 text-gray-700',
      count: 0,
    },
    {
      name: 'General',
      icon: MessageCircle,
      gradient: 'from-blue-400 to-blue-600',
      color: 'bg-blue-100 text-blue-700',
      count: 0,
    },
    {
      name: 'Career',
      icon: Briefcase,
      gradient: 'from-green-400 to-green-600',
      color: 'bg-green-100 text-green-700',
      count: 0,
    },
    {
      name: 'Education',
      icon: GraduationCap,
      gradient: 'from-purple-400 to-purple-600',
      color: 'bg-purple-100 text-purple-700',
      count: 0,
    },
    {
      name: 'Technology',
      icon: Code,
      gradient: 'from-orange-400 to-orange-600',
      color: 'bg-orange-100 text-orange-700',
      count: 0,
    },
    {
      name: 'Other',
      icon: Lightbulb,
      gradient: 'from-pink-400 to-pink-600',
      color: 'bg-pink-100 text-pink-700',
      count: 0,
    },
  ];

  const postsArray = Array.isArray(posts) ? posts : [];

  // Enhanced filtering and sorting
  const filteredPosts = postsArray
    .filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'popular') {
        return (b.likes?.length || 0) - (a.likes?.length || 0);
      } else if (sortBy === 'trending') {
        const aScore =
          (a.likes?.length || 0) * 2 + (a.comments?.length || 0) * 3;
        const bScore =
          (b.likes?.length || 0) * 2 + (b.comments?.length || 0) * 3;
        return bScore - aScore;
      }
      return 0;
    });

  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    count:
      cat.name === 'All'
        ? postsArray.length
        : postsArray.filter((post) => post.category === cat.name).length,
  }));

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    await createPost({
      title: postTitle.trim(),
      content: postContent.trim(),
      category: postCategory,
    });

    if (!error) {
      setPostTitle('');
      setPostContent('');
      setPostCategory('General');
      setShowCreateForm(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim() || !selectedPost) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    await addComment(selectedPost._id, commentContent.trim());

    if (!error) {
      setCommentContent('');
    }
  };

  const handleLikePost = async (postId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleLike(postId);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getCategoryColor = (category) => {
    const cat = categories.find((c) => c.name === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-700';
  };

  const getCategoryGradient = (category) => {
    const cat = categories.find((c) => c.name === category);
    return cat ? cat.gradient : 'from-gray-400 to-gray-600';
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.name === category);
    return cat ? cat.icon : MessageCircle;
  };

  const isUserPost = (post) => {
    return isAuthenticated && user && post.userId?._id === user._id;
  };

  const isPostLiked = (post) => {
    if (!isAuthenticated || !user) return false;
    return post.likes.some((like) =>
      typeof like === 'string' ? like === user._id : like._id === user._id
    );
  };

  const ErrorDisplay = ({ error, onDismiss }) => (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex items-center justify-between shadow-lg animate-slideDown">
      <div className="flex items-center">
        <div className="bg-red-100 rounded-full p-2 mr-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>
        <span className="text-red-800 font-medium">{error}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 text-xl font-bold transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );

  if (loading && postsArray.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <Users className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-2">
            Loading Community
          </div>
          <div className="text-gray-500">
            Fetching the latest discussions...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 rounded-3xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              PlaceMate Community
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Connect, Share & Grow with 10,000+ Students
          </p>

          {/* Quick Action Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-2 bg-white rounded-full shadow-md flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer group">
              <Flame className="w-4 h-4 text-orange-500 group-hover:animate-bounce" />
              <span className="text-sm font-semibold text-gray-700">
                45 trending now
              </span>
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-md flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer group">
              <Zap className="w-4 h-4 text-yellow-500 group-hover:animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">
                New: Interview Tips
              </span>
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-md flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer group">
              <Star className="w-4 h-4 text-purple-500 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-semibold text-gray-700">
                Featured Posts
              </span>
            </div>
          </div>
        </div>

        {error && (
          <ErrorDisplay
            error={error}
            onDismiss={() => useCommunityStore.setState({ error: null })}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories with Beautiful Cards */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mr-3">
                  <Filter className="h-5 w-5 text-white" />
                </div>
                Categories
              </h3>
              <div className="space-y-2">
                {categoriesWithCounts.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full group relative overflow-hidden rounded-xl transition-all transform hover:scale-105 ${
                        selectedCategory === category.name
                          ? 'shadow-lg scale-105'
                          : 'hover:shadow-md'
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                      ></div>
                      <div
                        className={`relative flex items-center justify-between p-4 ${
                          selectedCategory === category.name
                            ? category.color + ' font-bold'
                            : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`p-2 rounded-lg mr-3 ${
                              selectedCategory === category.name
                                ? 'bg-white/50'
                                : 'bg-white'
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-semibold">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-white/70 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            {category.count}
                          </span>
                          {selectedCategory === category.name && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Stats Card */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                Live Stats
              </h3>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      <span className="font-medium">Total Posts</span>
                    </div>
                    <span className="text-2xl font-bold">
                      {postsArray.length}
                    </span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Flame className="w-5 h-5 mr-2" />
                      <span className="font-medium">Active Today</span>
                    </div>
                    <span className="text-2xl font-bold">
                      {
                        postsArray.filter((post) => {
                          const today = new Date().toDateString();
                          return (
                            new Date(post.createdAt).toDateString() === today
                          );
                        }).length
                      }
                    </span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      <span className="font-medium">Total Likes</span>
                    </div>
                    <span className="text-2xl font-bold">
                      {postsArray.reduce(
                        (total, post) => total + (post.likes?.length || 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Comments</span>
                    </div>
                    <span className="text-2xl font-bold">
                      {postsArray.reduce(
                        (total, post) => total + (post.comments?.length || 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <Hash className="h-6 w-6 mr-2 text-blue-600" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {[
                  { tag: 'PlacementTips', count: 234 },
                  { tag: 'InterviewExp', count: 189 },
                  { tag: 'CompanyReview', count: 156 },
                  { tag: 'ResumeHelp', count: 142 },
                  { tag: 'CodingHelp', count: 128 },
                ].map((topic, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      #{topic.tag}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {topic.count} posts
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Enhanced Search and Filter Bar */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    placeholder="Search discussions, topics, or users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium cursor-pointer hover:border-blue-300 transition-all"
                >
                  <option value="newest">🕐 Newest First</option>
                  <option value="popular">❤️ Most Popular</option>
                  <option value="trending">🔥 Trending</option>
                </select>

                {/* Create Post Button */}
                {isAuthenticated && (
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center whitespace-nowrap"
                    disabled={loading}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    New Post
                  </button>
                )}
              </div>

              {/* Create Post Form */}
              {showCreateForm && isAuthenticated && (
                <div className="mt-6 pt-6 border-t-2 border-gray-100 animate-slideDown">
                  <form onSubmit={handlePostSubmit}>
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Share your thoughts with the community
                          </p>
                        </div>
                      </div>

                      <input
                        type="text"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 font-semibold text-lg"
                        placeholder="What's the title of your post?"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        required
                      />

                      <textarea
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="6"
                        placeholder="Share your experiences, ask questions, or start a discussion..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value)}
                          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        >
                          {categories.slice(1).map((cat) => (
                            <option key={cat.name} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                          title="Add image"
                        >
                          <Image className="w-5 h-5 text-gray-500" />
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                          title="Add emoji"
                        >
                          <Smile className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowCreateForm(false)}
                          className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all font-semibold"
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          disabled={
                            loading || !postTitle.trim() || !postContent.trim()
                          }
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Posting...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Post
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {!isAuthenticated && (
                <div className="mt-6 pt-6 border-t-2 border-gray-100 text-center">
                  <div className="mb-4">
                    <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium mb-2">
                      Join 10,000+ students sharing their journey!
                    </p>
                    <p className="text-gray-500 text-sm">
                      Sign in to create posts, comment, and connect
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Sign In to Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {loading && postsArray.length > 0 && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100">
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                    <MessageCircle className="absolute inset-0 m-auto w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    No discussions yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to start a conversation in this category!
                  </p>
                  {isAuthenticated && (
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      Create First Post
                    </button>
                  )}
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const CategoryIcon = getCategoryIcon(post.category);
                  const isLiked = isPostLiked(post);
                  const isBookmarked = bookmarkedPosts.includes(post._id);

                  return (
                    <div
                      key={post._id}
                      onMouseEnter={() => setHoveredPost(post._id)}
                      onMouseLeave={() => setHoveredPost(null)}
                      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group animate-slideIn"
                    >
                      {/* Post Header */}
                      <div className="p-6 pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${getCategoryGradient(
                                post.category
                              )} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white`}
                            >
                              {post.userId?.name?.charAt(0).toUpperCase() ||
                                'U'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-gray-900">
                                  {post.userId?.fullName || 'Unknown User'}
                                </p>
                                {isUserPost(post) && (
                                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{formatDate(post.createdAt)}</span>
                                <span>•</span>
                                <div
                                  className={`flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(
                                    post.category
                                  )}`}
                                >
                                  <CategoryIcon className="h-3 w-3 mr-1" />
                                  {post.category}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Menu */}
                          <div className="flex items-center gap-2">
                            {isUserPost(post) && (
                              <button
                                onClick={() => handleDeletePost(post._id)}
                                className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
                                disabled={loading}
                                title="Delete post"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              onClick={() => toggleBookmark(post._id)}
                              className={`p-2 rounded-lg transition-all ${
                                isBookmarked
                                  ? 'bg-yellow-50 text-yellow-600'
                                  : 'hover:bg-gray-100 text-gray-400'
                              }`}
                              title="Bookmark"
                            >
                              <Bookmark
                                className={`h-5 w-5 ${
                                  isBookmarked ? 'fill-current' : ''
                                }`}
                              />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg transition-all"
                              title="More options"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Post Content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {post.content}
                        </p>

                        {/* Engagement Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>
                              {Math.floor(Math.random() * 500) + 100} views
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes?.length || 0} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>
                              {post.comments?.length || 0} comments
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Like Button */}
                            <button
                              onClick={() => handleLikePost(post._id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                                isLiked
                                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                              }`}
                              disabled={loading}
                            >
                              <Heart
                                className={`h-5 w-5 ${
                                  isLiked
                                    ? 'fill-current animate-pulse'
                                    : ''
                                }`}
                              />
                              <span>{post.likes?.length || 0}</span>
                            </button>

                            {/* Comment Button */}
                            <button
                              onClick={() => {
                                setSelectedPost(post);
                                setShowCommentForm(
                                  !showCommentForm ||
                                    selectedPost?._id !== post._id
                                );
                              }}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border-2 border-gray-200 hover:border-blue-300 transform hover:scale-105"
                            >
                              <MessageCircle className="h-5 w-5" />
                              <span>{post.comments?.length || 0}</span>
                            </button>

                            {/* Share Button */}
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all border-2 border-gray-200 hover:border-green-300 transform hover:scale-105">
                              <Share2 className="h-5 w-5" />
                              <span>Share</span>
                            </button>
                          </div>

                          {/* Trending Indicator */}
                          {hoveredPost === post._id &&
                            (post.likes?.length || 0) > 5 && (
                              <div className="flex items-center gap-2 text-orange-600 animate-slideIn">
                                <Flame className="w-5 h-5 animate-bounce" />
                                <span className="font-bold text-sm">
                                  Trending
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Comments Section */}
                      {showCommentForm && selectedPost?._id === post._id && (
                        <div className="px-6 py-6 bg-gradient-to-b from-gray-50/50 to-white border-t border-gray-100 animate-slideDown">
                          {isAuthenticated ? (
                            <form onSubmit={handleCommentSubmit} className="mb-6">
                              <div className="flex gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className="flex-1">
                                  <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
                                    rows="3"
                                    placeholder="Share your thoughts..."
                                    value={commentContent}
                                    onChange={(e) =>
                                      setCommentContent(e.target.value)
                                    }
                                    required
                                  />
                                  <div className="flex justify-end mt-3">
                                    <button
                                      type="submit"
                                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                      disabled={
                                        loading || !commentContent.trim()
                                      }
                                    >
                                      {loading ? (
                                        <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                          Posting...
                                        </>
                                      ) : (
                                        <>
                                          <Send className="w-4 h-4 mr-2" />
                                          Comment
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          ) : (
                            <div className="text-center py-6 mb-6 bg-white rounded-xl border-2 border-dashed border-gray-300">
                              <p className="text-gray-600 mb-3">
                                Join the conversation!
                              </p>
                              <button
                                onClick={() => navigate('/login')}
                                className="text-blue-600 hover:text-blue-800 font-bold text-lg"
                              >
                                Sign in to comment →
                              </button>
                            </div>
                          )}

                          {/* Comments List */}
                          <div className="space-y-4">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                              {post.comments?.length || 0} Comments
                            </h4>
                            {(post.comments || []).map((comment) => (
                              <div
                                key={comment._id}
                                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 animate-slideIn"
                              >
                                <div className="flex gap-3">
                                  <div
                                    className={`w-10 h-10 bg-gradient-to-br ${getCategoryGradient(
                                      post.category
                                    )} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
                                  >
                                    {comment.userId?.fullName
                                      ?.charAt(0)
                                      .toUpperCase() || 'U'}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-bold text-gray-900">
                                        {comment.userId?.fullName ||
                                          'Unknown User'}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {formatDate(comment.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                      {comment.content}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3">
                                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>Like</span>
                                      </button>
                                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>Reply</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-50"
        title="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CommunityPage;
