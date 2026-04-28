import { useState } from "react";
import axios from "axios";

export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const share_feedback = async (username, email, feedback) => {
    const response = await axios.post(apiUrl, {
      username,
      email,
      feedback,
    });
    return response.data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    share_feedback(username, email, feedback);
    setSubmitted(true);
    setTimeout(() => {
      setUsername("");
      setEmail("");
      setFeedback("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-zinc-50 mb-2">
          Share your feedback
        </h1>
        <p className="text-zinc-400 mb-8">We'd love to hear what you think.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-zinc-200 mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
              placeholder="janedoe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-200 mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-colors"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-zinc-200 mb-1.5"
            >
              Feedback
            </label>
            <textarea
              id="feedback"
              required
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 transition-colors resize-none"
              placeholder="Tell us what's on your mind..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 text-zinc-950 py-2.5 rounded-md font-medium hover:bg-emerald-300 transition-colors"
          >
            {submitted ? "Thanks!" : "Submit feedback"}
          </button>
        </form>
      </div>
    </main>
  );
}
