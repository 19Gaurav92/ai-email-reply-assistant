"use client";
import { useState } from "react";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState("Professional");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, tone })
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">
        AI Email Reply Assistant
      </h1>

      <textarea
        className="w-full border rounded p-3"
        rows={6}
        placeholder="Paste client email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="border rounded p-2"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Professional</option>
        <option>Polished & Confident</option>
        <option>Short & Direct</option>
      </select>

      <button
        onClick={generate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      {reply && (
        <textarea
          className="w-full border rounded p-3"
          rows={6}
          value={reply}
          readOnly
        />
      )}
    </div>
  );
}
