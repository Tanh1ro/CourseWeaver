import React, { useState } from "react";

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
      const res = await fetch("/api/upload-syllabus", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("Failed to analyze syllabus");
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
      <h2 className="text-xl font-semibold mb-4">Course Evaluator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept=".docx,.pdf" onChange={handleFile} className="w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading || !file}>{loading ? "Analyzing..." : "Upload & Analyze"}</button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {result && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-2">Syllabus Analysis</h3>
          <div className="mb-2">Overall Score: <b>{result.overall_score}</b> / 10</div>
          <div className="mb-2">Completeness: <b>{result.completeness_score}</b> / 10</div>
          <div className="mb-2">Bloom Alignment: <b>{result.bloom_alignment}</b> / 10</div>
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
            <h4 className="font-semibold">Missing Elements</h4>
            <ul className="list-disc ml-6">
              {result.missing_elements?.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Recommendations</h4>
            <ul className="list-disc ml-6">
              {result.recommendations?.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Outcome Analysis</h4>
            <ul className="list-disc ml-6">
              {result.outcome_analysis?.map((o, i) => (
                <li key={i}><b>{o.outcome}</b> <span className="text-xs bg-gray-200 rounded px-2">{o.bloom_level}</span> <span className="text-xs">({o.quality})</span><br/>{o.suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 