import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useGoalsStore = create((set, get) => ({
  goals: [],
  isLoading: false,
  error: null,

  // Fetch all goals
  fetchGoals: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/goal/fetchgoals");
      set({ goals: res.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch goals", 
        isLoading: false 
      });
      toast.error("Failed to fetch goals");
    }
  },

  // Add a new goal
  addGoal: async (goalData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/goal/goals", goalData);
      set(state => ({ 
        goals: [...state.goals, res.data], 
        isLoading: false 
      }));
      toast.success("Goal added successfully");
      return res.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to add goal", 
        isLoading: false 
      });
      toast.error("Failed to add goal");
      throw error;
    }
  },

  // Update an existing goal
  updateGoal: async (goalId, updateData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.put(`/goal/updategoals/${goalId}`, updateData);
      set(state => ({
        goals: state.goals.map(goal => 
          goal._id === goalId ? res.data : goal
        ),
        isLoading: false
      }));
      toast.success("Goal updated successfully");
      return res.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to update goal", 
        isLoading: false 
      });
      toast.error("Failed to update goal");
      throw error;
    }
  },

  // Delete a goal
  deleteGoal: async (goalId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/goal/deletegoals/${goalId}`);
      set(state => ({
        goals: state.goals.filter(goal => goal._id !== goalId),
        isLoading: false
      }));
      toast.success("Goal deleted successfully");
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to delete goal", 
        isLoading: false 
      });
      toast.error("Failed to delete goal");
      throw error;
    }
  },

  // Progress update specific method
  updateGoalProgress: async (goalId, progressData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/goal/goals/${goalId}/progress`, progressData);
      set(state => ({
        goals: state.goals.map(goal => 
          goal._id === goalId ? res.data : goal
        ),
        isLoading: false
      }));
      
      // Special success message for completed goals
      if (res.data.completed) {
        toast.success("🎉 Congratulations! Goal completed!");
      } else {
        toast.success("Goal progress updated");
      }

      return res.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to update goal progress", 
        isLoading: false 
      });
      toast.error("Failed to update goal progress");
      throw error;
    }
  },

  // Additional utility methods
  getGoalById: (goalId) => {
    const { goals } = get();
    return goals.find(goal => goal._id === goalId);
  },

  // Analytics methods
  getCompletionStats: () => {
    const { goals } = get();
    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.completed).length;
    
    return {
      totalGoals,
      completedGoals,
      completionRate: totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0
    };
  }
}));

export default useGoalsStore;