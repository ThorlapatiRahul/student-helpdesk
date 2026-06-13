import { Link } from "react-router-dom";
import "./Dashboard.css";

const actions = [
  { title: "Browse FAQs", text: "Find quick answers before raising a query.", link: "/faq" },
  { title: "Ask a Query", text: "Submit a new helpdesk request with details.", link: "/ask" },
  { title: "AI Chatbot", text: "Get guided help in a conversational flow.", link: "/ai-chatbot?mode=client" },
];

function ClientDashboard() {
  return (
    <main className="dashboard-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Client Dashboard</p>
          <h1>Student Helpdesk Hub</h1>
        </div>
        <nav className="topbar-actions" aria-label="Client actions">
          <Link to="/ai-chatbot?mode=client">AI Chatbot</Link>
          <Link to="/ask">New Query</Link>
        </nav>
      </section>

      <section className="student-hero">
        <div>
          <p className="panel-label">Today</p>
          <h2>Get support without waiting in line</h2>
          <p>
            Search FAQs, ask the AI assistant, or submit a query to the helpdesk team
            from one focused dashboard.
          </p>
        </div>
        <Link className="primary-link" to="/ai-chatbot?mode=client">
          Start AI Chat
        </Link>
      </section>

      <section className="action-grid">
        {actions.map((action) => (
          <Link className="action-card" to={action.link} key={action.title}>
            <span>{action.title}</span>
            <p>{action.text}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default ClientDashboard;
