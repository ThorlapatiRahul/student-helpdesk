import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css";

const starterPrompts = {
  client: [
    "How do I check my query status?",
    "What documents are needed for admission?",
    "How can I contact the helpdesk?",
  ],
  admin: [
    "Summarize urgent student issues",
    "Draft a reply for pending fee queries",
    "Suggest FAQs from repeated questions",
  ],
};

const knowledgeBase = [
  {
    keywords: ["fee", "payment", "refund", "receipt"],
    answer:
      "For payment questions, keep the transaction ID, date, amount, and receipt screenshot ready before raising a support query.",
  },
  {
    keywords: ["noc", "document", "documents", "verification", "hod"],
    answer:
      "For NOC or document support, check whether your HOD, Program Chair, or an authorized college faculty member can sign it, then submit it before the internship start date.",
  },
  {
    keywords: ["certificate", "completion"],
    answer:
      "Eligible interns receive a completion certificate after successfully completing the internship requirements.",
  },
  {
    keywords: ["vibe", "login", "account"],
    answer:
      "For ViBe login, use the same email address that you registered with during the internship application process.",
  },
  {
    keywords: ["team", "formation", "phase"],
    answer:
      "Team formation is mandatory for Phase 2 project work, so confirm your team details early.",
  },
  {
    keywords: ["attendance", "hours", "daily"],
    answer:
      "Interns typically work 4-6 hours per day depending on project requirements and learning activities.",
  },
];

function getMode(search) {
  const params = new URLSearchParams(search);
  return params.get("mode") === "admin" ? "admin" : "client";
}

function buildLocalAnswer(message, mode) {
  const normalized = message.toLowerCase();
  const match = knowledgeBase.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (match) {
    return match.answer;
  }

  if (mode === "admin") {
    return "Admin assistant note: I can help you triage student queries, draft helpful replies, identify repeated questions, and turn common issues into FAQs.";
  }

  return "Student assistant note: I can help with FAQs, query status, admissions, payments, documents, and how to raise a clear support request.";
}

function AIChatbot() {
  const location = useLocation();
  const mode = getMode(location.search);
  const prompts = starterPrompts[mode];
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        mode === "admin"
          ? "Welcome admin. I can help you review query patterns, draft replies, and improve the FAQ knowledge base."
          : "Hi. I am your student helpdesk assistant. Ask me about FAQs, admissions, documents, payments, or query status.",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const title = useMemo(
    () => (mode === "admin" ? "Admin AI Command Desk" : "Student AI Helpdesk"),
    [mode],
  );

  async function askBot(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    setMessages((current) => [...current, { role: "user", text: cleanText }]);
    setInput("");
    setIsThinking(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: cleanText, mode }),
      });

      if (!response.ok) {
        throw new Error("Chat API unavailable");
      }

      const data = await response.json();
      const answer =
        data.response ||
        data.reply ||
        data.answer ||
        data.message ||
        buildLocalAnswer(cleanText, mode);

      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: buildLocalAnswer(cleanText, mode) },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    askBot(input);
  }

  return (
    <main className="dashboard-shell chatbot-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">AI Chatbot</p>
          <h1>{title}</h1>
        </div>
        <nav className="topbar-actions" aria-label="Dashboard navigation">
          <Link to="/client-dashboard">Client</Link>
          <Link to="/admin-dashboard">Admin</Link>
        </nav>
      </section>

      <section className="chatbot-layout">
        <aside className="chatbot-context">
          <p className="panel-label">Mode</p>
          <h2>{mode === "admin" ? "Admin support" : "Student support"}</h2>
          <p>
            {mode === "admin"
              ? "Use the assistant to prepare replies, find repeated issues, and decide what belongs in the FAQ."
              : "Ask simple questions and get quick help before raising a support request."}
          </p>
          <div className="prompt-stack">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => askBot(prompt)}
                disabled={isThinking}
              >
                {prompt}
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-window" aria-label="AI chatbot conversation">
          <div className="message-list">
            {messages.map((message, index) => (
              <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === "assistant" ? "AI" : "You"}</span>
                <p>{message.text}</p>
              </article>
            ))}
            {isThinking && (
              <article className="message assistant">
                <span>AI</span>
                <p>Thinking through the best helpdesk answer...</p>
              </article>
            )}
          </div>

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              aria-label="Message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                mode === "admin"
                  ? "Ask for a reply draft, summary, or FAQ suggestion"
                  : "Ask your student helpdesk question"
              }
            />
            <button type="submit" disabled={isThinking}>
              Send
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

export default AIChatbot;
