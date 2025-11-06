import express from 'express';
import { 
  addGoal, 
  deleteGoal, 
  getGoals, 
  updateGoal,
  updateGoalProgress 
} from '../controllers/goal.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js'; // Assumed authentication middleware

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protectRoute);

// Fetch all goals
router.get("/fetchgoals", getGoals);

// Add a new goal
router.post("/goals", addGoal);

// Update entire goal
router.put("/updategoals/:id", updateGoal);

// Patch for partial updates (like progress)
router.patch("/goals/:id/progress", updateGoalProgress);

// Delete a goal
router.delete("/deletegoals/:id", deleteGoal);

export default router;
