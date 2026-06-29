  import { useState } from "react";
  import axios from "axios";
  import "../App.css";

  function Chat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
      if (!message.trim() && !file) {
        alert("Enter Question Or Upload File");
        return;
      }

      try {
        setLoading(true);

        const res = await axios.post(
          "http://localhost:5001/ai-chat",
          {
            question: message,
          }
        );

        setResponse(res.data.answer);
      } catch (error) {
        console.error(error);

        setResponse(
          "❌ Failed to get AI response. Check backend and API key."
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="page">
        <div className="card">
          <h1 className="title">
            Student AI Mentor
          </h1>

          <textarea
            className="textarea"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <br />
          <br />

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <br />
          <br />

          <button
            className="glow-btn"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send"}
          </button>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "#fffaf3",
              border: "1px solid #e5ded2",
              borderRadius: "15px",
              color: "#111827",
              minHeight: "150px",
            }}
          >
            <h2>🤖 AI Response</h2>

            <p>
              {response ||
                "Ask a question and the AI answer will appear here."}
            </p>

            {file && (
              <p>
                📎 Uploaded File: {file.name}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default Chat;