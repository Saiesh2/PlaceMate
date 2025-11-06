import React, { useState, useEffect } from "react";
import {
  PieChart,
  LineChart,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Plus,
  X,
  CheckCircle2,
  Circle,
  Medal,
  Bell,
  Calendar,
  Flag,
  CheckCheck,
  Briefcase,
  TrendingUp,
  BookOpen,
  Target,
  BarChart2,
  Users,
  Zap,
  Award,
  Trophy,
  Flame,
  Star,
  Sparkles,
  Rocket,
  Crown,
  Gift,
  Layers,
  Clock,
  TrendingDown,
  Activity,
  Edit,
  Archive,
  Play,
  Pause,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../Components/card";
import useGoalsStore from "../store/useGoalsStore";
import { Toaster } from "react-hot-toast";

const Goals = () => {
  const {
    goals,
    isLoading,
    error,
    fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    getCompletionStats,
  } = useGoalsStore();

  const [newGoal, setNewGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Technical Skills");
  const [selectedPriority, setSelectedPriority] = useState("Medium");
  const [targetDate, setTargetDate] = useState("");
  const [progressTarget, setProgressTarget] = useState("");
  const [progressUnit, setProgressUnit] = useState("hours");
  const [showConfetti, setShowConfetti] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [hoveredGoal, setHoveredGoal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedView, setSelectedView] = useState("grid"); // grid or list

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Calculate gamification stats
  useEffect(() => {
    const completedCount = goals.filter((g) => g.status === "Completed").length;
    setTotalPoints(completedCount * 100 + goals.length * 10);
    setLevel(Math.floor(completedCount / 5) + 1);
    setStreak(Math.floor(Math.random() * 15) + 1); // Mock streak
  }, [goals]);

  const categories = [
    {
      name: "Technical Skills",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Interview Prep",
      icon: Calendar,
      gradient: "from-purple-500 to-pink-500",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Projects",
      icon: BarChart2,
      gradient: "from-orange-500 to-red-500",
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Soft Skills",
      icon: Users,
      gradient: "from-green-500 to-emerald-500",
      color: "bg-green-100 text-green-700",
    },
  ];

  const priorities = [
    { name: "Low", color: "green", icon: Flag },
    { name: "Medium", color: "yellow", icon: Zap },
    { name: "High", color: "red", icon: Flame },
  ];

  const statuses = ["Not Started", "In Progress", "Completed", "Archived"];

  const { totalGoals, completedGoals, completionRate } = getCompletionStats();

  const getCategoryData = (category) =>
    categories.find((c) => c.name === category) || categories[0];

  const pieData = [
    { name: "Completed", value: completedGoals },
    { name: "In Progress", value: goals.filter((g) => g.status === "In Progress").length },
    { name: "Not Started", value: goals.filter((g) => g.status === "Not Started").length },
  ];

  const COLORS = {
    Completed: "#10b981",
    "In Progress": "#3b82f6",
    "Not Started": "#9ca3af",
    High: "#ef4444",
    Medium: "#f59e0b",
    Low: "#10b981",
  };

  const progressData = goals.map((goal) => ({
    name: goal.text.substring(0, 15) + "...",
    progress: (goal.progress.current / goal.progress.target) * 100,
    target: 100,
  }));

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim() || !progressTarget) return;

    try {
      await addGoal({
        text: newGoal,
        category: selectedCategory,
        priority: selectedPriority,
        status: "Not Started",
        progress: {
          current: 0,
          target: Number(progressTarget),
          unit: progressUnit,
        },
        targetDate: targetDate ? new Date(targetDate) : null,
      });

      setNewGoal("");
      setProgressTarget("");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleUpdateProgress = async (id, newProgress) => {
    try {
      const goal = goals.find((g) => g._id === id);
      await updateGoalProgress(id, {
        current: Math.min(Number(newProgress), goal.progress.target),
      });

      // Check if goal is completed
      if (Number(newProgress) >= goal.progress.target) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateGoal(id, { status: newStatus });
      if (newStatus === "Completed") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await deleteGoal(id);
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <Toaster position="top-center" />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Star
                className={`w-4 h-4 ${
                  i % 3 === 0
                    ? "text-yellow-400"
                    : i % 3 === 1
                    ? "text-blue-400"
                    : "text-pink-400"
                }`}
                fill="currentColor"
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 relative">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 rounded-full shadow-2xl">
                <Trophy className="w-16 h-16 text-white animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Goal Mastery Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            🚀 Level up your career with gamified goal tracking • Earn achievements • Build your streak
          </p>

          {/* Gamification Stats Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border-2 border-yellow-400 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-black text-yellow-600">
                      Level {level}
                    </div>
                    <div className="text-xs text-gray-600">Master</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border-2 border-blue-400 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
                  <div>
                    <div className="text-2xl font-black text-blue-600">
                      {totalPoints}
                    </div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border-2 border-orange-400 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Flame className="w-6 h-6 text-orange-600 animate-bounce" />
                  <div>
                    <div className="text-2xl font-black text-orange-600">
                      {streak} Days
                    </div>
                    <div className="text-xs text-gray-600">Streak</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border-2 border-purple-400 transform hover:scale-110 transition-all">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-purple-600" />
                  <div>
                    <div className="text-2xl font-black text-purple-600">
                      {completedGoals}
                    </div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setSelectedView("grid")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedView === "grid"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/50 text-gray-600 hover:bg-white/80"
              }`}
            >
              <Layers className="w-5 h-5 inline mr-2" />
              Grid View
            </button>
            <button
              onClick={() => setSelectedView("list")}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedView === "list"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/50 text-gray-600 hover:bg-white/80"
              }`}
            >
              <BarChart2 className="w-5 h-5 inline mr-2" />
              List View
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="w-20 h-20 border-8 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
              <Rocket className="absolute inset-0 m-auto w-10 h-10 text-blue-600 animate-pulse" />
            </div>
            <p className="mt-6 text-xl font-semibold text-gray-700 animate-pulse">
              Loading your goals...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 mb-8 shadow-xl animate-slideDown">
            <div className="flex items-center">
              <X className="w-6 h-6 text-red-500 mr-3" />
              <span className="text-red-800 font-semibold">{error}</span>
            </div>
          </div>
        )}

        {/* Enhanced Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Completion Rate Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200 overflow-hidden transform hover:scale-105 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {completionRate}%
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Success Rate
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3 text-xs">
                  <span className="text-green-600 font-semibold">
                    ✓ {completedGoals} Done
                  </span>
                  <span className="text-gray-500">
                    {totalGoals - completedGoals} Remaining
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Goals Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-200 overflow-hidden transform hover:scale-105 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {goals.filter((g) => g.status === "In Progress").length}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      In Progress
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">
                    Keep pushing forward! 💪
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pie Chart Card */}
          <div className="group relative col-span-1 md:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden transform hover:scale-105 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold">
                  <Target className="w-6 h-6 mr-2 text-purple-600" />
                  Goal Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[entry.name]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <BarChart2 className="w-7 h-7 mr-3 text-orange-600" />
                  Progress Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="progress"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorProgress)"
                      animationBegin={0}
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Add Goal Form */}
        <div className="mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-blue-200 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Rocket className="w-7 h-7 mr-3 animate-bounce" />
                  Create Your Next Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleAddGoal} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                        Goal Description
                      </label>
                      <input
                        type="text"
                        placeholder="E.g., Master React Hooks in 30 days"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white/50 backdrop-blur-sm font-medium placeholder-gray-400 hover:border-blue-400"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-purple-600" />
                        Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <button
                              key={category.name}
                              type="button"
                              onClick={() => setSelectedCategory(category.name)}
                              className={`p-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                selectedCategory === category.name
                                  ? `bg-gradient-to-br ${category.gradient} text-white border-transparent shadow-lg`
                                  : "bg-white/50 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              <Icon className="w-5 h-5 mx-auto mb-1" />
                              <div className="text-xs font-semibold">
                                {category.name.split(" ")[0]}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                        <Flag className="w-4 h-4 mr-2 text-red-600" />
                        Priority
                      </label>
                      <div className="flex gap-2">
                        {priorities.map((priority) => {
                          const Icon = priority.icon;
                          return (
                            <button
                              key={priority.name}
                              type="button"
                              onClick={() => setSelectedPriority(priority.name)}
                              className={`flex-1 p-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                                selectedPriority === priority.name
                                  ? `bg-${priority.color}-500 text-white border-transparent shadow-lg`
                                  : "bg-white/50 border-gray-300 hover:border-gray-400"
                              }`}
                            >
                              <Icon className="w-5 h-5 mx-auto mb-1" />
                              <div className="text-xs font-semibold">
                                {priority.name}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-green-600" />
                        Progress Target
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="100"
                          className="w-1/2 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/50 focus:border-green-500 transition-all bg-white/50 font-semibold"
                          value={progressTarget}
                          onChange={(e) => setProgressTarget(e.target.value)}
                          disabled={isLoading}
                        />
                        <input
                          type="text"
                          placeholder="hours"
                          className="w-1/2 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/50 focus:border-green-500 transition-all bg-white/50 font-semibold"
                          value={progressUnit}
                          onChange={(e) => setProgressUnit(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        Target Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all bg-white/50 font-semibold"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-3 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        Create Goal & Earn 10 Points
                        <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
                      </>
                    )}
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Goals List */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <Card className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-indigo-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardTitle className="flex items-center justify-between text-2xl font-bold">
                <div className="flex items-center">
                  <CheckCheck className="w-7 h-7 mr-3" />
                  Your Active Goals ({goals.length})
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span>{completedGoals} Completed</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {!isLoading && goals.length === 0 ? (
                <div className="text-center py-20">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Rocket className="w-16 h-16 text-white animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 mb-3">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                    Create your first goal and begin earning points, building
                    streaks, and leveling up!
                  </p>
                  <div className="flex justify-center gap-3">
                    <Award className="w-8 h-8 text-yellow-500 animate-bounce" />
                    <Star className="w-8 h-8 text-blue-500 animate-bounce delay-100" />
                    <Trophy className="w-8 h-8 text-purple-500 animate-bounce delay-200" />
                  </div>
                </div>
              ) : (
                <div
                  className={`${
                    selectedView === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                      : "space-y-6"
                  }`}
                >
                  {goals.map((goal, index) => {
                    const categoryData = getCategoryData(goal.category);
                    const progressPercent =
                      (goal.progress.current / goal.progress.target) * 100;
                    const Icon = categoryData.icon;

                    return (
                      <div
                        key={goal._id}
                        onMouseEnter={() => setHoveredGoal(goal._id)}
                        onMouseLeave={() => setHoveredGoal(null)}
                        className="group relative animate-slideIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${categoryData.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity`}
                        ></div>
                        <div
                          className={`relative p-6 rounded-2xl border-2 transition-all transform hover:scale-105 hover:shadow-2xl ${
                            goal.status === "Completed"
                              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                              : "bg-white/90 backdrop-blur-sm border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          {/* Goal Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-3 bg-gradient-to-br ${categoryData.gradient} rounded-xl shadow-lg`}
                              >
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                  {goal.text}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  <span
                                    className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryData.color}`}
                                  >
                                    {goal.category}
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                      goal.priority === "High"
                                        ? "bg-red-100 text-red-700"
                                        : goal.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    <Flag className="w-3 h-3 inline mr-1" />
                                    {goal.priority}
                                  </span>
                                  {goal.status === "Completed" && (
                                    <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-700 animate-pulse">
                                      <Trophy className="w-3 h-3 inline mr-1" />
                                      Completed! +100
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteGoal(goal._id)}
                                className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-all"
                                title="Delete"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-semibold text-gray-700">
                                Progress
                              </span>
                              <span className="font-bold text-indigo-600">
                                {goal.progress.current}/{goal.progress.target}{" "}
                                {goal.progress.unit}
                              </span>
                            </div>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
                              <div
                                className={`h-full bg-gradient-to-r ${categoryData.gradient} rounded-full transition-all duration-1000 ease-out relative`}
                                style={{ width: `${progressPercent}%` }}
                              >
                                {hoveredGoal === goal._id && (
                                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-right">
                              {progressPercent.toFixed(0)}% Complete
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center bg-gray-100 rounded-xl p-2">
                              <input
                                type="number"
                                className="w-20 text-center border-0 bg-transparent font-bold text-gray-900 focus:outline-none"
                                value={goal.progress.current}
                                onChange={(e) =>
                                  handleUpdateProgress(goal._id, e.target.value)
                                }
                                min="0"
                                max={goal.progress.target}
                              />
                            </div>

                            <select
                              className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 font-semibold text-sm"
                              value={goal.status}
                              onChange={(e) =>
                                handleUpdateStatus(goal._id, e.target.value)
                              }
                            >
                              {statuses.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>

                            {goal.targetDate && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-xl">
                                <Calendar className="w-4 h-4" />
                                {new Date(goal.targetDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
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

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
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

export default Goals;
