"use client";
import { useState } from "react";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState("Professional");
  const [reply, setReply] = useState("");

  async function generate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, tone })
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Email Reply Assistant</h1>

      <textarea
        placeholder="Paste client email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        rows={6}
        style={{ width: "100%", marginTop: 20 }}
      />

      <select onChange={(e) => setTone(e.target.value)}>
        <option>Professional</option>
        <option>Polished & Confident</option>
        <option>Short & Direct</option>
      </select>

      <button onClick={generate} style={{ display: "block", marginTop: 20 }}>
        Generate Reply
      </button>

      {reply && (
        <textarea
          value={reply}
          readOnly
          rows={6}
          style={{ width: "100%", marginTop: 20 }}
        />
      )}
    </div>
  );
}
// Dashboard page placeholder
