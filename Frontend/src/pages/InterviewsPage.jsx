import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowRight, Clock, Calendar, BarChart4, User, Play, Lightbulb, ListChecks, MessageSquare } from 'lucide-react';

const InterviewsPage = () => {
  const [activeTab, setActiveTab] = useState('prep');
  
  return (
    <div className="min-h-screen pt-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-transparent rounded-full mb-4">
            <Video className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">P2P Video Interviews</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Your <span className="text-primary">Interview Skills</span></h1>
          <p className=" max-w-2xl mx-auto mb-8">
            Practice, prepare, and perform with our comprehensive interview tools and seamless video calling platform.
          </p>
        </div>

        {/* Interactive Demo Area */}
        <div className="bg-transparent rounded-xl shadow-md overflow-hidden border border-muted/30 mb-16">
          {/* Tabs */}
          <div className="flex border-b border-muted/30">
            <button 
              className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${activeTab === 'prep' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('prep')}
            >
              <Lightbulb className="w-4 h-4" />
              Interview Prep
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${activeTab === 'video' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('video')}
            >
              <Video className="w-4 h-4" />
              P2P Video Calling
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm flex items-center gap-2 ${activeTab === 'feedback' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('feedback')}
            >
              <MessageSquare className="w-4 h-4" />
              AI Feedback
            </button>
          </div>
          
          {/* Content based on active tab */}
          <div className="p-6">
            {activeTab === 'prep' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Personalized Interview Preparation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-transparent p-4 rounded-lg border border-muted/30">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-primary" />
                      Company Research
                    </h4>
                    <p className="text-sm text-muted-foreground">Access curated information about company culture, values, and common interview questions.</p>
                  </div>
                  
                  <div className="bg-transparent p-4 rounded-lg border border-muted/30">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Mock Interviews
                    </h4>
                    <p className="text-sm text-muted-foreground">Practice with AI-powered mock interviews tailored to specific roles and companies.</p>
                  </div>
                  
                  <div className="bg-transparent p-4 rounded-lg border border-muted/30">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Prep Schedule
                    </h4>
                    <p className="text-sm text-muted-foreground">Follow our structured preparation timeline to ensure you're fully prepared for your interview.</p>
                  </div>
                </div>
                
                <div className="bg-transparent p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Google Software Engineer Interview</h4>
                    <p className="text-sm text-muted-foreground">Recommended preparation: 2 weeks</p>
                  </div>
                  <Link 
                    to="/signup" 
                    className="px-4 py-2 bg-transparent text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors flex items-center gap-1"
                  >
                    Start Prep <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'video' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Seamless Video Interviews</h3>
                
                <div className="aspect-video bg-muted/20 rounded-lg flex flex-col justify-center items-center border border-muted/30">
                  <div className="bg-transparent p-4 rounded-full mb-4">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-medium mb-2">P2P Video Interview Platform</h4>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    High-quality, secure video calls with screen sharing, virtual backgrounds, and recording options.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-transparent p-4 rounded-lg border border-muted/30">
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>HD video quality</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Screen sharing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Virtual backgrounds</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-transparent p-4 rounded-lg border border-muted/30">
                    <h4 className="font-medium mb-2">Interview Tools</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Whiteboarding capabilities</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Collaborative code editor</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>Interview recording</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">AI-Powered Interview Analysis</h3>
                
                <div className="bg-transparent p-6 rounded-lg border border-muted/30">
                  <div className="flex items-start gap-6">
                    <div className="w-1/2">
                      <h4 className="font-medium mb-3">Performance Metrics</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Communication Skills</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Technical Knowledge</span>
                            <span className="text-sm font-medium">72%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-2">
                            <div className="bg-transparent h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Problem Solving</span>
                            <span className="text-sm font-medium">90%</span>
                          </div>
                          <div className="w-full bg-transparent rounded-full h-2">
                            <div className="bg-transparent h-2 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-1/2 bg-transparent p-4 rounded-lg border border-muted/30">
                      <h4 className="font-medium mb-3">Personalized Feedback</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI analyzes your interview responses and provides detailed, actionable feedback to help you improve.
                      </p>
                      <div className="text-sm p-3 bg-primary/5 rounded-lg border border-primary/20">
                        "Your technical explanations were clear and concise. Consider providing more specific examples from past projects when discussing your experience."
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link 
                    to="/signup" 
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Try Interview Analysis <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-transparent p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Schedule Interviews</h3>
            <p className="text-muted-foreground mb-4">
              Easily schedule interviews with companies through our integrated calendar system.
            </p>
          </div>
          
          <div className="bg-transparent p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
              <BarChart4 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Performance Analytics</h3>
            <p className="text-muted-foreground mb-4">
              Track your interview performance over time with detailed analytics and improvement suggestions.
            </p>
          </div>
          
          <div className="bg-transparent p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full inline-flex mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Expert Feedback</h3>
            <p className="text-muted-foreground mb-4">
              Get personalized feedback from industry professionals and AI-powered analysis systems.
            </p>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10">
          <h2 className="text-2xl font-bold mb-4">Ready to ace your interviews?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Join PlaceMate today and gain access to our comprehensive interview preparation tools.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
            Start Practicing Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewsPage;