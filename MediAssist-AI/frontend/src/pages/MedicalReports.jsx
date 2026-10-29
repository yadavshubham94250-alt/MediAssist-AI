import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MedicalReports.css";
import { addActivity } from "../activity";

function MedicalReports() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");


  const handleFileChange = (event) => {

    const file = event.target.files[0];

    setError("");
    setResult(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {

      setSelectedFile(null);

      setError(
        "Please upload a PDF, JPG, or PNG file."
      );

      return;
    }

    setSelectedFile(file);
  };


  const handleAnalyze = async () => {

    if (!selectedFile) {

      setError(
        "Please select a medical report first."
      );

      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/analyze-report",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {

        setError(
          data.error ||
          "Unable to analyze the report."
        );

        return;
      }


      // Save activity
      addActivity(
        "Medical Report",
        `Analyzed ${data.filename}`
      );


      setResult(data);

    } catch (error) {

      console.error(error);

      setError(
        "Cannot connect to MediAssist AI. Please make sure the backend server is running."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="reports-page">

      <aside className="reports-sidebar">

        <div className="reports-logo">

          <div className="reports-logo-icon">
            ✦
          </div>

          <span>
            MediAssist
          </span>

        </div>


        <p className="reports-sidebar-label">
          HEALTHCARE
        </p>


        <Link
          to="/dashboard"
          className="reports-nav-item"
        >
          <span>⌂</span>
          Dashboard
        </Link>


        <Link
          to="/chat"
          className="reports-nav-item"
        >
          <span>✦</span>
          AI Health Chat
        </Link>


        <Link
          to="/medical-reports"
          className="reports-nav-item active"
        >
          <span>▣</span>
          Medical Reports
        </Link>


        <Link
          to="/symptoms"
          className="reports-nav-item"
        >
          <span>♡</span>
          Symptoms
        </Link>


        <div className="reports-sidebar-info">

          <div className="reports-info-icon">
            ▣
          </div>

          <h3>
            Report Assistant
          </h3>

          <p>
            Upload a medical report and let
            MediAssist AI explain the visible
            information in simple language.
          </p>

        </div>


        <div className="reports-safety">

          <strong>
            Medical information
          </strong>

          <p>
            AI explanations are for general
            information and should not replace
            professional medical advice.
          </p>

        </div>

      </aside>


      <main className="reports-main">

        <header className="reports-header">

          <div>

            <p className="reports-header-label">
              AI HEALTHCARE
            </p>

            <h1>
              Medical Reports
            </h1>

            <p className="reports-header-description">
              Upload and understand your medical
              reports with AI-assisted analysis.
            </p>

          </div>


          <Link
            to="/dashboard"
            className="back-dashboard"
          >
            ← Dashboard
          </Link>

        </header>


        <section className="report-upload-card">

          <div className="upload-icon">
            ↑
          </div>

          <h2>
            Upload your medical report
          </h2>

          <p>
            Upload a PDF, JPG, or PNG medical
            report. MediAssist will extract
            readable information and provide
            a simple explanation.
          </p>


          <label
            htmlFor="report-file"
            className="file-select-button"
          >
            Choose Report
          </label>


          <input
            id="report-file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            hidden
          />


          {selectedFile && (

            <div className="selected-file">

              <div className="file-symbol">
                ▣
              </div>

              <div className="file-details">

                <strong>
                  {selectedFile.name}
                </strong>

                <span>
                  {(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)} MB
                </span>

              </div>

            </div>

          )}


          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={
              loading || !selectedFile
            }
          >
            {loading
              ? "Analyzing Report..."
              : "Analyze Report →"}
          </button>


          {error && (

            <div className="report-error">
              {error}
            </div>

          )}

        </section>


        {result && (

          <section className="report-result">

            <div className="result-header">

              <div>

                <p>
                  ANALYSIS RESULT
                </p>

                <h2>
                  {result.filename}
                </h2>

              </div>

              <div className="success-badge">
                ✓ Analysis Complete
              </div>

            </div>


            <div className="analysis-card">

              <div className="analysis-title">

                <div className="analysis-icon">
                  ✦
                </div>

                <div>

                  <h3>
                    AI Explanation
                  </h3>

                  <p>
                    Simple explanation from
                    MediAssist AI
                  </p>

                </div>

              </div>


              <div className="analysis-text">
                {result.analysis}
              </div>

            </div>


            <details className="extracted-section">

              <summary>
                View extracted report text
              </summary>

              <div className="extracted-text">
                {result.text ||
                  "No readable text found."}
              </div>

            </details>


            <div className="report-disclaimer">

              <strong>
                Important:
              </strong>

              <span>
                This AI-generated explanation is
                for general informational purposes
                only. It is not a diagnosis or a
                substitute for professional
                medical advice.
              </span>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default MedicalReports;