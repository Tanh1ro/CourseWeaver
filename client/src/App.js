import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CourseBuilder from "./pages/CourseBuilder";
import CourseEvaluator from "./pages/CourseEvaluator";
import BookRecommender from "./pages/BookRecommender";
import CourseOutcomeChecker from "./pages/CourseOutcomeChecker";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white p-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">CourseWeaver</h1>
            <nav className="space-x-4">
              <Link to="/" className="hover:underline">Course Builder</Link>
              <Link to="/evaluator" className="hover:underline">Evaluator</Link>
              <Link to="/books" className="hover:underline">Book Recommender</Link>
              <Link to="/outcome-checker" className="hover:underline">Outcome Checker</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<CourseBuilder />} />
            <Route path="/evaluator" element={<CourseEvaluator />} />
            <Route path="/books" element={<BookRecommender />} />
            <Route path="/outcome-checker" element={<CourseOutcomeChecker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
