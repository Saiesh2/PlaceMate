import React, { forwardRef } from "react";
import { Download } from "lucide-react";
import ResumeHeader from "../ResumeComponents/ResumeHeader";
import ResumeSection from "../ResumeComponents/ResumeSection";
import ExperienceItem from "../ResumeComponents/ExperienceItem";
import EducationItem from "../ResumeComponents/EducationItem";
import ProjectItem from "../ResumeComponents/ProjectItem";

const ResumePreview = forwardRef(
  (
    { resumeData, selectedFontClass, selectedThemeColors, downloadResume },
    ref
  ) => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Preview & Download
          </h2>
          <button
            onClick={downloadResume}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
          >
            <Download size={20} />
            Download Resume
          </button>
        </div>

        <div
          ref={ref}
          className={`${selectedFontClass} ${
            selectedThemeColors?.colors || "text-black bg-white border-gray-200"
          } p-8 max-w-4xl mx-auto shadow-2xl print:shadow-none print:max-w-none`}
          style={{ minHeight: "842px" }}
        >
          {resumeData && resumeData.personalInfo && (
            <ResumeHeader personalInfo={resumeData.personalInfo} />
          )}

          {resumeData && resumeData.summary && (
            <ResumeSection
              title="Professional Summary"
              selectedThemeColors={selectedThemeColors}
            >
              <p className="text-sm leading-relaxed">{resumeData.summary}</p>
            </ResumeSection>
          )}

          {resumeData?.skills?.length > 0 && (
            <ResumeSection
              title="Skills"
              selectedThemeColors={selectedThemeColors}
            >
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm ${selectedThemeColors.accent}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </ResumeSection>
          )}

          {resumeData?.experience?.length > 0 && (
            <ResumeSection
              title="Work Experience"
              selectedThemeColors={selectedThemeColors}
            >
              {resumeData.experience.map((exp, idx) => (
                <ExperienceItem
                  key={idx}
                  exp={exp}
                  accent={selectedThemeColors.accent}
                />
              ))}
            </ResumeSection>
          )}

          {resumeData?.education?.length > 0 && (
            <ResumeSection
              title="Education"
              selectedThemeColors={selectedThemeColors}
            >
              {resumeData.education.map((edu, idx) => (
                <EducationItem
                  key={idx}
                  edu={edu}
                  accent={selectedThemeColors.accent}
                />
              ))}
            </ResumeSection>
          )}

          {resumeData?.projects?.length > 0 && (
            <ResumeSection
              title="Projects"
              selectedThemeColors={selectedThemeColors}
            >
              {resumeData.projects.map((project, idx) => (
                <ProjectItem
                  key={idx}
                  project={project}
                  accent={selectedThemeColors.accent}
                />
              ))}
            </ResumeSection>
          )}
        </div>
      </div>
    );
  }
);

export default ResumePreview ;
