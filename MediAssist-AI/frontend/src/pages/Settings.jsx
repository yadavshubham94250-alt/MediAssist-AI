import React from "react";
import { Link } from "react-router-dom";
import "./Settings.css";

function Settings() {
  const userName =
    localStorage.getItem("user_name") || "User";

  return (
    <div className="settings-page">

      <header className="settings-topbar">

        <Link to="/dashboard" className="back-link">
          ← Dashboard
        </Link>

        <div>
          <p>PERSONAL HEALTHCARE</p>
          <h1>Settings</h1>
        </div>

      </header>


      <main className="settings-container">

        <section className="settings-card">

          <div className="settings-heading">
            <h2>Account Settings</h2>
            <p>
              Manage your MediAssist preferences.
            </p>
          </div>


          <div className="setting-row">

            <div>
              <strong>Account Name</strong>
              <p>
                Your current profile name
              </p>
            </div>

            <span>
              {userName}
            </span>

          </div>


          <div className="setting-row">

            <div>
              <strong>Account Type</strong>
              <p>
                Your MediAssist account category
              </p>
            </div>

            <span>
              Patient
            </span>

          </div>


          <div className="setting-row">

            <div>
              <strong>AI Health Assistant</strong>
              <p>
                AI-powered healthcare information
              </p>
            </div>

            <span className="status">
              Available
            </span>

          </div>

        </section>


        <section className="settings-card">

          <div className="settings-heading">
            <h2>Privacy & Safety</h2>
            <p>
              Important information about using
              MediAssist AI.
            </p>
          </div>


          <div className="info-box">

            <strong>
              Healthcare Information Notice
            </strong>

            <p>
              MediAssist AI provides general health
              information and does not replace a
              qualified healthcare professional.
              Do not use the assistant for emergency
              medical decisions.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;