import React, { useState } from "react";
import API_ENDPOINTS from "../config";

export default function CourseOutcomeChecker() {
  const [outcome, setOutcome] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(API_ENDPOINTS.CHECK_OUTCOME, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outcome })
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
      console.error("Error checking outcome:", err);
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        outcome: outcome
      });
      setError(err.message || "Failed to check outcome");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Outcome Quality Checker
          </h1>
          <p className="text-gray-300 text-lg">Analyze and improve your course outcomes with AI-powered insights</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Course Outcome</label>
              <textarea
                value={outcome}
                onChange={e => setOutcome(e.target.value)}
                required
                placeholder="Paste a course outcome here to analyze its quality, Bloom's taxonomy alignment, and get improvement suggestions..."
                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 min-h-[120px] resize-none"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing Outcome...
                </div>
              ) : (
                "Check Outcome"
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
                Analysis Results
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{result.current_bloom_level}</div>
                  <div className="text-purple-300 text-sm">Bloom Level</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{result.quality_score}</div>
                  <div className="text-pink-300 text-sm">Quality Score / 10</div>
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
              <h4 className="font-semibold text-xl mb-4 text-blue-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Suggested Improvements
              </h4>
              <div className="space-y-2">
                {result.suggested_improvements?.map((imp, i) => (
                  <div key={i} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-blue-300">
                    {imp}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h4 className="font-semibold text-xl mb-4 text-purple-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Improved Outcome
              </h4>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
                <p className="text-white font-medium leading-relaxed">{result.improved_outcome}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 