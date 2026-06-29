import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import "./Overview.css";

function Overview() {
  const navigate = useNavigate();

  const facts = [
    ["Mode", "Online"],
    ["Duration", "2 months + 1 month grace"],
    ["Start", "Anytime in 2026"],
    ["Deadline", "31 December 2026"],
    ["Fee", "Free for selected candidates"],
    ["Stipend", "No stipend"],
  ];

  const attendanceRules = [
    "Attend at least 85% of live Zoom session time.",
    "Respond to at least 85% of in-session polls and quizzes.",
    "Attempt every quiz and score at least 50%.",
  ];

  const domains = [
    "AI/ML",
    "NLP",
    "LLMs",
    "Web development",
    "Systems",
    "Agriculture-tech",
    "Educational tech",
    "Open-source infrastructure",
  ];

  const badges = [
    {
      badge: "Bronze",
      icon: "🥉",
      phase: "1",
      description:
        "Training through a course or direct assignment, decided by your mentor based on what you already know.",
      required: "Usually - entry",
    },
    {
      badge: "Silver",
      icon: "🥈",
      phase: "2",
      description:
        "An open-source project carried out with a Vicharanashala mentor. This is the actual internship work.",
      required: "Yes - the actual work",
    },
    {
      badge: "Gold",
      icon: "🥇",
      phase: "3",
      description:
        "A genuinely significant Silver contribution that stands as a feature in itself.",
      required: "No - a quality mark on Silver",
    },
    {
      badge: "Platinum",
      icon: "🏆",
      phase: "4",
      description:
        "An open invitation to return to the lab in the next twelve months, with a nominal stipend on visit. The fourth star is earned during that visit.",
      required: "No - post-internship pathway",
    },
  ];

  return (
    <div className="overview-page">
      <main className="overview-main">
        <button
          onClick={() => navigate("/welcome")}
          className="overview-back-button"
        >
          &lt; Back
        </button>

        <p className="overview-tagline">VINS - Online</p>

        <h1 className="overview-heading">Vicharanashala Internship</h1>

        <p className="overview-intro">
          VINS is an online internship for candidates who performed well in the
          AI interview. You work from your own location, join live sessions, and
          solve mentor-assigned lab problems with serious daily focus.
        </p>

        <section className="overview-facts">
          {facts.map(([label, value]) => (
            <div key={label} className="overview-fact">
              <p className="overview-fact-label">{label}</p>
              <p className="overview-fact-value">{value}</p>
            </div>
          ))}
        </section>

        <div className="overview-grid">
          <section className="overview-card overview-full-width">
            <h2>The four-badge journey</h2>

            <p>
              This is the progression every intern follows. The first two badges
              are the internship proper; the last two are upside for unusually
              strong work.
            </p>

            <div className="overview-table">
              {['Badge', 'Phase', 'What it is', 'Required to complete?'].map(
                (heading) => (
                  <div key={heading} className="overview-table-header">
                    {heading}
                  </div>
                )
              )}

              {badges.map((item) => (
                <Fragment key={item.badge}>
                  <div className="overview-table-cell overview-table-text">
                    <span className="overview-table-icon">{item.icon}</span>
                    {item.badge}
                  </div>
                  <div className="overview-table-cell">{item.phase}</div>
                  <div className="overview-table-cell overview-table-text">
                    {item.description}
                  </div>
                  <div className="overview-table-cell overview-table-text">
                    {item.required}
                  </div>
                </Fragment>
              ))}
            </div>
          </section>

          <section className="overview-card">
            <h2>What we expect</h2>

            <p>
              This is a serious internship, not a summer job. Plan for 6 to 10
              hours of focused work each day, sometimes more, across the full
              internship window.
            </p>

            <p>
              The most common reason interns drop out midway is competing
              commitments: exams, other internships, job hunts, travel, or
              fragmented schedules. If you cannot give VINS full attention, wait
              for a better window and join when you can commit properly.
            </p>
          </section>

          <section className="overview-secondary-card">
            <h2>Attendance rules</h2>

            {attendanceRules.map((rule) => (
              <p key={rule} className="overview-attendance-rule">
                <strong className="overview-checkmark">✓</strong> {rule}
              </p>
            ))}

            <p className="overview-attendance-note">
              These rules are checked over a rolling window of the last five
              working days. If any one falls below the bar, you are moved to the
              next batch.
            </p>
          </section>
        </div>

        <section className="overview-card overview-domain-card">
          <h2>Project, technology, and domain</h2>

          <p>
            We do not pre-declare the problem you will work on. VINS is
            problem-centred: your mentor assigns a real lab problem based on
            your inclination and background, and you work backwards by learning
            the technology needed to solve it.
          </p>

          <div className="overview-domains">
            {domains.map((domain) => (
              <span key={domain} className="overview-domain">
                {domain}
              </span>
            ))}
          </div>

          <p>
            You may work on AI systems, language technology, web products,
            Annam.AI, ViBe, open-source infrastructure, or another area that fits
            the lab's current needs. Insisting on a specific stack after joining
            is not viewed favourably; candidates are expected to research the
            lab before applying.
          </p>
        </section>

        <section className="overview-cta">
          <div>
            <h2>Still have a question?</h2>
            <p>
              If you have a question this page doesn't answer, the FAQ covers
              most of it.
            </p>
          </div>

          <button
            onClick={() => navigate("/faq")}
            className="overview-cta-button"
          >
            Read FAQ
          </button>
        </section>
      </main>
    </div>
  );
}

export default Overview;
