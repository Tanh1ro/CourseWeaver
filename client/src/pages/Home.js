import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link, icon }) => (
  <Link to={link} className="block bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-full p-6 sm:p-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome to CourseWeaver
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Your all-in-one AI assistant for designing, evaluating, and enhancing university courses. 
          Streamline your curriculum development and create impactful learning experiences.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="Course Builder"
            description="Generate a comprehensive course syllabus, including goals, weekly breakdowns, and assessments, with just a few inputs."
            link="/course-builder"
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 15.0212 2 19.5 2C23.9788 2 27.5 6.02122 27.5 10.5C27.5 14.9788 23.9788 19 19.5 19C15.0212 19 12 14.7472 12 14.7472" transform="translate(-4 -1)" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 8.97878 2 4.5 2C0.021219 2 -3.5 6.02122 -3.5 10.5C-3.5 14.9788 0.021219 19 4.5 19C8.97878 19 12 14.7472 12 14.7472" transform="translate(4 -1)" /></svg>}
          />
          <FeatureCard 
            title="Syllabus Evaluator"
            description="Upload an existing syllabus to get an AI-powered analysis of its strengths, weaknesses, and areas for improvement."
            link="/evaluator"
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <FeatureCard 
            title="Book Recommender"
            description="Find the perfect textbooks and online resources for any subject, tailored to your specified audience."
            link="/book-recommender"
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 15.0212 2 19.5 2C23.9788 2 27.5 6.02122 27.5 10.5C27.5 14.9788 23.9788 19 19.5 19C15.0212 19 12 14.7472 12 14.7472" transform="translate(-4 -1)" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.25278C12 6.25278 8.97878 2 4.5 2C0.021219 2 -3.5 6.02122 -3.5 10.5C-3.5 14.9788 0.021219 19 4.5 19C8.97878 19 12 14.7472 12 14.7472" transform="translate(4 -1)" /></svg>}
          />
          <FeatureCard 
            title="Outcome Checker"
            description="Analyze the quality of a course outcome against Bloom's Taxonomy and receive suggestions for improvement."
            link="/outcome-checker"
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>
      </div>
    </div>
  );
} 