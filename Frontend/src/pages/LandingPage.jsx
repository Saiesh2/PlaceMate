import React from 'react';
import { 
  FileText, 
  Video, 
  Users, 
  Calendar, 
  Trophy,
  Target,
  BarChart,
  Clock,
  Briefcase,
  Building,
  GraduationCap,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from '../Components/card';
import { Link } from 'react-router-dom';

const features = [
  {
    Icon: FileText,
    title: "Smart Resume Shortlisting",
    description: "AI-powered resume analysis to match you with the perfect placement opportunities"
  },
  {
    Icon: Video,
    title: "P2P Video Interviews",
    description: "Seamless video calling platform for remote interviews with potential employers"
  },
  {
    Icon: Target,
    title: "Goal Setting",
    description: "Set and track personalized career goals with milestone celebrations"
  },
  {
    Icon: Calendar,
    title: "Interview Prep Scheduler",
    description: "Structured preparation timelines to help you ace every interview"
  },
  {
    Icon: BarChart,
    title: "Progress Analytics",
    description: "Visualize your placement journey with comprehensive progress tracking"
  },
  {
    Icon: Users,
    title: "Peer Community",
    description: "Connect with fellow students and share placement experiences and tips"
  },
  {
    Icon: Briefcase,
    title: "Industry Insights",
    description: "Get valuable industry knowledge and company-specific preparation guides"
  },
  {
    Icon: CheckCircle,
    title: "Skill Assessment",
    description: "Identify and develop key skills needed for your dream placement"
  }
];

const FeatureCard = ({ Icon, title, description }) => (
  <Card className="transform hover:scale-105 transition-all duration-300 border-l-4 border-primary">
    <CardContent className="p-6">
      <Icon className="w-8 h-8 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Button = ({ variant = 'primary', children, ...props }) => (
  <button
    className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
      variant === 'primary'
        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
        : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
    }`}
    {...props}
  >
    {children}
  </button>
);

const TestimonialCard = ({ name, role, content }) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="mb-4 text-primary">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg">★</span>
        ))}
      </div>
      <p className="text-muted-foreground mb-6 flex-grow">{content}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

const StatCard = ({ number, label }) => (
  <div className="text-center p-6 bg-muted/30 rounded-lg">
    <p className="text-4xl font-bold text-primary mb-2">{number}</p>
    <p className="text-muted-foreground">{label}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Video/Image Option */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video Option - Can be replaced with an image */}
        <div className="absolute inset-0 z-0">
          {/* Video background - uncomment and adjust src as needed */}
          <video 
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="/854213-hd_1280_720_24fps.mp4"
          />
          
          {/* Image background - default option */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/api/placeholder/1920/1080')",
              // Replace with actual background image
              // backgroundImage: "url('/path-to-your-image.jpg')",
              backgroundColor: "rgba(0,0,0,0.5)",
              backgroundBlendMode: "overlay"
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center p-4">
          <div className="mb-6 flex justify-center">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Unlock Your Career with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              PlaceMate
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Your AI-powered companion for the entire placement journey - from resume to interview success
          </p>
          <div className="space-x-4">
            <Link to='/signup'><Button>Get Started Free</Button></Link>
            <Button variant="secondary">Watch Demo</Button>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Your Path to Placement Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimize Your Resume</h3>
              <p className="text-muted-foreground">Get AI-powered suggestions to make your resume stand out to recruiters</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prepare & Practice</h3>
              <p className="text-muted-foreground">Follow structured preparation plans and practice with mock interviews</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Land Your Dream Role</h3>
              <p className="text-muted-foreground">Connect with employers through our seamless video interview platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Placement-Focused Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard number="90%" label="Placement Success Rate" />
            <StatCard number="5000+" label="Students Placed" />
            <StatCard number="1000+" label="Partner Companies" />
            <StatCard number="24/7" label="Support & Guidance" />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Raj Patel"
              role="Software Engineer @ Google"
              content="PlaceMate's resume optimizer helped me refine my CV to highlight exactly what tech companies look for. The interview prep modules were spot on for technical interviews."
            />
            <TestimonialCard
              name="Priya Sharma"
              role="Data Scientist @ Amazon"
              content="The goal setting and progress tracking features kept me motivated throughout my placement journey. The P2P interview practice was invaluable for building confidence."
            />
            <TestimonialCard
              name="Arjun Mehta"
              role="Product Manager @ Microsoft"
              content="From resume shortlisting to final interview, PlaceMate guided me through each step. Their industry insights were crucial in helping me understand what companies expect."
            />
          </div>
        </div>
      </div>

      {/* Partner Companies */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Our Partner Companies
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Replace with actual company logos */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-32 h-16 bg-muted/50 rounded flex items-center justify-center">
                <p className="text-muted-foreground">Company {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-white to-muted/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Begin Your Placement Journey</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have secured their dream placements with
            PlaceMate's intelligent placement platform.
          </p>
          <div className="space-x-4">
            <Link to='/signup'><Button>Create Free Account</Button></Link>
            <Button variant="secondary">Schedule Demo</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PlaceMate</h3>
              <p className="text-muted-foreground">Your AI-powered companion for the entire placement journey</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Resume Shortlisting</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">P2P Video Interviews</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Goal Setting</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Progress Tracking</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Success Stories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Support</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Partner With Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} PlaceMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;