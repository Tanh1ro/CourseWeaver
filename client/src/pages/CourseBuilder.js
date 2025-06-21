import React, { useState } from "react";

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
      if (!res.ok) throw new Error("Failed to generate course");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Course Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Course Title" className="w-full border p-2 rounded" />
        <input name="credits" value={form.credits} onChange={handleChange} required placeholder="Credits (e.g. 3)" className="w-full border p-2 rounded" />
        <input name="ltp" value={form.ltp} onChange={handleChange} required placeholder="L:T:P (e.g. 2:0:2)" className="w-full border p-2 rounded" />
        <input name="audience" value={form.audience} onChange={handleChange} required placeholder="Audience (e.g. B.Tech CSE)" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Generating..." : "Generate Course"}</button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {result && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-2">Generated Syllabus</h3>
          <div className="mb-4">
            <h4 className="font-semibold">Modules</h4>
            <ul className="list-disc ml-6">
              {result.modules?.map((mod, i) => (
                <li key={i}><b>{mod.title}</b> ({mod.hours} hrs): {mod.description}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Outcomes</h4>
            <ul className="list-disc ml-6">
              {result.outcomes?.map((o, i) => (
                <li key={i}><b>{o.text}</b> <span className="text-xs bg-gray-200 rounded px-2">{o.bloom_level}</span><br/>{o.description}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Labs & Tutorials</h4>
            <ul className="list-disc ml-6">
              {result.labs?.map((lab, i) => (
                <li key={i}><b>{lab.title}</b> (Module {lab.module}, {lab.duration}): {lab.description}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">Textbooks</h4>
            <ul className="list-disc ml-6">
              {result.textbooks?.map((book, i) => (
                <li key={i}><b>{book.title}</b> by {book.author} ({book.year})</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold">References</h4>
            <ul className="list-disc ml-6">
              {result.references?.map((ref, i) => (
                <li key={i}><a href={ref.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{ref.title}</a>: {ref.description}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 