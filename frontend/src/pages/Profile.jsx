import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Profile.css";


function Profile() {

  const navigate = useNavigate();


  const userName =
    localStorage.getItem("user_name") ||
    "User";


  const userId =
    localStorage.getItem("user_id") ||
    "—";


  const userEmail =
    localStorage.getItem("user_email") ||
    "Not available";


  const handleLogout = () => {

    localStorage.removeItem(
      "user_id"
    );

    localStorage.removeItem(
      "user_name"
    );

    localStorage.removeItem(
      "user_email"
    );

    localStorage.removeItem(
      "mediassist_activity"
    );

    navigate("/login");
  };


  return (

    <div className="profile-page">


      {/* =========================
          TOP BAR
      ========================== */}

      <header className="profile-topbar">


        <Link
          to="/dashboard"
          className="back-link"
        >
          ← Dashboard
        </Link>


        <div className="profile-title">

          <p>
            PERSONAL HEALTHCARE
          </p>

          <h1>
            My Profile
          </h1>

        </div>


      </header>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="profile-container">


        {/* PROFILE HEADER */}

        <section className="profile-card">


          <div className="profile-avatar">

            {userName
              .charAt(0)
              .toUpperCase()}

          </div>


          <div className="profile-main-info">

            <h2>
              {userName}
            </h2>


            <p>
              Patient
            </p>

          </div>


        </section>


        {/* PERSONAL INFORMATION */}

        <section className="profile-card details-card">


          <div className="section-title">

            <h3>
              Personal Information
            </h3>


            <p>
              Your MediAssist account information
            </p>

          </div>


          <div className="profile-details">


            {/* Full Name */}

            <div className="detail-item">

              <span>
                Full Name
              </span>


              <strong>
                {userName}
              </strong>

            </div>


            {/* Email */}

            <div className="detail-item">

              <span>
                Email Address
              </span>


              <strong>
                {userEmail}
              </strong>

            </div>


            {/* User ID */}

            <div className="detail-item">

              <span>
                User ID
              </span>


              <strong>
                {userId}
              </strong>

            </div>


            {/* Account Type */}

            <div className="detail-item">

              <span>
                Account Type
              </span>


              <strong>
                Patient
              </strong>

            </div>


            {/* AI Assistant */}

            <div className="detail-item">

              <span>
                AI Assistant
              </span>


              <strong>
                Available
              </strong>

            </div>


          </div>


        </section>


        {/* SECURITY */}

        <section className="profile-card security-card">


          <div>

            <h3>
              Account & Security
            </h3>


            <p>
              Manage your MediAssist account securely.
            </p>

          </div>


          <button
            className="profile-logout"
            onClick={handleLogout}
          >
            Logout
          </button>


        </section>


      </main>

    </div>
  );
}


export default Profile;