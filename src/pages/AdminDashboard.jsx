import { Link } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  { label: "Open queries", value: "24" },
  { label: "Urgent", value: "6" },
  { label: "Resolved today", value: "18" },
  { label: "FAQ candidates", value: "9" },
];

const queue = [
  "Payment receipt not updated",
  "Admission document verification",
  "Scholarship form correction",
  "Exam timetable clarification",
];

function AdminDashboard() {
  return (
    <main className="dashboard-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Helpdesk Control Center</h1>
        </div>
        <nav className="topbar-actions" aria-label="Admin actions">
          <Link to="/ai-chatbot?mode=admin">AI Chatbot</Link>
          <Link to="/faq">Manage FAQs</Link>
        </nav>
      </section>

      <section className="stat-grid">
        {stats.map((stat) => (
          <article className="metric-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="work-panel">
          <p className="panel-label">Live Queue</p>
          <h2>Student issues needing attention</h2>
          <div className="issue-list">
            {queue.map((item, index) => (
              <div className="issue-row" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
                <button type="button">Review</button>
              </div>
            ))}
          </div>
        </article>

        <article className="ai-panel">
          <p className="panel-label">AI Assistant</p>
          <h2>Work faster with smart drafts</h2>
          <p>
            Ask AI to summarize student queries, create reply drafts, find repeated
            problems, and suggest new FAQ entries for the knowledge base.
          </p>
          <Link className="primary-link" to="/ai-chatbot?mode=admin">
            Open Admin AI
          </Link>
        </article>
      </section>
    </main>
  );
}

export default AdminDashboard;
