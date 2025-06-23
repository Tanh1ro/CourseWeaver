import React, { useState } from "react";
import API_ENDPOINTS from "../config";

export default function CourseEvaluator() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(API_ENDPOINTS.UPLOAD_SYLLABUS, {
        method: "POST",
        body: formData
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
      setResult(data);
    } catch (err) {
      console.error("Error analyzing syllabus:", err);
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        fileName: file?.name
      });
      setError(err.message || "Failed to analyze syllabus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Course Evaluator
          </h1>
          <p className="text-gray-300 text-lg">Analyze and improve your course syllabus with AI-powered insights</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Upload Syllabus</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500/50 transition-all duration-300">
                <input 
                  type="file" 
                  accept=".docx,.pdf" 
                  onChange={handleFile} 
                  className="hidden" 
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 mx-auto text-white/50 mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <p className="text-white/70 mb-2">Click to upload or drag and drop</p>
                  <p className="text-white/50 text-sm">DOCX, PDF (max 10MB)</p>
                  {file && (
                    <p className="text-purple-300 mt-2 font-medium">{file.name}</p>
                  )}
                </label>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
              disabled={loading || !file}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing Syllabus...
                </div>
              ) : (
                "Upload & Analyze"
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
          <div className="mt-8 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Syllabus Analysis
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{result.overall_score}</div>
                  <div className="text-purple-300 text-sm">Overall Score</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{result.completeness_score}</div>
                  <div className="text-pink-300 text-sm">Completeness</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{result.bloom_alignment}</div>
                  <div className="text-green-300 text-sm">Bloom Alignment</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 text-green-300 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Strengths
                  </h4>
                  <div className="space-y-2">
                    {result.strengths?.map((s, i) => (
                      <div key={i} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-300">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3 text-red-300 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Weaknesses
                  </h4>
                  <div className="space-y-2">
                    {result.weaknesses?.map((w, i) => (
                      <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300">
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-yellow-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Missing Elements
              </h4>
              <div className="grid gap-2">
                {result.missing_elements?.map((m, i) => (
                  <div key={i} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-yellow-300">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-blue-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Recommendations
              </h4>
              <div className="grid gap-2">
                {result.recommendations?.map((r, i) => (
                  <div key={i} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-blue-300">
                    {r}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-purple-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Outcome Analysis
              </h4>
              <div className="space-y-4">
                {result.outcome_analysis?.map((o, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-white">{o.outcome}</h5>
                      <div className="flex gap-2">
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                          {o.bloom_level}
                        </span>
                        <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full text-xs">
                          {o.quality}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{o.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 