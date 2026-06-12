import { useEffect, useState } from "react";
import "../App.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedQuery = localStorage.getItem("query");
    if (savedQuery) {
      setMessage(savedQuery);
    }
  }, []);

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

      const chatEntry = {
        id: Date.now(),
        question: message,
        answer: data.response,
        fileName: file?.name || null,
      };

      setHistory((prev) => [chatEntry, ...prev]);
      setResponse(data.response);
      setMessage("");
      setFile(null);
    } catch (chatError) {
      setError(chatError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Student AI Mentor</h1>
        <p className="subtitle">Ask your AI mentor using FAQ knowledge and upload files for context.</p>

        <textarea
          className="textarea"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div style={{ marginTop: "12px" }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0] || null)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="glow-btn" onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>

        <div
          style={{
<<<<<<< Updated upstream
            marginTop:"30px",
            padding:"20px",
            background:"#fffaf3",
            border:"1px solid #e5ded2",
            borderRadius:"15px",
            color:"#111827"
=======
            marginTop: "30px",
            padding: "20px",
            background: "#1f2937",
            borderRadius: "15px",
>>>>>>> Stashed changes
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
                  background: "#111827",
                  borderRadius: "12px",
                }}
              >
                <p><strong>You asked:</strong> {item.question}</p>
                {item.fileName && <p><strong>File:</strong> {item.fileName}</p>}
                <p><strong>AI Mentor:</strong> {item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
