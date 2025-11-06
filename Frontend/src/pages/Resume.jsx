import React, { useState, useRef } from "react";
import {
  Download,
  Sparkles,
  Wand2,
  Zap,
  RefreshCw,
  ChevronRight,
  Check,
  Loader2,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Trophy,
  Lightbulb,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  X,
  Copy,
  Eye,
  Save,
} from "lucide-react";

const AIResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const resumeRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const fonts = [
    { name: "Inter", preview: "Modern & Clean", style: "font-sans" },
    { name: "Roboto", preview: "Professional", style: "font-sans" },
    { name: "Poppins", preview: "Elegant", style: "font-sans" },
    { name: "Open Sans", preview: "Friendly", style: "font-sans" },
    { name: "Lato", preview: "Sophisticated", style: "font-sans" },
  ];

  // Fixed theme configuration with proper color mappings
  const themes = [
    {
      name: "modern",
      label: "Modern Blue",
      colors: {
        gradient: "from-blue-50 via-indigo-50 to-blue-100",
        primary: "#2563eb",
        secondary: "#3b82f6",
        accent: "#60a5fa",
        text: "#1e40af",
        border: "#3b82f6",
      },
    },
    {
      name: "classic",
      label: "Classic Gray",
      colors: {
        gradient: "from-gray-50 via-slate-50 to-gray-100",
        primary: "#1f2937",
        secondary: "#374151",
        accent: "#6b7280",
        text: "#111827",
        border: "#374151",
      },
    },
    {
      name: "creative",
      label: "Creative Purple",
      colors: {
        gradient: "from-purple-50 via-pink-50 to-purple-100",
        primary: "#9333ea",
        secondary: "#a855f7",
        accent: "#c084fc",
        text: "#7e22ce",
        border: "#a855f7",
      },
    },
    {
      name: "corporate",
      label: "Corporate Green",
      colors: {
        gradient: "from-green-50 via-emerald-50 to-green-100",
        primary: "#059669",
        secondary: "#10b981",
        accent: "#34d399",
        text: "#047857",
        border: "#10b981",
      },
    },
    {
      name: "minimal",
      label: "Minimal Black",
      colors: {
        gradient: "from-slate-50 via-zinc-50 to-slate-100",
        primary: "#0f172a",
        secondary: "#334155",
        accent: "#64748b",
        text: "#1e293b",
        border: "#475569",
      },
    },
  ];

  const templates = [
    {
      name: "professional",
      layout: "Single Column",
      description: "Traditional format, ATS-friendly",
      icon: "📄",
    },
    {
      name: "modern",
      layout: "Two Column",
      description: "Contemporary design with sidebar",
      icon: "📱",
    },
    {
      name: "creative",
      layout: "Asymmetric",
      description: "Creative layout for design roles",
      icon: "🎨",
    },
    {
      name: "executive",
      layout: "Detailed",
      description: "Comprehensive format for senior roles",
      icon: "💼",
    },
    {
      name: "entry-level",
      layout: "Compact",
      description: "Perfect for new graduates",
      icon: "🎓",
    },
  ];

  // Enhanced AI Summary Generation with better personalization
  const generateAISummary = async () => {
    setIsGenerating(true);
    setShowAiPanel(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { name, location } = resumeData.personalInfo;
    const skillCount = resumeData.skills.length;
    const expCount = resumeData.experience.length;
    const eduCount = resumeData.education.length;
    const topSkills = resumeData.skills.slice(0, 3).join(", ") || "modern technologies";

    const aiVariations = [
      `Results-driven professional with expertise in ${topSkills}, bringing ${expCount > 0 ? `${expCount}+ years of` : "proven"} experience in delivering high-impact solutions. Demonstrated track record of driving organizational success through innovative problem-solving, strategic thinking, and collaborative leadership in dynamic environments.`,

      `Passionate ${eduCount > 0 ? "graduate" : "professional"} specializing in ${topSkills} with a proven ability to transform complex challenges into elegant, scalable solutions. Committed to excellence in user experience and business objectives while fostering continuous improvement and team growth.`,

      `Dynamic technology professional with a strong foundation in ${topSkills} and agile methodologies. Known for exceptional analytical abilities, attention to detail, and commitment to delivering high-quality work. Experienced in collaborative environments${location ? `, based in ${location}` : ""}, ready to drive innovation.`,

      `Innovative problem solver combining deep technical expertise in ${topSkills} with strong communication and leadership capabilities. Consistent track record of exceeding stakeholder expectations while delivering projects on time and within budget. Passionate about creating maintainable, efficient solutions.`,

      `Detail-oriented professional with comprehensive experience in ${topSkills} and a talent for bridging technical capabilities with business needs. Skilled at architecting scalable solutions that drive measurable impact, enhance user satisfaction, and contribute to organizational goals.`,
    ];

    setAiSuggestions(aiVariations);
    setIsGenerating(false);
  };

  const generateSkillSuggestions = () => {
    const commonTechSkills = [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Git",
      "REST APIs",
      "GraphQL",
      "HTML/CSS",
      "Tailwind",
      "Express.js",
      "Redis",
      "CI/CD",
      "Agile",
    ];

    return commonTechSkills
      .filter(
        (skill) =>
          !resumeData.skills.some((s) =>
            s.toLowerCase().includes(skill.toLowerCase())
          )
      )
      .slice(0, 6);
  };

  const selectAISummary = (summary) => {
    setResumeData((prev) => ({ ...prev, summary }));
    setShowAiPanel(false);
    setAiSuggestions([]);
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", duration: "", description: "" },
      ],
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", year: "", gpa: "" },
      ],
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { name: "", description: "", technologies: "", link: "" },
      ],
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const updateEducation = (index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const updateProject = (index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const deleteExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const deleteEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const deleteProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const downloadResume = () => {
    window.print();
  };

  const selectedThemeData = themes.find((t) => t.name === selectedTheme);
  const selectedFontData = fonts.find((f) => f.name === selectedFont);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center mb-10">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Customize Your Resume
              </h2>
              <p className="text-gray-600 text-lg">
                Choose the perfect style that represents you
              </p>
            </div>

            {/* Font Selection */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Select Font
                  </h3>
                  <p className="text-sm text-gray-500">
                    Choose a font that matches your style
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {fonts.map((font) => (
                  <div
                    key={font.name}
                    onClick={() => setSelectedFont(font.name)}
                    className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedFont === font.name
                        ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg scale-105 ring-4 ring-blue-200"
                        : "border-gray-200 hover:border-blue-300 bg-white"
                    }`}
                  >
                    <div
                      className={`text-xl font-semibold mb-2 transition-colors ${
                        selectedFont === font.name
                          ? "text-blue-700"
                          : "text-gray-800"
                      }`}
                      style={{ fontFamily: font.name }}
                    >
                      Aa
                    </div>
                    <div className="text-sm font-medium mb-1">{font.name}</div>
                    <div className="text-xs text-gray-500">{font.preview}</div>
                    {selectedFont === font.name && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-blue-600 rounded-full p-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Selection with Fixed Colors */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Select Color Theme
                  </h3>
                  <p className="text-sm text-gray-500">
                    Pick a color scheme for your resume
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.name}
                    onClick={() => setSelectedTheme(theme.name)}
                    className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedTheme === theme.name
                        ? `shadow-lg scale-105 ring-4`
                        : "border-gray-200 hover:border-purple-300 bg-white"
                    }`}
                    style={{
                      borderColor:
                        selectedTheme === theme.name
                          ? theme.colors.primary
                          : undefined,
                      ringColor:
                        selectedTheme === theme.name
                          ? `${theme.colors.primary}33`
                          : undefined,
                    }}
                  >
                    <div className="font-semibold mb-3 text-gray-800">
                      {theme.label}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    {selectedTheme === theme.name && (
                      <div className="absolute top-3 right-3">
                        <div
                          className="rounded-full p-1"
                          style={{ backgroundColor: theme.colors.primary }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Select Template Layout
                  </h3>
                  <p className="text-sm text-gray-500">
                    Choose the structure that works best
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {templates.map((template) => (
                  <div
                    key={template.name}
                    onClick={() => setSelectedTemplate(template.name)}
                    className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedTemplate === template.name
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg scale-105 ring-4 ring-green-200"
                        : "border-gray-200 hover:border-green-300 bg-white"
                    }`}
                  >
                    <div className="text-4xl mb-3">{template.icon}</div>
                    <div className="capitalize font-bold text-xl mb-2 text-gray-800">
                      {template.name}
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {template.layout}
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.description}
                    </div>
                    {selectedTemplate === template.name && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-600 rounded-full p-1.5">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Personal Information
              </h2>
              <p className="text-gray-600 text-lg">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  field: "name",
                  label: "Full Name",
                  placeholder: "John Doe",
                  type: "text",
                  icon: User,
                },
                {
                  field: "email",
                  label: "Email Address",
                  placeholder: "john@example.com",
                  type: "email",
                  icon: Mail,
                },
                {
                  field: "phone",
                  label: "Phone Number",
                  placeholder: "+1 (555) 123-4567",
                  type: "tel",
                  icon: Phone,
                },
                {
                  field: "location",
                  label: "Location",
                  placeholder: "City, State/Country",
                  type: "text",
                  icon: MapPin,
                },
                {
                  field: "linkedin",
                  label: "LinkedIn Profile",
                  placeholder: "linkedin.com/in/johndoe",
                  type: "url",
                  icon: Linkedin,
                },
                {
                  field: "portfolio",
                  label: "Portfolio Website",
                  placeholder: "www.johndoe.com",
                  type: "url",
                  icon: Globe,
                },
              ].map((input) => {
                const Icon = input.icon;
                return (
                  <div key={input.field} className="group">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      value={resumeData.personalInfo[input.field]}
                      onChange={(e) =>
                        updatePersonalInfo(input.field, e.target.value)
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
                      placeholder={input.placeholder}
                    />
                  </div>
                );
              })}
            </div>

            {/* Enhanced AI Summary Section */}
            <div className="p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl border-2 border-purple-300 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-xl">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <label className="text-xl font-bold text-gray-800">
                      Professional Summary
                    </label>
                    <p className="text-sm text-gray-600">
                      Let AI craft your perfect summary
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={generateAISummary}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        AI Generate
                      </>
                    )}
                  </button>
                  {resumeData.summary && (
                    <button
                      onClick={() =>
                        setResumeData((prev) => ({ ...prev, summary: "" }))
                      }
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all"
                      title="Clear summary"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData((prev) => ({ ...prev, summary: e.target.value }))
                }
                rows={5}
                className="w-full px-5 py-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none bg-white shadow-inner"
                placeholder="Write a brief professional summary highlighting your experience, skills, and career goals... or click 'AI Generate' for intelligent suggestions!"
              />

              {showAiPanel && aiSuggestions.length > 0 && (
                <div className="mt-5 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-sm font-bold text-purple-700 mb-3">
                    <Zap className="w-5 h-5" />
                    AI Generated Summaries - Click to Select:
                  </div>
                  {aiSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => selectAISummary(suggestion)}
                      className="p-5 bg-white border-2 border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
                        Option {index + 1}
                      </div>
                      <div className="flex items-start justify-between gap-4 mt-2">
                        <p className="text-sm text-gray-700 leading-relaxed flex-1">
                          {suggestion}
                        </p>
                        <ChevronRight className="w-6 h-6 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Skills Section */}
            <div className="p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 rounded-2xl border-2 border-blue-300 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <label className="text-xl font-bold text-gray-800">
                    Skills & Technologies
                  </label>
                  <p className="text-sm text-gray-600">
                    Add your technical and soft skills
                  </p>
                </div>
              </div>

              <input
                type="text"
                value={resumeData.skills.join(", ")}
                onChange={(e) =>
                  setResumeData((prev) => ({
                    ...prev,
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s),
                  }))
                }
                className="w-full px-5 py-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white shadow-inner"
                placeholder="JavaScript, React, Node.js, Python, Problem Solving... (separate with commas)"
              />

              {resumeData.skills.length > 0 &&
                generateSkillSuggestions().length > 0 && (
                  <div className="mt-5">
                    <div className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Suggested Skills to Add:
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {generateSkillSuggestions().map((skill, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setResumeData((prev) => ({
                              ...prev,
                              skills: [...prev.skills, skill],
                            }));
                          }}
                          className="px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 hover:border-blue-500 transition-all text-sm font-semibold shadow-sm hover:shadow-md transform hover:scale-105"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {resumeData.skills.length > 0 && (
                <div className="mt-5">
                  <div className="text-sm font-bold text-gray-700 mb-3">
                    Current Skills ({resumeData.skills.length}):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Preview Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? "Hide Preview" : "Quick Preview"}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Experience & Education
              </h2>
              <p className="text-gray-600 text-lg">
                Showcase your professional journey
              </p>
            </div>

            {/* Work Experience */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Briefcase className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Work Experience
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add your professional roles
                    </p>
                  </div>
                </div>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <span className="text-xl">+</span>
                  Add Experience
                </button>
              </div>

              {resumeData.experience.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-dashed border-blue-300">
                  <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-5 text-lg">
                    No experience added yet
                  </p>
                  <button
                    onClick={addExperience}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline"
                  >
                    Add your first experience →
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {resumeData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span className="text-sm font-bold text-blue-700">
                            Experience #{index + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteExperience(index)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Job Title (e.g., Software Engineer)"
                          value={exp.title}
                          onChange={(e) =>
                            updateExperience(index, "title", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(index, "company", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2023 - Present)"
                        value={exp.duration}
                        onChange={(e) =>
                          updateExperience(index, "duration", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition-all bg-white"
                      />
                      <textarea
                        placeholder="Job description and key achievements... (Tip: Use bullet points • and quantify your impact with numbers!)"
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(index, "description", e.target.value)
                        }
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <GraduationCap className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Education
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add your academic background
                    </p>
                  </div>
                </div>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <span className="text-xl">+</span>
                  Add Education
                </button>
              </div>

              {resumeData.education.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-dashed border-green-300">
                  <GraduationCap className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-5 text-lg">
                    No education added yet
                  </p>
                  <button
                    onClick={addEducation}
                    className="text-green-600 hover:text-green-700 font-semibold text-lg hover:underline"
                  >
                    Add your education →
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {resumeData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span className="text-sm font-bold text-green-700">
                            Education #{index + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteEducation(index)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Degree (e.g., B.S. Computer Science)"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Institution Name"
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(index, "institution", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Year (e.g., 2020 - 2024)"
                          value={edu.year}
                          onChange={(e) =>
                            updateEducation(index, "year", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional, e.g., 3.8/4.0)"
                          value={edu.gpa}
                          onChange={(e) =>
                            updateEducation(index, "gpa", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Code className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Projects
                    </h3>
                    <p className="text-sm text-gray-500">
                      Highlight your best work
                    </p>
                  </div>
                </div>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <span className="text-xl">+</span>
                  Add Project
                </button>
              </div>

              {resumeData.projects.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-300">
                  <Code className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-5 text-lg">
                    No projects added yet
                  </p>
                  <button
                    onClick={addProject}
                    className="text-purple-600 hover:text-purple-700 font-semibold text-lg hover:underline"
                  >
                    Add your first project →
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {resumeData.projects.map((project, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <span className="text-sm font-bold text-purple-700">
                            Project #{index + 1}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteProject(index)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-3 py-1 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) =>
                            updateProject(index, "name", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Technologies (e.g., React, Node.js, MongoDB)"
                          value={project.technologies}
                          onChange={(e) =>
                            updateProject(index, "technologies", e.target.value)
                          }
                          className="px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white"
                        />
                      </div>
                      <textarea
                        placeholder="Project description and key features..."
                        value={project.description}
                        onChange={(e) =>
                          updateProject(index, "description", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 resize-none transition-all bg-white"
                      />
                      <input
                        type="url"
                        placeholder="Project Link (GitHub, Live Demo, etc.)"
                        value={project.link}
                        onChange={(e) =>
                          updateProject(index, "link", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                Resume Preview
              </h2>
              <p className="text-gray-600 text-lg">
                Review and download your professional resume
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-bold text-lg"
              >
                <Download className="w-6 h-6" />
                Download Resume (PDF)
              </button>
              <button
                onClick={() => {
                  // Save to localStorage or database
                  localStorage.setItem(
                    "resumeData",
                    JSON.stringify(resumeData)
                  );
                  alert("Resume saved successfully!");
                }}
                className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                <Save className="w-5 h-5" />
                Save Draft
              </button>
            </div>

            {/* FIXED RESUME PREVIEW WITH PROPER THEME APPLICATION */}
            <div
              ref={resumeRef}
              className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-12 print:shadow-none print:rounded-none"
              style={{ fontFamily: selectedFontData?.name || "Inter" }}
            >
              <div className="space-y-8">
                {/* Header with Fixed Theme Colors */}
                <div
                  className="text-center border-b-4 pb-6"
                  style={{ borderColor: selectedThemeData?.colors.primary }}
                >
                  <h1
                    className="text-5xl font-bold mb-3"
                    style={{ color: selectedThemeData?.colors.text }}
                  >
                    {resumeData.personalInfo.name || "Your Name"}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {resumeData.personalInfo.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {resumeData.personalInfo.email}
                      </span>
                    )}
                    {resumeData.personalInfo.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {resumeData.personalInfo.phone}
                      </span>
                    )}
                    {resumeData.personalInfo.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {resumeData.personalInfo.location}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
                    {resumeData.personalInfo.linkedin && (
                      <span className="flex items-center gap-1">
                        <Linkedin className="w-4 h-4" />
                        {resumeData.personalInfo.linkedin}
                      </span>
                    )}
                    {resumeData.personalInfo.portfolio && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {resumeData.personalInfo.portfolio}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {resumeData.summary && (
                  <div>
                    <h2
                      className="text-2xl font-bold mb-3 uppercase tracking-wide"
                      style={{ color: selectedThemeData?.colors.text }}
                    >
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* Skills with Fixed Theme */}
                {resumeData.skills.length > 0 && (
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4 uppercase tracking-wide"
                      style={{ color: selectedThemeData?.colors.text }}
                    >
                      Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-lg text-sm font-semibold border-2"
                          style={{
                            backgroundColor: `${selectedThemeData?.colors.primary}15`,
                            borderColor: selectedThemeData?.colors.border,
                            color: selectedThemeData?.colors.text,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4 uppercase tracking-wide"
                      style={{ color: selectedThemeData?.colors.text }}
                    >
                      Work Experience
                    </h2>
                    <div className="space-y-5">
                      {resumeData.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-4 pl-5"
                          style={{
                            borderColor: selectedThemeData?.colors.primary,
                          }}
                        >
                          <h3 className="text-xl font-bold text-gray-800">
                            {exp.title}
                          </h3>
                          <div
                            className="font-semibold mb-2"
                            style={{ color: selectedThemeData?.colors.text }}
                          >
                            {exp.company}
                            {exp.duration && ` • ${exp.duration}`}
                          </div>
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4 uppercase tracking-wide"
                      style={{ color: selectedThemeData?.colors.text }}
                    >
                      Education
                    </h2>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-4 pl-5"
                          style={{
                            borderColor: selectedThemeData?.colors.primary,
                          }}
                        >
                          <h3 className="text-xl font-bold text-gray-800">
                            {edu.degree}
                          </h3>
                          <div
                            className="font-semibold"
                            style={{ color: selectedThemeData?.colors.text }}
                          >
                            {edu.institution}
                            {edu.year && ` • ${edu.year}`}
                            {edu.gpa && ` • GPA: ${edu.gpa}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4 uppercase tracking-wide"
                      style={{ color: selectedThemeData?.colors.text }}
                    >
                      Projects & Portfolio
                    </h2>
                    <div className="space-y-4">
                      {resumeData.projects.map((project, index) => (
                        <div
                          key={index}
                          className="border-l-4 pl-5"
                          style={{
                            borderColor: selectedThemeData?.colors.primary,
                          }}
                        >
                          <h3 className="text-xl font-bold text-gray-800">
                            {project.name}
                          </h3>
                          {project.technologies && (
                            <div className="text-sm font-semibold mb-2 text-gray-600">
                              Technologies: {project.technologies}
                            </div>
                          )}
                          <p className="text-gray-700 mb-2 leading-relaxed">
                            {project.description}
                          </p>
                          {project.link && (
                            <a
                              href={project.link}
                              className="text-sm font-semibold hover:underline"
                              style={{ color: selectedThemeData?.colors.primary }}
                            >
                              {project.link}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Resume Tips */}
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                Your Resume Score: 85/100
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span>ATS-friendly format ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span>Clear section headers ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span>Professional appearance ✓</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span>Contact info complete ✓</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
          <p className="text-gray-600 text-xl font-medium">
            Part of PLACEMATE - Your Career Companion
          </p>
        </div>

        {/* Enhanced Step Indicator */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-white rounded-2xl shadow-xl p-4 gap-3">
            {[
              { step: 1, title: "Style", icon: "🎨" },
              { step: 2, title: "Info", icon: "📝" },
              { step: 3, title: "Details", icon: "💼" },
              { step: 4, title: "Preview", icon: "👁️" },
            ].map((item, idx) => (
              <React.Fragment key={item.step}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
                    currentStep >= item.step
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110 shadow-lg"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  onClick={() => setCurrentStep(item.step)}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <div className="text-xs font-medium opacity-75">
                      Step {item.step}
                    </div>
                    <div className="font-bold">{item.title}</div>
                  </div>
                </div>
                {idx < 3 && (
                  <ChevronRight
                    className={`w-5 h-5 ${
                      currentStep > item.step
                        ? "text-purple-600"
                        : "text-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-10">
          <div>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-lg hover:shadow-xl text-lg"
              >
                ← Previous
              </button>
            )}
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Step {currentStep} of 4
            </div>
            <div className="w-80 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          <div>
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl text-lg"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setResumeData({
                    personalInfo: {
                      name: "",
                      email: "",
                      phone: "",
                      location: "",
                      linkedin: "",
                      portfolio: "",
                    },
                    summary: "",
                    experience: [],
                    education: [],
                    skills: [],
                    projects: [],
                  });
                }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-bold shadow-lg hover:shadow-xl text-lg"
              >
                Create New Resume
              </button>
            )}
          </div>
        </div>

        {/* PLACEMATE Features */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 shadow-lg border-2 border-purple-200 mb-10">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Explore More PLACEMATE Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl transform hover:scale-105">
              <div className="text-5xl mb-3">🎯</div>
              <h4 className="font-bold text-xl text-gray-800 mb-2">
                Goal Setting
              </h4>
              <p className="text-sm text-gray-600">
                Track your career milestones and achievements
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl transform hover:scale-105">
              <div className="text-5xl mb-3">👥</div>
              <h4 className="font-bold text-xl text-gray-800 mb-2">
                Community
              </h4>
              <p className="text-sm text-gray-600">
                Share experiences with fellow job seekers
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl transform hover:scale-105">
              <div className="text-5xl mb-3">📹</div>
              <h4 className="font-bold text-xl text-gray-800 mb-2">
                Video Calling
              </h4>
              <p className="text-sm text-gray-600">
                Get personalized placement guidance
              </p>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-300 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Lightbulb className="w-7 h-7 text-yellow-600" />
            Pro Tips for Your Resume
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium">
                Use strong action verbs to describe achievements
              </span>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium">
                Quantify accomplishments with specific numbers
              </span>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium">
                Tailor your resume for each job application
              </span>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl">
              <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="font-medium">
                Keep it concise - ideally 1-2 pages maximum
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Print Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @media print {
          body * {
            visibility: hidden;
          }

          .print\\:shadow-none,
          .print\\:shadow-none * {
            visibility: visible;
          }

          .print\\:shadow-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 40px !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          @page {
            margin: 0.5in;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
};

export default AIResumeBuilder;