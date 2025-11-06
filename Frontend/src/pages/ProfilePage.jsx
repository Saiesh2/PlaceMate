import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Sparkles, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, updateProfile, loading } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updateProfile({ profilePic: base64Image });
        toast.success('Profile photo updated successfully');
      } catch (error) {
        console.error('Photo update error:', error);
        toast.error('Failed to update photo');
        setSelectedImg(null);
      }
    };
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-white">Loading your profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent animate-pulse"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 via-gray-600 to-yellow-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-1000 animate-pulse"></div>
            <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-yellow-500/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="relative mb-8 flex justify-center">
                <div className="relative group/photo">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 via-gray-500 to-yellow-500 rounded-full blur-lg opacity-40 group-hover/photo:opacity-60 transition-opacity duration-500 animate-spin-slow"></div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500/40 shadow-2xl transform group-hover/photo:scale-110 transition-all duration-500">
                    <img
                      src={selectedImg || authUser.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                    {loading && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 bg-yellow-600 hover:bg-yellow-500 hover:scale-110 p-2 rounded-full cursor-pointer transition-all duration-200 opacity-0 group-hover/photo:opacity-100 border-2 border-black shadow-lg ${
                      loading ? "animate-pulse pointer-events-none opacity-50" : ""
                    }`}
                  >
                    <Camera className="w-5 h-5 text-black" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </label>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-ping" />
                  <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-gray-400 animate-ping delay-500" />
                </div>
              </div>

              {/* Name Section (Just Displayed) */}
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-gray-200 to-yellow-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  {authUser.fullName || 'User'}
                </h1>
              </div>

              {/* Email */}
              <div className="text-center mb-8">
                <p className="text-gray-300 text-lg font-medium tracking-wide">
                  {authUser.email}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-center space-x-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  ></div>
                ))}
              </div>

              {/* Member Since */}
              {authUser.createdAt && (
                <div className="text-center mt-6 pt-6 border-t border-yellow-500/20">
                  <p className="text-gray-400 text-sm">
                    Member since{' '}
                    {new Date(authUser.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
