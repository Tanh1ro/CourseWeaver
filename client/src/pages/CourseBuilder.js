import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const initialForm = {
  title: "",
  credits: "",
  ltp: "",
  audience: ""
};

export default function CourseBuilder() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const syllabusRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/generate-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      // Log the response for debugging
      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);
      
      if (!res.ok) {
        let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          console.log("Error response data:", errorData);
          errorMessage = errorData.detail || errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          console.log("Could not parse error response as JSON");
          const textError = await res.text();
          console.log("Error response text:", textError);
          errorMessage = textError || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const data = await res.json();
      console.log("Success response data:", data);
      
      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.error + (data.details ? `: ${data.details}` : ''));
      }
      
      setResult(data);
    } catch (err) {
      console.error("Error generating course:", err);
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        form: form
      });
      setError(err.message || "Failed to generate course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const input = syllabusRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      let position = 0;
      let heightLeft = height;

      pdf.addImage(imgData, "PNG", 0, position, width, height);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - height;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, width, height);
        heightLeft -= pdfHeight;
      }
      pdf.save(`syllabus-${result?.course_title?.replace(/ /g, "_")}.pdf`);
    });
  };

  return (
    <div className="min-h-full p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Course Builder
          </h1>
          <p className="text-gray-300 text-lg">Generate comprehensive course syllabi with AI assistance</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Course Title</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Introduction to Machine Learning" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Credits</label>
                <input 
                  name="credits" 
                  value={form.credits} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 3" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">L:T:P Ratio</label>
                <input 
                  name="ltp" 
                  value={form.ltp} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 2:0:2" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Target Audience</label>
                <input 
                  name="audience" 
                  value={form.audience} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. B.Tech CSE, M.Tech AI" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Generating Course...
                </div>
              ) : (
                "Generate Course"
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-8 bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-red-300">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Generated Syllabus
              </h3>
              <button 
                onClick={handleDownloadPDF} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download PDF
              </button>
            </div>
            
            <div ref={syllabusRef} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-white">
              <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {result.course_title}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <p className="bg-white/5 rounded-lg p-3">
                  <strong className="text-purple-300">Duration:</strong> {result.duration}
                </p>
                <p className="bg-white/5 rounded-lg p-3">
                  <strong className="text-purple-300">Target Audience:</strong> {result.target_audience}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-3 text-purple-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Course Goals
                </h4>
                <div className="grid gap-2">
                  {result.course_goals?.map((goal, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 border-l-4 border-purple-500">
                      {goal}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-3 text-pink-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Tools & Technologies
                </h4>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="mb-2"><strong className="text-purple-300">Programming Language:</strong> {result.tools_and_technologies?.programming_language}</p>
                  <p className="mb-3"><strong className="text-purple-300">Development Environment:</strong> {result.tools_and_technologies?.development_environment}</p>
                  <h5 className="font-semibold mb-2 text-pink-300">Key Libraries:</h5>
                  <div className="flex flex-wrap gap-2">
                    {result.tools_and_technologies?.key_libraries?.map((lib, i) => (
                      <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {lib}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-3 text-green-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Weekly Breakdown
                </h4>
                <div className="space-y-4">
                  {result.weekly_breakdown?.map((week, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-4 border-l-4 border-green-500">
                      <h5 className="font-bold text-lg mb-3 text-green-300">Week {week.week}: {week.theme}</h5>
                      <div className="ml-4 space-y-3">
                        <div>
                          <h6 className="font-semibold text-purple-300 mb-2">Learning Objectives:</h6>
                          <div className="grid gap-2">
                            {week.learning_objectives?.map((obj, j) => (
                              <div key={j} className="bg-white/5 rounded p-2 text-sm">
                                {obj}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h6 className="font-semibold text-pink-300 mb-2">Daily Plan:</h6>
                          <div className="space-y-2">
                            {week.daily_plan?.map((day, k) => (
                              <div key={k} className="bg-white/5 rounded p-3">
                                <strong className="text-white">Day {day.day}: {day.topic}</strong>
                                <p className="text-gray-300 text-sm mt-1">{day.description}</p>
                                <p className="text-purple-300 text-sm mt-1 italic">Lab: {day.lab}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-3 text-yellow-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Assessment
                </h4>
                <div className="grid gap-2">
                  {result.assessment?.details?.map((item, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-purple-300 font-medium">{item.type}</span>
                      <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                        {item.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-xl mb-3 text-blue-300 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recommended Resources
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-3 text-purple-300">Books:</h5>
                    <div className="space-y-2">
                      {result.recommended_resources?.books?.map((book, i) => (
                        <div key={i} className="bg-white/5 rounded p-2 text-sm">
                          "{book.title}" by {book.author}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-3 text-pink-300">Online Platforms:</h5>
                    <div className="space-y-2">
                      {result.recommended_resources?.online_platforms?.map((platform, i) => (
                        <div key={i} className="bg-white/5 rounded p-2 text-sm">
                          {platform}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 