import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';

const ResumeDemo = () => {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-500 mb-4">
            AI Resume Builder Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create professional resumes with the power of AI
          </p>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-transparent rounded-lg shadow-lg p-6 border border-white"
          >
            <div className="text-blue-600 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
            <p className="text-gray-600 mb-4">
              Generate professional resume content using advanced AI technology
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-transparent rounded-lg shadow-lg p-6 border border-white"
          >
            <div className="text-blue-600 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Templates</h3>
            <p className="text-gray-600 mb-4">
              Choose from various professional templates to showcase your experience
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-transparent rounded-lg shadow-lg p-6 border border-white"
          >
            <div className="text-blue-600 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
            <p className="text-gray-600 mb-4">
              Export your resume as PDF with just one click
            </p>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeDemo; 