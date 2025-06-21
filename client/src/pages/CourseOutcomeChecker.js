import React, { useState } from "react";

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
      const res = await fetch("/api/check-outcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outcome })
      });
      if (!res.ok) throw new Error("Failed to check outcome");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Outcome Quality Checker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={outcome}
          onChange={e => setOutcome(e.target.value)}
          required
          placeholder="Paste a course outcome here..."
          className="w-full border p-2 rounded min-h-[80px]"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Checking..." : "Check Outcome"}</button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {result && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-2">Analysis</h3>
          <div className="mb-2">Bloom Level: <b>{result.current_bloom_level}</b></div>
          <div className="mb-2">Quality Score: <b>{result.quality_score}</b> / 10</div>
          <div className="mb-4">
            <h4 className="font-semibold">Strengths</h4>
            <ul className="list-disc ml-6">
              {result.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Weaknesses</h4>
            <ul className="list-disc ml-6">
              {result.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Suggested Improvements</h4>
            <ul className="list-disc ml-6">
              {result.suggested_improvements?.map((imp, i) => <li key={i}>{imp}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Improved Outcome</h4>
            <div className="bg-gray-100 p-2 rounded">{result.improved_outcome}</div>
          </div>
        </div>
      )}
    </div>
  );
} 