import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const cards = [
    {
      title: "Ask Query",
      text: "Submit academic, internship, placement or university-related questions.",
      icon: "❓",
      color: "#2563eb",
      onClick: () => navigate("/ask"),
    },
    {
      title: "AI Mentor",
      text: "Get instant answers from your personal AI assistant.",
      icon: "🤖",
      color: "#7c3aed",
      onClick: () => navigate("/chat"),
    },
    {
      title: "FAQ",
      text: "Browse frequently asked questions and answers.",
      icon: "📚",
      color: "#f59e0b",
      onClick: () => navigate("/faq"),
    },
    {
      title: "Vibe",
      text: "Proceed with your courses.",
      icon: "⛳️",
      color: "#059669",
      onClick: () => {
        window.location.href =
          "https://vibe.vicharanashala.ai/student";
      },
    },
  ];

  return (
    <div className="welcome-page">
      <main className="welcome-main">
        <h1 className="welcome-heading">
          Welcome to Samagama!
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "#4b5563",
            marginTop: "-10px",
            marginBottom: "20px",
          }}
        >
          {greeting}, {user?.name || "Student"} 👋
        </p>

        <p className="welcome-copy">
          Quick Actions
        </p>

        <div className="welcome-divider" />

        <section className="welcome-cards">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={card.onClick}
              className="welcome-card"
            >
              <span
                className="welcome-card-icon"
                style={{ background: card.color }}
              >
                {card.icon}
              </span>

              <span className="welcome-card-content">
                <span className="welcome-card-title">
                  {card.title}
                </span>

                <span className="welcome-card-text">
                  {card.text}
                </span>
              </span>

              <span className="welcome-card-arrow">
                &gt;
              </span>
            </button>
          ))}
        </section>

        <div style={{ marginTop: "40px" }}>
          <h2>Recent Questions</h2>

          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            No recent questions yet.
          </div>
        </div>
      </main>
    </div>
  );
}

export default Welcome;