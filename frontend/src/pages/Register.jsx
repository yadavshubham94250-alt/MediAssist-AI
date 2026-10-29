import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();


  const getPasswordStrength = () => {

    if (!password) {
      return {
        label: "",
        width: 0,
        level: "",
      };
    }


    let score = 0;


    if (password.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }


    if (score <= 1) {
      return {
        label: "Weak password",
        width: 25,
        level: "weak",
      };
    }


    if (score === 2) {
      return {
        label: "Fair password",
        width: 50,
        level: "fair",
      };
    }


    if (score === 3) {
      return {
        label: "Good password",
        width: 75,
        level: "good",
      };
    }


    return {
      label: "Strong password",
      width: 100,
      level: "strong",
    };
  };


  const passwordStrength =
    getPasswordStrength();


  const handleRegister = async (e) => {

    e.preventDefault();

    setMessage("");
    setMessageType("");


    if (name.trim().length < 2) {

      setMessage(
        "Please enter your full name."
      );

      setMessageType("error");

      return;
    }


    if (!email.trim()) {

      setMessage(
        "Please enter your email address."
      );

      setMessageType("error");

      return;
    }


    if (password.length < 8) {

      setMessage(
        "Password must contain at least 8 characters."
      );

      setMessageType("error");

      return;
    }


    if (password !== confirmPassword) {

      setMessage(
        "Passwords do not match."
      );

      setMessageType("error");

      return;
    }


    setLoading(true);

    setMessage(
      "Creating your account..."
    );

    setMessageType("loading");


    try {

      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );


      const data =
        await response.json();


      if (
        response.ok &&
        data.message ===
          "Registration successful"
      ) {

        setMessage(
          "Account created successfully! Redirecting to login..."
        );

        setMessageType("success");


        setTimeout(() => {
          navigate("/login");
        }, 1200);

      } else {

        setMessage(
          data.message ||
            "Registration failed."
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
              PERSONALIZED HEALTHCARE
            </span>

            <h1>
              Your health journey,
              <br />
              <span>
                all in one place.
              </span>
            </h1>

            <p>
              Organize your health information,
              understand medical reports and
              interact with your AI healthcare
              assistant.
            </p>

          </div>


          <div className="brand-features">

            <div className="brand-feature">

              <span>✓</span>

              <div>

                <strong>
                  Secure Account
                </strong>

                <p>
                  Your account keeps your
                  personal healthcare workspace
                  organized.
                </p>

              </div>

            </div>


            <div className="brand-feature">

              <span>▣</span>

              <div>

                <strong>
                  Medical Documents
                </strong>

                <p>
                  Upload and understand your
                  healthcare documents.
                </p>

              </div>

            </div>


            <div className="brand-feature">

              <span>✦</span>

              <div>

                <strong>
                  AI Assistance
                </strong>

                <p>
                  Get clear, easy-to-understand
                  health information.
                </p>

              </div>

            </div>

          </div>

        </div>


        <div className="brand-footer">
          MediAssist AI • Generative Healthcare Assistant
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
              GET STARTED
            </span>

            <h2>
              Create your account
            </h2>

            <p>
              Start building your personalized
              healthcare workspace.
            </p>

          </div>


          <form
            className="auth-form"
            onSubmit={handleRegister}
          >


            {/* NAME */}

            <div className="form-group">

              <label htmlFor="register-name">
                Full Name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ◉
                </span>

                <input
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  autoComplete="name"
                  disabled={loading}
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="register-email"
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

              <label htmlFor="register-password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  •
                </span>

                <input
                  id="register-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
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


              {password && (

                <div className="password-strength">

                  <div className="strength-track">

                    <div
                      className={`strength-fill ${passwordStrength.level}`}
                      style={{
                        width: `${passwordStrength.width}%`,
                      }}
                    />

                  </div>

                  <span
                    className={`strength-label ${passwordStrength.level}`}
                  >
                    {passwordStrength.label}
                  </span>

                </div>

              )}

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label htmlFor="register-confirm">
                Confirm Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  •
                </span>

                <input
                  id="register-confirm"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  autoComplete="new-password"
                  disabled={loading}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword
                    ? "◉"
                    : "◌"}
                </button>

              </div>


              {confirmPassword && (

                <p
                  className={
                    password ===
                    confirmPassword
                      ? "password-match"
                      : "password-no-match"
                  }
                >
                  {password === confirmPassword
                    ? "✓ Passwords match"
                    : "! Passwords do not match"}
                </p>

              )}

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


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <span>→</span>
                </>
              )}

            </button>


          </form>


          <div className="auth-divider">
            <span>or</span>
          </div>


          <p className="auth-switch">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </p>


          <p className="auth-disclaimer">
            By creating an account, you acknowledge
            that MediAssist AI provides general
            healthcare information and is not a
            substitute for professional medical advice.
          </p>


        </div>

      </section>

    </div>
  );
}

export default Register;