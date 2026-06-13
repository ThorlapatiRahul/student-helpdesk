import { useState } from "react";
import "../App.css";

function Chat() {
  const [message, setMessage] = useState(() => localStorage.getItem("query") || "");
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    setError("");
    if (!message && !file) {
      setError("Enter a question or upload a file.");
      return;
    }
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (message) formData.append("message", message);
      if (file) formData.append("file", file);

      const responseData = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = await responseData.json();
      if (!responseData.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      // Save to history
      const chatEntry = {
        id: Date.now(),
        question: message,
        answer: data.response,
        fileName: file?.name || null,
      };
      setHistory((prev) => [chatEntry, ...prev]);
      setResponse(data.response);
      // Clear input fields
      setMessage("");
      setFile(null);
    } catch (e) {
      setResponse(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Student AI Mentor</h1>
        <textarea
          className="textarea"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br /><br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <br />
        <button className="glow-btn" onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#1f2937",
            borderRadius: "15px",
          }}
        >
          <h2>AI Response</h2>
          <p>{response || "Your response will appear here after sending a question."}</p>
          {file && (
            <p>
              Uploaded File: <strong>{file.name}</strong>
            </p>
          )}
        </div>
        {history.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h2>Recent AI Conversations</h2>
            {history.map((item) => (
              <div
                key={item.id}
                style={{
                  marginTop: "18px",
                  padding: "16px",
                  background: "#fffaf3",
                  border: "1px solid #e5ded2",
                  borderRadius: "12px",
                  color: "#111827",
                }}
              >
                <p><strong>You asked:</strong> {item.question}</p>
                {item.fileName && (
                  <p><strong>File:</strong> {item.fileName}</p>
                )}
                <p><strong>AI Mentor:</strong> {item.answer}</p>
              </div>
            ))}
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default Chat;
