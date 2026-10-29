import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import MedicalReports from "./pages/MedicalReports";
import SymptomAssistant from "./pages/SymptomAssistant";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

import "./Home.css";


function Home() {

  const navigate = useNavigate();

  const isLoggedIn =
    !!localStorage.getItem("user_id");


  return (
    <div className="home-page">

      {/* =================================
          NAVBAR
      ================================= */}

      <header className="home-navbar">

        <Link
          to="/"
          className="home-logo"
        >

          <span className="home-logo-icon">
            ✦
          </span>

          <span>
            MediAssist
          </span>

        </Link>


        <nav className="home-nav">

          <a href="#features">
            Features
          </a>

          <a href="#how-it-works">
            How it works
          </a>

          <a href="#about">
            About
          </a>

        </nav>


        <div className="home-nav-actions">

          {isLoggedIn ? (

            <button
              className="home-dashboard-button"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Dashboard →
            </button>

          ) : (
            <>
              <Link
                to="/login"
                className="home-login-link"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="home-register-button"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </header>


      {/* =================================
          HERO
      ================================= */}

      <main>

        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">

              <span className="status-dot"></span>

              AI-POWERED HEALTHCARE ASSISTANT

            </div>


            <h1>

              Understand your health
              <br />

              <span>
                with greater clarity.
              </span>

            </h1>


            <p className="hero-description">

              MediAssist AI helps you understand
              symptoms, medical reports and
              health information through
              personalized generative AI assistance.

            </p>


            <div className="hero-actions">

              <Link
                to={
                  isLoggedIn
                    ? "/dashboard"
                    : "/register"
                }
                className="hero-primary-button"
              >

                {isLoggedIn
                  ? "Open Dashboard"
                  : "Get Started"}

                <span>→</span>

              </Link>


              <Link
                to="/login"
                className="hero-secondary-button"
              >
                Sign In
              </Link>

            </div>


            <div className="hero-trust">

              <span>
                ✓ Personalized
              </span>

              <span>
                ✓ AI-powered
              </span>

              <span>
                ✓ Easy to understand
              </span>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="visual-glow"></div>


            <div className="health-orbit orbit-one">
              <span></span>
            </div>

            <div className="health-orbit orbit-two">
              <span></span>
            </div>


            <div className="health-center-card">

              <div className="center-icon">
                ✦
              </div>

              <span className="center-label">
                MEDIASSIST AI
              </span>

              <h3>
                Your health,
                <br />
                intelligently organized.
              </h3>

              <p>
                Connect your health information
                in one personalized workspace.
              </p>


              <div className="mini-status">

                <span></span>

                AI Assistant Ready

              </div>

            </div>


            <div className="floating-card report-card">

              <div className="floating-icon">
                ▣
              </div>

              <div>

                <strong>
                  Medical Reports
                </strong>

                <span>
                  AI-assisted explanation
                </span>

              </div>

            </div>


            <div className="floating-card symptom-card">

              <div className="floating-icon">
                ♡
              </div>

              <div>

                <strong>
                  Symptoms
                </strong>

                <span>
                  General health insights
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =================================
            STATS
        ================================= */}

        <section className="home-stats">

          <div>
            <strong>
              AI
            </strong>

            <span>
              Health Assistance
            </span>
          </div>


          <div>
            <strong>
              OCR
            </strong>

            <span>
              Report Text Extraction
            </span>
          </div>


          <div>
            <strong>
              RAG
            </strong>

            <span>
              Personal Health Context
            </span>
          </div>


          <div>
            <strong>
              24/7
            </strong>

            <span>
              Information Access
            </span>
          </div>

        </section>


        {/* =================================
            FEATURES
        ================================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-intro">

            <span>
              CORE CAPABILITIES
            </span>

            <h2>
              More than just a
              <br />
              health chatbot.
            </h2>

            <p>
              MediAssist combines generative AI,
              document intelligence and personal
              health context into one platform.
            </p>

          </div>


          <div className="feature-grid-home">

            <div className="home-feature-card large">

              <div className="home-feature-icon">
                ✦
              </div>

              <span className="feature-number">
                01
              </span>

              <h3>
                AI Health Chat
              </h3>

              <p>
                Ask health-related questions and
                receive clear, easy-to-understand
                general health information.
              </p>

              <Link to="/chat">
                Explore AI Chat →
              </Link>

            </div>


            <div className="home-feature-card">

              <div className="home-feature-icon">
                ▣
              </div>

              <span className="feature-number">
                02
              </span>

              <h3>
                Medical Intelligence
              </h3>

              <p>
                Upload medical reports, extract
                text using OCR and prepare them
                for AI-assisted explanation.
              </p>

              <Link to="/medical-reports">
                Explore Reports →
              </Link>

            </div>


            <div className="home-feature-card">

              <div className="home-feature-icon">
                ♡
              </div>

              <span className="feature-number">
                03
              </span>

              <h3>
                Symptom Assistant
              </h3>

              <p>
                Enter symptoms and receive general
                health information with warning
                signs and guidance.
              </p>

              <Link to="/symptoms">
                Explore Symptoms →
              </Link>

            </div>

          </div>

        </section>


        {/* =================================
            HOW IT WORKS
        ================================= */}

        <section
          className="workflow-section"
          id="how-it-works"
        >

          <div className="section-intro center">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              One place for your
              <br />
              health information.
            </h2>

          </div>


          <div className="workflow-grid">

            <div className="workflow-step">

              <div className="step-number">
                01
              </div>

              <h3>
                Connect
              </h3>

              <p>
                Create your personalized
                MediAssist account.
              </p>

            </div>


            <div className="workflow-line"></div>


            <div className="workflow-step">

              <div className="step-number">
                02
              </div>

              <h3>
                Understand
              </h3>

              <p>
                Ask questions, enter symptoms
                or upload medical documents.
              </p>

            </div>


            <div className="workflow-line"></div>


            <div className="workflow-step">

              <div className="step-number">
                03
              </div>

              <h3>
                Personalize
              </h3>

              <p>
                Build a structured health context
                for future AI assistance.
              </p>

            </div>

          </div>

        </section>


        {/* =================================
            ABOUT / SAFETY
        ================================= */}

        <section
          className="about-section"
          id="about"
        >

          <div className="about-card">

            <div>

              <span>
                DESIGNED FOR RESPONSIBLE AI
              </span>

              <h2>
                Healthcare information,
                <br />
                made easier to understand.
              </h2>

            </div>


            <div className="about-text">

              <p>
                MediAssist AI is designed to provide
                general healthcare information,
                organize medical documents and help
                users understand health-related
                information.
              </p>

              <p>
                It is not intended to diagnose
                diseases, prescribe medication or
                replace qualified healthcare
                professionals.
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="home-footer">

        <div className="footer-brand">

          <span className="home-logo-icon">
            ✦
          </span>

          <strong>
            MediAssist
          </strong>

        </div>


        <p>
          Generative AI Based Healthcare Assistant
        </p>


        <span>
          © 2026 MediAssist AI
        </span>

      </footer>

    </div>
  );
}


/* ==========================================
   APP
========================================== */

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medical-reports"
          element={
            <ProtectedRoute>
              <MedicalReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/symptoms"
          element={
            <ProtectedRoute>
              <SymptomAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;