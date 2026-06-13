import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function AskQuery() {
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const submitQuery = async () => {
    if (!query.trim()) {
      setPopupMessage("Please Enter Question");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/ask",
        {
          question: query,
        }
      );

      setPopupMessage(response.data.message);

      setShowPopup(true);

      setQuery("");
    } catch (error) {
      setPopupMessage(
        error.response?.data?.message ||
        "Failed to submit question"
      );

      setShowPopup(true);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">
          Ask Your Question
        </h1>

        <p className="subtitle">
          Describe your issue
        </p>

        <textarea
          className="textarea"
          placeholder="Example: How can I apply for leave?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="glow-btn"
          onClick={submitQuery}
        >
          Submit Question
        </button>

        <button
          className="glow-btn"
          onClick={() => navigate("/chat")}
          style={{ marginLeft: "15px" }}
        >
          Ask AI Mentor
        </button>

        <button
          className="secondary-btn ask-feedback-link"
          onClick={() => navigate("/feedback")}
        >
          Send Feedback
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h2 className="popup-title">
              Success 🎉
            </h2>

            <p className="popup-message">
              {popupMessage}
            </p>

            <button
              className="popup-btn"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AskQuery;