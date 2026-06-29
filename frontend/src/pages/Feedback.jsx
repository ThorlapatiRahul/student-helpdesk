import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const submitFeedback = () => {
    if (!feedback.trim()) {
      alert("Please enter your feedback before submitting.");
      return;
    }

    alert("Thank you for your feedback!");
    localStorage.setItem("feedback", feedback.trim());
    setFeedback("");
    navigate("/faq");
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Send Feedback</h1>
        <p className="subtitle">
          Help us improve by sharing your thoughts, suggestions, or any issues you encountered.
        </p>

        <textarea
          className="textarea"
          rows={8}
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        <button className="glow-btn" onClick={submitFeedback}>
          Submit Feedback
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/faq")}
        >
          Back to FAQ
        </button>
      </div>
    </div>
  );
}

export default Feedback;
