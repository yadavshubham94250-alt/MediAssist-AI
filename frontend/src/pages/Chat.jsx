import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import { addActivity } from "../activity";

function Chat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const userName =
    localStorage.getItem("user_name") || "User";

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        addActivity(
          "AI Health Chat",
          "Asked a health-related question"
        );

        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            text: data.message,
          },
        ]);
      } else {
        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            text:
              "Sorry, I could not process your request.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            "Unable to connect to MediAssist AI. Please make sure the backend server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">

      <aside className="chat-sidebar">

        <div className="chat-logo">
          <div className="chat-logo-icon">
            ✦
          </div>

          <span>MediAssist</span>
        </div>

        <div className="chat-sidebar-title">
          HEALTH ASSISTANT
        </div>

        <button
          className="chat-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>

        <div className="chat-info-box">

          <div className="chat-info-icon">
            ✦
          </div>

          <h3>
            AI Health Assistant
          </h3>

          <p>
            Ask general health questions and
            get information from your AI
            healthcare assistant.
          </p>

        </div>

        <div className="chat-safety">

          <strong>
            Important
          </strong>

          <p>
            MediAssist provides general health
            information and does not replace a
            qualified healthcare professional.
          </p>

        </div>

      </aside>


      <main className="chat-main">

        <header className="chat-header">

          <div>

            <p className="chat-header-label">
              AI HEALTH ASSISTANT
            </p>

            <h1>
              Health Chat
            </h1>

            <div className="chat-status">
              <span></span>
              AI Assistant Online
            </div>

          </div>


          <div className="chat-user">

            <div className="chat-avatar">
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


        <section className="chat-messages">

          {messages.length === 0 && (

            <div className="chat-welcome">

              <div className="chat-welcome-icon">
                ✦
              </div>

              <h2>
                Hello, {userName} 👋
              </h2>

              <p>
                I'm your MediAssist AI health
                assistant. What would you like
                to know about your health?
              </p>

              <div className="suggestion-grid">

                <button
                  onClick={() =>
                    setMessage(
                      "What are common causes of headache?"
                    )
                  }
                >
                  Common causes of headache
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "What are some healthy sleep habits?"
                    )
                  }
                >
                  Healthy sleep habits
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "What are common symptoms of dehydration?"
                    )
                  }
                >
                  Symptoms of dehydration
                </button>

                <button
                  onClick={() =>
                    setMessage(
                      "How can I maintain a healthy lifestyle?"
                    )
                  }
                >
                  Healthy lifestyle tips
                </button>

              </div>

            </div>

          )}


          {messages.map((item, index) => (

            <div
              key={index}
              className={
                item.role === "user"
                  ? "message-row user-row"
                  : "message-row assistant-row"
              }
            >

              {item.role === "assistant" && (
                <div className="message-avatar">
                  ✦
                </div>
              )}

              <div
                className={
                  item.role === "user"
                    ? "message-bubble user-bubble"
                    : "message-bubble assistant-bubble"
                }
              >
                {item.text}
              </div>

            </div>

          ))}


          {loading && (

            <div className="message-row assistant-row">

              <div className="message-avatar">
                ✦
              </div>

              <div className="message-bubble assistant-bubble loading-message">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          )}

        </section>


        <div className="chat-input-area">

          <form
            onSubmit={sendMessage}
            className="chat-form"
          >

            <input
              type="text"
              placeholder="Ask a health-related question..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              disabled={loading}
            />

            <button
              type="submit"
              disabled={
                loading || !message.trim()
              }
            >
              {loading ? "..." : "Send"}
            </button>

          </form>

          <p className="chat-disclaimer">
            MediAssist AI provides general health
            information. For medical emergencies,
            contact appropriate emergency services
            or a healthcare professional.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Chat;