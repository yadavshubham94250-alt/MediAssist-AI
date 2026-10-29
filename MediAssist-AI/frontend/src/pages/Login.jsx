import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("Signing you in...");
    setMessageType("loading");


    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );


      const data = await response.json();


      if (
        response.ok &&
        data.message === "Login successful"
      ) {

        localStorage.setItem(
          "user_id",
          data.user_id
        );

        localStorage.setItem(
          "user_name",
          data.name
        );

       sessionStorage.setItem(
  "user_id",
  data.user_id
);

sessionStorage.setItem(
  "user_name",
  data.name
);

sessionStorage.setItem(
  "user_email",
  data.email || email.trim()
);

sessionStorage.setItem(
  "user_role",
  data.role || "patient"
);


        setMessage(
          "Login successful! Redirecting..."
        );

        setMessageType("success");


        setTimeout(() => {
          navigate("/dashboard");
        }, 700);

      } else {

        setMessage(
          data.message || "Invalid email or password."
        );

        setMessageType("error");
      }


    } catch (error) {

      console.error(error);

      setMessage(
        "Unable to connect to the server. Please make sure the backend is running."
      );

      setMessageType("error");

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="auth-page">


      {/* LEFT BRAND PANEL */}

      <section className="auth-brand-panel">

        <div className="brand-content">

          <Link
            to="/"
            className="auth-logo"
          >

            <span className="auth-logo-icon">
              ✦
            </span>

            <span>
              MediAssist
            </span>

          </Link>


          <div className="brand-message">

            <span className="brand-badge">
              AI-POWERED HEALTHCARE
            </span>

            <h1>
              Your health.
              <br />
              <span>
                Smarter assistance.
              </span>
            </h1>

            <p>
              Understand your health information,
              medical reports and symptoms with
              personalized AI assistance.
            </p>

          </div>


          <div className="brand-features">

            <div className="brand-feature">
              <span>✦</span>
              <div>
                <strong>
                  AI Health Assistant
                </strong>
                <p>
                  Get simple health information
                  whenever you need it.
                </p>
              </div>
            </div>


            <div className="brand-feature">
              <span>▣</span>
              <div>
                <strong>
                  Medical Report Intelligence
                </strong>
                <p>
                  Upload reports and understand
                  extracted information.
                </p>
              </div>
            </div>


            <div className="brand-feature">
              <span>♡</span>
              <div>
                <strong>
                  Personalized Health Context
                </strong>
                <p>
                  Build a clearer picture of your
                  health information over time.
                </p>
              </div>
            </div>

          </div>

        </div>


        <div className="brand-footer">
          MediAssist AI • Healthcare Information Assistant
        </div>

      </section>


      {/* RIGHT FORM PANEL */}

      <section className="auth-form-panel">

        <div className="auth-form-container">


          <div className="mobile-logo">

            <span className="auth-logo-icon">
              ✦
            </span>

            MediAssist

          </div>


          <div className="auth-heading">

            <span>
              WELCOME BACK
            </span>

            <h2>
              Sign in to MediAssist
            </h2>

            <p>
              Continue to your personalized
              healthcare dashboard.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleLogin}
          >


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  disabled={loading}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <div className="label-row">

                <label htmlFor="login-password">
                  Password
                </label>

                <span className="helper-text">
                  Keep it secure
                </span>

              </div>


              <div className="input-wrapper">

                <span className="input-icon">
                  •
                </span>

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  disabled={loading}
                  required
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>

              </div>

            </div>


            {/* MESSAGE */}

            {message && (

              <div
                className={`auth-message ${messageType}`}
              >

                <span>
                  {messageType === "success"
                    ? "✓"
                    : messageType === "error"
                    ? "!"
                    : "•"}
                </span>

                {message}

              </div>

            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span>→</span>
                </>
              )}

            </button>


          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-switch">

            Don't have an account?

            <Link to="/register">
              Create one
            </Link>

          </p>


          <p className="auth-disclaimer">
            MediAssist AI provides general healthcare
            information and does not replace professional
            medical advice.
          </p>


        </div>

      </section>

    </div>
  );
}

export default Login;