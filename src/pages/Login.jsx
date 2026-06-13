import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./Login.css";
import heroImage from "../assets/image.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Enter Email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!password) {
      setError("Enter Password");
      return;
    }

    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.user.email);
      navigate("/faq");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className="card auth-card">

          <h1 className="title">
            SAMAGAMA
          </h1>

          <p className="subtitle">
            Sign In To Continue
          </p>

        <input
          className="input"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error-message">{error}</div>}

        <button
          className="glow-btn full-width-btn"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Have you not signed in yet?{' '}
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>
        </div>

        </div>

        <div className="auth-side">
          <img className="login-side-image" src={heroImage} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
