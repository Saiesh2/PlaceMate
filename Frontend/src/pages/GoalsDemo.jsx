import { useState } from 'react';
import { Target, Check, Plus, Calendar, TrendingUp, ChevronRight } from 'lucide-react';

const GoalsDemo = () => {
  const [goalCategory, setGoalCategory] = useState('career');
  const [focusedGoal, setFocusedGoal] = useState(null);
  
  const goals = {
    career: [
      { id: 1, title: "Get promoted to Senior Developer", progress: 65, deadline: "August 2025", milestones: 3, completed: 2 },
      { id: 2, title: "Learn React Native development", progress: 40, deadline: "June 2025", milestones: 5, completed: 2 }
    ],
    education: [
      { id: 3, title: "Complete AWS certification", progress: 80, deadline: "May 2025", milestones: 4, completed: 3 },
    ],
    personal: [
      { id: 4, title: "Read 20 books this year", progress: 30, deadline: "December 2025", milestones: 20, completed: 6 },
      { id: 5, title: "Run a half marathon", progress: 50, deadline: "October 2025", milestones: 6, completed: 3 }
    ]
  };
  
  return (
    <div className="min-h-screen bg-transparent p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Target className="text-green-600" size={28} />
          <h1 className="text-3xl font-bold">Goal Tracker</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Set meaningful goals, track your progress, and celebrate your achievements with our intuitive goal tracking system.
        </p>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-transparent rounded-xl shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex p-4 bg-transparent border-b border-gray-200">
          <button 
            className={`px-4 py-2 rounded-lg mr-2 transition-colors ${goalCategory === 'career' ? 'bg-green-100 text-green-700 font-medium' : 'hover:bg-gray-100'}`}
            onClick={() => setGoalCategory('career')}
          >
            Career
          </button>
          <button 
            className={`px-4 py-2 rounded-lg mr-2 transition-colors ${goalCategory === 'education' ? 'bg-green-100 text-green-700 font-medium' : 'hover:bg-gray-100'}`}
            onClick={() => setGoalCategory('education')}
          >
            Education
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${goalCategory === 'personal' ? 'bg-green-100 text-green-700 font-medium' : 'hover:bg-gray-100'}`}
            onClick={() => setGoalCategory('personal')}
          >
            Personal
          </button>
        </div>
        
        {/* Goals List */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold ">
              {goalCategory.charAt(0).toUpperCase() + goalCategory.slice(1)} Goals
            </h2>
            <button className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
              <Plus size={16} className="mr-1" /> Add New Goal
            </button>
          </div>
          
          <div className="space-y-4">
            {goals[goalCategory].map(goal => (
              <div 
                key={goal.id}
                className={`p-4 border rounded-lg transition-all cursor-pointer ${focusedGoal === goal.id ? 'border-green-400 shadow-md' : 'border-gray-200 hover:border-green-300'}`}
                onClick={() => setFocusedGoal(focusedGoal === goal.id ? null : goal.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium ">{goal.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" /> 
                    {goal.deadline}
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm  mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {focusedGoal === goal.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                    <div className="flex items-center text-gray-700 mb-3">
                      <TrendingUp size={16} className="mr-2 text-green-600" />
                      <span>Milestones: {goal.completed} of {goal.milestones} completed</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.from({ length: goal.milestones }).map((_, index) => (
                        <div 
                          key={index} 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${index < goal.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                        >
                          {index < goal.completed ? <Check size={14} /> : index + 1}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="text-sm text-green-600 font-medium hover:text-green-700">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Start Achieving Your Goals Today</h3>
              <p className="mt-1 text-green-100">Join our community of goal-setters and achievers.</p>
            </div>
            <a 
              href="/signup" 
              className="px-5 py-2 bg-white text-green-600 rounded-lg font-medium flex items-center hover:shadow-md transition-all"
            >
              Sign Up <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsDemo ;