import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import CourseBuilder from "./pages/CourseBuilder";
import CourseEvaluator from "./pages/CourseEvaluator";
import CourseOutcomeChecker from "./pages/CourseOutcomeChecker";
import BookRecommender from "./pages/BookRecommender";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course-builder" element={<CourseBuilder />} />
            <Route path="/evaluator" element={<CourseEvaluator />} />
            <Route path="/book-recommender" element={<BookRecommender />} />
            <Route path="/outcome-checker" element={<CourseOutcomeChecker />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
