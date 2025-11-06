import Goal from "../models/goal.model.js";

export const getGoals = async (req, res) => {
  try {
    // Find goals specific to the authenticated user
    const goals = await Goal.find({ userId: req.user._id });
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ 
      message: "Error fetching goals", 
      error: error.message 
    });
  }
};

export const addGoal = async (req, res) => {
  try {
    // Create goal with authenticated user's ID
    const newGoal = new Goal({
      ...req.body,
      userId: req.user._id
    });

    // Validate goal before saving
    await newGoal.validate();
    await newGoal.save();

    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error adding goal:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid goal data", 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      message: "Error adding goal", 
      error: error.message 
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    // Find the goal and ensure it belongs to the user
    const goal = await Goal.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Update goal with new data
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true,  // Return the updated document
        runValidators: true  // Run model validations on update
      }
    );

    res.json(updatedGoal);
  } catch (error) {
    console.error("Error updating goal:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Invalid goal data", 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      message: "Error updating goal", 
      error: error.message 
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    // Find the goal and ensure it belongs to the user
    const goal = await Goal.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Delete the goal
    await Goal.findByIdAndDelete(req.params.id);

    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ 
      message: "Error deleting goal", 
      error: error.message 
    });
  }
};

// Additional controller for updating goal progress
export const updateGoalProgress = async (req, res) => {
  try {
    // Find the goal and ensure it belongs to the user
    const goal = await Goal.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Update progress
    goal.progress.current = req.body.current;

    // Check if goal is completed
    if (goal.progress.current >= goal.progress.target) {
      goal.completed = true;
      goal.status = 'Completed';
      goal.completedAt = new Date();
    }

    await goal.save();

    res.json(goal);
  } catch (error) {
    console.error("Error updating goal progress:", error);
    res.status(500).json({ 
      message: "Error updating goal progress", 
      error: error.message 
    });
  }
};