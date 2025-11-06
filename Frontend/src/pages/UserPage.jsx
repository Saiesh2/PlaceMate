import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore.js';
import {
  Target,
  Users,
  FileText,
  Video,
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  Star,
  Zap,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Crown,
  Rocket,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  Activity,
} from "lucide-react";

const UserPage = () => {
  const { authUser} = useAuthStore();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [time, setTime] = useState(new Date());
  const [userName] = useState(authUser.fullName); // Get from auth context
  const [userLevel] = useState(5);
  const [userPoints] = useState(1250);
  const [streak] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const cards = [
    {
      id: "goals",
      title: "Academic Goals",
      icon: Target,
      route: "/goals",
      gradient: "from-blue-500 via-blue-600 to-indigo-700",
      glowColor: "blue",
      description: "Track progress and achieve your learning milestones",
      stats: { label: "Active Goals", value: "8" },
      badge: "🎯",
      particles: ["💡", "📚", "✨"],
    },
    {
      id: "community",
      title: "Community Hub",
      icon: Users,
      route: "/community",
      gradient: "from-purple-500 via-purple-600 to-pink-700",
      glowColor: "purple",
      description: "Connect, share experiences, and grow together",
      stats: { label: "Active Members", value: "2.5K+" },
      badge: "👥",
      particles: ["💬", "🤝", "🌟"],
    },
    {
      id: "resume",
      title: "AI Resume Builder",
      icon: FileText,
      route: "/resume",
      gradient: "from-emerald-500 via-green-600 to-teal-700",
      glowColor: "emerald",
      description: "Create stunning resumes with AI-powered assistance",
      stats: { label: "Templates", value: "15+" },
      badge: "📄",
      particles: ["✍️", "🎨", "⚡"],
    },
    {
      id: "placement",
      title: "Video Consultation",
      icon: Video,
      route: "/videocall",
      gradient: "from-orange-500 via-amber-600 to-yellow-700",
      glowColor: "orange",
      description: "Connect face-to-face with placement officers",
      stats: { label: "Available Now", value: "Live" },
      badge: "📹",
      particles: ["🎥", "💼", "🔥"],
    },
  ];

  const quickStats = [
    {
      icon: Trophy,
      label: "Level",
      value: userLevel,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: Zap,
      label: "Points",
      value: userPoints,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Flame,
      label: "Streak",
      value: `${streak} days`,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Award,
      label: "Achievements",
      value: "12",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  const recentActivity = [
    { icon: CheckCircle2, text: "Completed Java DSA module", time: "2h ago", color: "text-green-500" },
    { icon: MessageSquare, text: "Posted in Community", time: "5h ago", color: "text-blue-500" },
    { icon: FileText, text: "Updated Resume", time: "1d ago", color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with User Profile */}
        <div className="mb-12">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white">
                  <span className="text-2xl font-bold text-white">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {getGreeting()}, {userName}! 👋
                </h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border border-gray-200">
                <Bell className="w-6 h-6 text-gray-700" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-bounce">
                  3
                </div>
              </button>
              <button className="p-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border border-gray-200">
                <Settings className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold mb-4 shadow-lg animate-bounce">
                      <Rocket className="w-5 h-5" />
                      <span>PlaceMate Dashboard</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black mb-4">
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Your Career Journey
                      </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                      Master your skills, connect with peers, and land your dream job. 
                      Everything you need in one powerful platform.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Get Started
                      </button>
                      <button className="px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-800 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 border border-gray-200">
                        <BarChart3 className="w-5 h-5" />
                        View Progress
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {quickStats.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="group relative"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
                          <div className={`relative ${stat.bg} backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 transform hover:scale-110 transition-all`}>
                            <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
                            <div className="text-3xl font-black text-gray-900 mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feature Cards Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Explore Features
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>All systems operational</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, index) => {
              const Icon = card.icon;
              const isHovered = hoveredCard === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => navigate(card.route)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative cursor-pointer animate-slideIn"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500`}></div>

                  {/* Card */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 transform group-hover:scale-105 transition-all duration-500">
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Floating particles on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 pointer-events-none">
                        {card.particles.map((particle, i) => (
                          <div
                            key={i}
                            className="absolute animate-particle text-2xl"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: "50%",
                              animationDelay: `${i * 0.2}s`,
                            }}
                          >
                            {particle}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                          <div className={`relative p-4 bg-gradient-to-br ${card.gradient} rounded-2xl shadow-xl transform group-hover:rotate-12 transition-transform duration-500`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="text-4xl animate-bounce">{card.badge}</div>
                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-3xl font-black mb-3 transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-gray-900"
                      }`}>
                        {card.title}
                      </h3>
                      <p className={`text-base mb-6 transition-colors duration-300 ${
                        isHovered ? "text-white/90" : "text-gray-600"
                      }`}>
                        {card.description}
                      </p>

                      {/* Stats & CTA */}
                      <div className="flex items-center justify-between">
                        <div className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          isHovered 
                            ? "bg-white/20 text-white backdrop-blur-sm" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          <div className="text-xs opacity-75">{card.stats.label}</div>
                          <div className="text-lg font-bold">{card.stats.value}</div>
                        </div>
                        <div className={`flex items-center gap-2 font-bold transition-colors duration-300 ${
                          isHovered ? "text-white" : "text-gray-700"
                        }`}>
                          <span>Explore</span>
                          <ArrowRight className={`w-5 h-5 transform transition-transform duration-300 ${
                            isHovered ? "translate-x-2" : ""
                          }`} />
                        </div>
                      </div>

                      {/* Decorative corner */}
                      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-all duration-500 ${
                        isHovered ? "bg-white/10" : "bg-black/5"
                      }`}></div>
                    </div>
                  </div>

                  {/* Hover indicator at bottom */}
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-500 ${
                    isHovered ? "opacity-100 w-3/4" : "opacity-0"
                  }`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-all group cursor-pointer"
                      >
                        <div className={`p-3 ${activity.color} bg-opacity-10 rounded-xl group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-6 h-6 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{activity.text}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-xl opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
                Achievements
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "🏆", label: "First Goal Completed", rarity: "Common" },
                  { icon: "🔥", label: "7-Day Streak", rarity: "Rare" },
                  { icon: "⭐", label: "Community Leader", rarity: "Epic" },
                  { icon: "👑", label: "Level 5 Reached", rarity: "Legendary" },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl hover:shadow-lg transition-all group cursor-pointer"
                  >
                    <div className="text-3xl transform group-hover:scale-125 transition-transform">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{achievement.label}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        achievement.rarity === "Legendary" ? "bg-purple-100 text-purple-700" :
                        achievement.rarity === "Epic" ? "bg-blue-100 text-blue-700" :
                        achievement.rarity === "Rare" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes particle {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.5);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-particle {
          animation: particle 2s ease-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default UserPage;
