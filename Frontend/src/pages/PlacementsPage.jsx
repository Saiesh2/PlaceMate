import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, ArrowRight, Briefcase, MapPin, Calendar, ChevronsUp, SearchCheck } from 'lucide-react';

const PlacementsPage = () => {
  const [activeCompany, setActiveCompany] = useState(0);
  
  const companies = [
    {
      name: "Google",
      roles: ["Software Engineer", "Product Manager", "UX Designer"],
      location: "Multiple Locations",
      deadline: "Ongoing"
    },
    {
      name: "Microsoft",
      roles: ["Cloud Developer", "Data Scientist", "Technical Program Manager"],
      location: "Remote & Onsite",
      deadline: "June 15, 2025"
    },
    {
      name: "Amazon",
      roles: ["SDE Intern", "Business Analyst", "Operations Manager"],
      location: "Bangalore, India",
      deadline: "May 30, 2025"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Briefcase className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Placement Opportunities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect <span className="text-primary">Placement</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            AI-powered matching system connects you with companies that align with your skills, 
            experiences, and career goals.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Why Use PlaceMate?</h2>
            
            <div className="bg-transparent p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg inline-flex mb-3">
                <SearchCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">Our AI analyzes your resume and preferences to find the best fitting opportunities.</p>
            </div>
            
            <div className="bg-transparent p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg inline-flex mb-3">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Curated Companies</h3>
              <p className="text-muted-foreground">Access vetted placement opportunities from top companies across industries.</p>
            </div>
            
            <div className="bg-transparent p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-lg inline-flex mb-3">
                <ChevronsUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-lg mb-2">Application Tracking</h3>
              <p className="text-muted-foreground">Monitor all your applications in one place with real-time status updates.</p>
            </div>
          </div>
          
          {/* Interactive Demo */}
          <div className="col-span-2 bg-transparent rounded-xl shadow-md overflow-hidden border border-muted/30">
            <div className="p-4 bg-muted/20 border-b border-muted/30 flex justify-between items-center">
              <h3 className="font-medium">Featured Opportunities</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Demo View</span>
            </div>
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Company List */}
              <div className="w-full md:w-1/3 border-r border-muted/30">
                {companies.map((company, index) => (
                  <div 
                    key={index}
                    className={`p-4 border-b border-muted/30 cursor-pointer transition-colors ${
                      activeCompany === index ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-muted/10'
                    }`}
                    onClick={() => setActiveCompany(index)}
                  >
                    <h4 className="font-medium">{company.name}</h4>
                    <p className="text-sm text-muted-foreground">{company.roles.length} open positions</p>
                  </div>
                ))}
              </div>
              
              {/* Company Details */}
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-xl font-semibold mb-4">{companies[activeCompany].name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{companies[activeCompany].location}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Application Deadline: {companies[activeCompany].deadline}</span>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Available Roles:</h4>
                  <ul className="space-y-2">
                    {companies[activeCompany].roles.map((role, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-muted/30 pt-4 mt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-4">Create an account to apply for these positions</p>
                  <Link 
                    to="/signup" 
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Join PlaceMate <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5">
          <h2 className="text-2xl font-bold mb-4">Ready to find your dream placement?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Join thousands of students who have successfully secured top positions through PlaceMate.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlacementsPage;