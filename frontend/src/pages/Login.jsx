import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Login.css";
import heroImage from "../assets/image.png";

function Login() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Enter Email");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter Valid Email");
      return;
    }

    if (!password) {
      alert("Enter Password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        {
          email: email.trim(),
          password,
        }
      );

      const user = response.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/welcome");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to connect to server. Please try again.";

      if (message === "The password you entered is incorrect.") {
        setPopupTitle("Wrong Password");
      } else if (
        message.includes("couldn't find an account")
      ) {
        setPopupTitle("Account Not Found");
      } else {
        setPopupTitle("Login Failed");
      }

      setPopupMessage(message);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <div className="card auth-card">
          <h1 className="title">SAMAGAMA</h1>

          <p className="subtitle">
            Sign In To Continue
          </p>

          <form
            onSubmit={handleLogin}
            className="auth-form"
          >
            <input
              className="input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="glow-btn full-width-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Have you not signed in yet?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() =>
                  navigate("/signup")
                }
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="auth-side">
          <img
            className="login-side-image"
            src={heroImage}
            alt="Login illustration"
          />
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-card">
              <h3>{popupTitle}</h3>

              <p>{popupMessage}</p>

              <button
                className="popup-btn"
                onClick={() =>
                  setShowPopup(false)
                }
              >
                Try Again
              </button>

              <button
                className="popup-close"
                onClick={() =>
                  navigate("/signup")
                }
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;