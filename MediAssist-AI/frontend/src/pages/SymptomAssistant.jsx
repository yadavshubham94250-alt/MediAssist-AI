import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SymptomAssistant.css";
import { addActivity } from "../activity";

function SymptomAssistant() {

  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userName =
    localStorage.getItem("user_name") || "User";


  const analyzeSymptoms = async (event) => {

    event.preventDefault();

    if (!symptoms.trim()) {

      setError(
        "Please enter your symptoms first."
      );

      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/symptoms",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            symptoms: symptoms.trim(),
          }),
        }
      );


      const data = await response.json();


      if (!response.ok || data.error) {

        setError(
          data.error ||
          "Unable to analyze symptoms."
        );

        return;
      }


      // Save activity
      addActivity(
        "Symptom Assistant",
        "Symptoms analyzed"
      );


      setResult(data.message);

    } catch (error) {

      console.error(error);

      setError(
        "Cannot connect to MediAssist AI. Please make sure the backend server is running."
      );

    } finally {

      setLoading(false);

    }
  };


  const clearForm = () => {

    setSymptoms("");
    setResult("");
    setError("");

  };


  return (

    <div className="symptom-page">

      <aside className="symptom-sidebar">

        <div className="symptom-logo">

          <div className="symptom-logo-icon">
            ✦
          </div>

          <span>
            MediAssist
          </span>

        </div>


        <p className="symptom-sidebar-label">
          HEALTHCARE
        </p>


        <Link
          to="/dashboard"
          className="symptom-nav-item"
        >
          <span>⌂</span>
          Dashboard
        </Link>


        <Link
          to="/chat"
          className="symptom-nav-item"
        >
          <span>✦</span>
          AI Health Chat
        </Link>


        <Link
          to="/medical-reports"
          className="symptom-nav-item"
        >
          <span>▣</span>
          Medical Reports
        </Link>


        <Link
          to="/symptoms"
          className="symptom-nav-item active"
        >
          <span>♡</span>
          Symptoms
        </Link>


        <div className="symptom-sidebar-info">

          <div className="symptom-info-icon">
            ♡
          </div>

          <h3>
            Symptom Assistant
          </h3>

          <p>
            Describe your symptoms and get
            general health information from
            MediAssist AI.
          </p>

        </div>


        <div className="symptom-safety">

          <strong>
            Important
          </strong>

          <p>
            MediAssist provides general health
            information and does not replace
            professional medical advice.
          </p>

        </div>

      </aside>


      <main className="symptom-main">

        <header className="symptom-header">

          <div>

            <p className="symptom-header-label">
              AI HEALTHCARE
            </p>

            <h1>
              Symptom Assistant
            </h1>

            <p className="symptom-header-description">
              Describe how you are feeling and
              get general health information
              from your AI assistant.
            </p>

          </div>


          <div className="symptom-user">

            <div className="symptom-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>

              <strong>
                {userName}
              </strong>

              <p>
                Patient
              </p>

            </div>

          </div>

        </header>


        <section className="symptom-card">

          <div className="symptom-card-icon">
            ♡
          </div>


          <h2>
            How are you feeling?
          </h2>


          <p>
            Tell MediAssist about your symptoms.
            Include details such as when they
            started and how severe they feel.
          </p>


          <form onSubmit={analyzeSymptoms}>

            <textarea
              value={symptoms}
              onChange={(event) =>
                setSymptoms(event.target.value)
              }
              placeholder="Example: I have a mild headache, feel tired, and have had these symptoms since this morning..."
              rows="7"
              disabled={loading}
            />


            <div className="symptom-actions">

              <button
                type="button"
                className="clear-button"
                onClick={clearForm}
                disabled={loading}
              >
                Clear
              </button>


              <button
                type="submit"
                className="analyze-symptom-button"
                disabled={
                  loading ||
                  !symptoms.trim()
                }
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Symptoms →"}
              </button>

            </div>

          </form>


          {error && (

            <div className="symptom-error">
              {error}
            </div>

          )}

        </section>


        {result && (

          <section className="symptom-result">

            <div className="symptom-result-header">

              <div>

                <p>
                  AI HEALTH INFORMATION
                </p>

                <h2>
                  Symptom Analysis
                </h2>

              </div>


              <div className="result-badge">
                ✓ Analysis Complete
              </div>

            </div>


            <div className="symptom-result-content">

              <div className="result-ai-icon">
                ✦
              </div>

              <div className="result-text">
                {result}
              </div>

            </div>


            <div className="symptom-disclaimer">

              <strong>
                Important:
              </strong>

              <span>
                This information is for general
                educational purposes only. It is
                not a diagnosis or a substitute
                for professional medical advice.
                If you have severe or emergency
                symptoms, seek appropriate
                medical care.
              </span>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default SymptomAssistant;