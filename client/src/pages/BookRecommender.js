import React, { useState } from "react";
import API_ENDPOINTS from "../config";

const initialForm = {
  subject: "",
  audience: ""
};

export default function BookRecommender() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(API_ENDPOINTS.GET_BOOKS, {
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
      setResult(data);
    } catch (err) {
      console.error("Error getting book recommendations:", err);
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        form: form
      });
      setError(err.message || "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Book Recommender
          </h1>
          <p className="text-gray-300 text-lg">Discover the perfect textbooks and resources for your course</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Subject</label>
                <input 
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Data Science, Machine Learning" 
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Audience</label>
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
                  Finding Recommendations...
                </div>
              ) : (
                "Get Recommendations"
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
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recommended Textbooks
              </h3>
              <div className="grid gap-4">
                {result.textbooks?.map((book, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <h4 className="font-semibold text-white text-lg">{book.title}</h4>
                    <p className="text-purple-300">by {book.author} ({book.year})</p>
                    <p className="text-gray-300 text-sm mt-2">{book.suitability}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Online Resources
              </h3>
              <div className="grid gap-4">
                {result.online_resources?.map((res, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <a 
                      href={res.url} 
                      className="text-purple-300 hover:text-purple-200 font-medium underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {res.title}
                    </a>
                    <p className="text-gray-300 text-sm mt-1">
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs mr-2">
                        {res.type}
                      </span>
                      {res.description}
                    </p>
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