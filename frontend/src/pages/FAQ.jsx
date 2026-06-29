import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FAQ.css";

function FAQ() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqs = [
    {
      category: "Internship",
      question: "What is the Vicharanashala Internship?",
      answer:
        "The Vicharanashala Internship is an Applied AI and Open Source Software Engineering internship program.",
    },
    {
      category: "Internship",
      question: "What is VINS?",
      answer:
        "VINS is the online internship track offered through Vicharanashala.",
    },
    {
      category: "NOC",
      question: "Who can sign the NOC?",
      answer:
        "Your HOD, Program Chair, or an authorized college faculty member can sign the NOC.",
    },
    {
      category: "NOC",
      question: "When do I submit the NOC?",
      answer:
        "Submit the NOC before your internship start date through the student portal.",
    },
    {
      category: "Certificate",
      question: "Will I receive a certificate?",
      answer:
        "Yes, eligible interns receive a completion certificate after successfully completing the internship.",
    },
    {
      category: "ViBe",
      question: "How do I log in to ViBe?",
      answer:
        "Use the same email address that you registered with during the internship application process.",
    },
    {
      category: "Team Formation",
      question: "Is team formation compulsory?",
      answer:
        "Yes, team formation is mandatory for Phase 2 project work.",
    },
    {
      category: "Attendance",
      question: "How many hours should I work daily?",
      answer:
        "Typically 4-6 hours per day depending on project requirements and learning activities.",
    },
  ];

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const quickTopics = [
    { label: "VINS", search: "VINS", category: "All" },
    { label: "NOC", search: "", category: "NOC" },
    { label: "attendance", search: "", category: "Attendance" },
    { label: "certificates", search: "", category: "Certificate" },
    { label: "team formation", search: "", category: "Team Formation" },
    { label: "ViBe", search: "", category: "ViBe" },
  ];

  const applyQuickTopic = (topic) => {
    setSearch(topic.search);
    setSelectedCategory(topic.category);
    setOpenIndex(null);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const keyword = search.toLowerCase();
    const matchesSearch =
      faq.question.toLowerCase().includes(keyword) ||
      faq.answer.toLowerCase().includes(keyword) ||
      faq.category.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="faq-page">
      <main className="faq-main">
        <header className="faq-header">
          <div>
            <button
              onClick={() => navigate("/welcome")}
              className="faq-back-button"
            >
              &lt; Back
            </button>

            <p className="faq-tagline">Help desk</p>

            <h1 className="faq-heading">Frequently asked questions</h1>
          </div>
        </header>

        <section className="faq-search-card">
          <input
            type="text"
            placeholder="Search FAQ by topic, keyword, or category"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenIndex(null);
            }}
            className="faq-search-input"
          />

          <div className="faq-category-list">
            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`faq-category-button${active ? " active" : ""}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <article
                key={`${faq.category}-${faq.question}`}
                className={`faq-accordion${openIndex === index ? " open" : ""}`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="faq-accordion-toggle"
                >
                  <span>
                    <span className="faq-question">
                      {faq.question}
                    </span>
                  </span>

                  <span
                    className={`faq-toggle-icon${openIndex === index ? " open" : ""}`}
                  >
                    {openIndex === index ? "-" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="faq-answer">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="faq-empty-state">
              <h2 className="faq-empty-heading">No matching FAQ found</h2>

              <p className="faq-empty-copy">
                Try a different keyword or use Query support directly if this is
                a specific case.
              </p>

              <button
                onClick={() => navigate("/ask")}
                className="faq-empty-button"
              >
                Query support
              </button>
            </div>
          )}
        </section>

        <section className="faq-cta">
          <h2 className="faq-cta-heading">Still stuck?</h2>
          <p className="faq-cta-copy">
            If the FAQ does not cover your situation, send your question to Query support or leave feedback.
          </p>
          <div className="faq-cta-actions">
            <button
              onClick={() => navigate("/ask")}
              className="faq-cta-button"
            >
              Query support
            </button>
            <button
              onClick={() => navigate("/feedback")}
              className="faq-secondary-button"
            >
              Feedback
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FAQ;
