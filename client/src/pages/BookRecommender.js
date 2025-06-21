import React, { useState } from "react";

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
      const res = await fetch("/api/get-books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed to get recommendations");
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
      <h2 className="text-xl font-semibold mb-4">Book Recommender</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Subject (e.g. Data Science)" className="w-full border p-2 rounded" />
        <input name="audience" value={form.audience} onChange={handleChange} required placeholder="Audience (e.g. B.Tech CSE)" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Recommending..." : "Get Recommendations"}</button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {result && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-2">Recommended Textbooks</h3>
          <ul className="list-disc ml-6 mb-4">
            {result.textbooks?.map((book, i) => (
              <li key={i}><b>{book.title}</b> by {book.author} ({book.year})<br/><span className="text-xs">{book.suitability}</span></li>
            ))}
          </ul>
          <h3 className="font-bold text-lg mb-2">Online Resources</h3>
          <ul className="list-disc ml-6">
            {result.online_resources?.map((res, i) => (
              <li key={i}><a href={res.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{res.title}</a> ({res.type}): {res.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 