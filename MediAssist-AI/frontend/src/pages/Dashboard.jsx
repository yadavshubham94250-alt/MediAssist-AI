import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { getActivities } from "../activity";


function Dashboard() {

  const navigate = useNavigate();

  // ==========================================
  // CURRENT USER
  // ==========================================

  const userName =
    sessionStorage.getItem("user_name") || "User";

  const userId =
    sessionStorage.getItem("user_id");


  // ==========================================
  // ACTIVITY
  // ==========================================

  const [activities, setActivities] =
    useState([]);


  useEffect(() => {

    const loadActivities = () => {

      setActivities(
        getActivities()
      );

    };


    loadActivities();


    const handleFocus = () => {
      loadActivities();
    };


    window.addEventListener(
      "focus",
      handleFocus
    );


    return () => {

      window.removeEventListener(
        "focus",
        handleFocus
      );

    };

  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_role");

    navigate("/login");

  };


  // ==========================================
  // ACTIVITY ICON
  // ==========================================

  const getActivityIcon = (title) => {

    if (title.includes("Chat")) {
      return "✦";
    }

    if (title.includes("Report")) {
      return "▣";
    }

    if (title.includes("Symptom")) {
      return "♡";
    }

    return "◌";

  };


  // ==========================================
  // USER INITIAL
  // ==========================================

  const userInitial =
    userName
      .charAt(0)
      .toUpperCase();


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (

    <div className="dashboard">


      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="sidebar">


        {/* LOGO */}

        <Link
          to="/dashboard"
          className="logo"
        >

          <div className="logo-icon">
            ✦
          </div>

          <span>
            MediAssist
          </span>

        </Link>


        {/* MAIN NAVIGATION */}

        <nav className="sidebar-nav">


          <Link
            to="/dashboard"
            className="nav-item active"
          >

            <span>
              ⌂
            </span>

            Dashboard

          </Link>


          <Link
            to="/chat"
            className="nav-item"
          >

            <span>
              ✦
            </span>

            AI Health Chat

          </Link>


          <Link
            to="/medical-reports"
            className="nav-item"
          >

            <span>
              ▣
            </span>

            Medical Reports

          </Link>


          <Link
            to="/symptoms"
            className="nav-item"
          >

            <span>
              ♡
            </span>

            Symptoms

          </Link>


          <Link
            to="/profile"
            className="nav-item"
          >

            <span>
              ◉
            </span>

            My Profile

          </Link>

        </nav>


        {/* BOTTOM NAVIGATION */}

        <div className="sidebar-bottom">


          <Link
            to="/settings"
            className="nav-item"
          >

            <span>
              ⚙
            </span>

            Settings

          </Link>


          <button
            className="logout-button"
            onClick={handleLogout}
          >

            <span>
              ↪
            </span>

            Logout

          </button>


        </div>

      </aside>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="main-content">


        {/* ====================================
            TOP BAR
        ==================================== */}

        <header className="topbar">


          <div>

            <p className="small-heading">
              PERSONAL HEALTHCARE
            </p>

            <h2>
              Dashboard
            </h2>

          </div>


          <div className="user-area">


            <button
              className="notification"
              type="button"
              title="Notifications"
            >
              🔔
            </button>


            <Link
              to="/profile"
              className="user-profile-link"
            >

              <div className="user-avatar">
                {userInitial}
              </div>


              <div>

                <strong>
                  {userName}
                </strong>

                <p>
                  Patient
                </p>

              </div>

            </Link>

          </div>

        </header>


        {/* ====================================
            WELCOME CARD
        ==================================== */}

        <section className="welcome-card">


          <div className="welcome-content">


            <p className="welcome-label">
              YOUR AI HEALTHCARE ASSISTANT
            </p>


            <h1>
              Good evening, {userName}
            </h1>


            <p>
              Manage your health information
              and get AI-powered assistance
              from one place.
            </p>


            <div className="welcome-actions">


              <Link
                to="/chat"
                className="welcome-button"
              >
                Start AI Chat →
              </Link>


              <Link
                to="/medical-reports"
                className="welcome-secondary-button"
              >
                Upload Report
              </Link>


            </div>


          </div>


          <div className="welcome-icon">
            ✦
          </div>


        </section>


        {/* ====================================
            HEALTH ASSISTANT HEADING
        ==================================== */}

        <section className="section-heading">


          <div>

            <h2>
              Health Assistant
            </h2>

            <p>
              Choose a service to get started
            </p>

          </div>


          <div className="assistant-live">

            <span></span>

            AI Available

          </div>


        </section>


        {/* ====================================
            FEATURE CARDS
        ==================================== */}

        <section className="feature-grid">


          {/* AI CHAT */}

          <div className="feature-card">


            <div className="feature-top">

              <div className="feature-icon">
                ✦
              </div>

              <span className="feature-number">
                01
              </span>

            </div>


            <h3>
              AI Health Chat
            </h3>


            <p>
              Ask health-related questions
              and interact with your AI
              healthcare assistant.
            </p>


            <Link
              to="/chat"
              className="feature-button"
            >
              Start Chat →
            </Link>

          </div>


          {/* MEDICAL REPORTS */}

          <div className="feature-card">


            <div className="feature-top">

              <div className="feature-icon">
                ▣
              </div>

              <span className="feature-number">
                02
              </span>

            </div>


            <h3>
              Medical Reports
            </h3>


            <p>
              Upload and understand your
              medical reports using
              AI-powered analysis.
            </p>


            <Link
              to="/medical-reports"
              className="feature-button"
            >
              View Reports →
            </Link>

          </div>


          {/* SYMPTOMS */}

          <div className="feature-card">


            <div className="feature-top">

              <div className="feature-icon">
                ♡
              </div>

              <span className="feature-number">
                03
              </span>

            </div>


            <h3>
              Symptom Assistant
            </h3>


            <p>
              Enter your symptoms and get
              general health information
              from the AI assistant.
            </p>


            <Link
              to="/symptoms"
              className="feature-button"
            >
              Check Symptoms →
            </Link>

          </div>


        </section>


        {/* ====================================
            BOTTOM GRID
        ==================================== */}

        <section className="bottom-grid">


          {/* RECENT ACTIVITY */}

          <div className="activity-card">


            <div className="card-header">

              <div>

                <h3>
                  Recent Activity
                </h3>

                <p>
                  Your latest MediAssist activity
                </p>

              </div>


              {activities.length > 0 && (

                <span className="activity-count">
                  {activities.length}
                </span>

              )}

            </div>


            {/* NO ACTIVITY */}

            {activities.length === 0 ? (

              <div className="empty-activity">


                <div className="empty-icon">
                  ◌
                </div>


                <h4>
                  No recent activity
                </h4>


                <p>
                  Start using MediAssist AI
                  to see your activity here.
                </p>


              </div>

            ) : (


              /* ACTIVITY LIST */

              <div className="activity-list">


                {activities.map(
                  (activity) => (

                    <div
                      className="activity-item"
                      key={activity.id}
                    >


                      <div className="activity-icon">

                        {getActivityIcon(
                          activity.title
                        )}

                      </div>


                      <div className="activity-details">


                        <strong>
                          {activity.title}
                        </strong>


                        <p>
                          {activity.description}
                        </p>


                        <span>
                          {activity.time}
                        </span>


                      </div>


                    </div>

                  )
                )}


              </div>

            )}

          </div>


          {/* AI STATUS CARD */}

          <div className="health-card">


            <div className="health-card-icon">
              ✦
            </div>


            <h3>
              Your AI Assistant
            </h3>


            <p>
              Your AI assistant is ready to
              help you understand your health
              information.
            </p>


            <div className="assistant-status">

              <span></span>

              AI Assistant Available

            </div>


            <Link
              to="/chat"
              className="health-card-button"
            >
              Ask a Question →
            </Link>


          </div>


        </section>


        {/* ====================================
            SAFETY NOTICE
        ==================================== */}

        <section className="dashboard-notice">


          <div className="notice-icon">
            !
          </div>


          <div>

            <strong>
              Important Health Information
            </strong>

            <p>
              MediAssist AI provides general
              healthcare information and does
              not replace professional medical
              advice, diagnosis or treatment.
              If you have an urgent medical
              concern, seek appropriate
              professional care.
            </p>

          </div>


        </section>


        {/* ====================================
            FOOTER
        ==================================== */}

        <footer className="dashboard-footer">

          <span>
            MediAssist AI
          </span>

          <span>
            Generative AI Based Healthcare Assistant
          </span>

        </footer>


      </main>

    </div>
  );
}


export default Dashboard;