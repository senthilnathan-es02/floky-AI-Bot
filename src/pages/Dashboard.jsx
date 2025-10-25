import React, { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import "../styles/Dashboard.scss";

export default function FlokyAI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Add user's message
    setChat((prev) => [...prev, { sender: "user", text: trimmedMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (!response.ok) throw new Error("Network response not ok");

      const data = await response.json();
      const aiMessage = data.reply || "AI Error...";

      // Add AI response
      setChat((prev) => [...prev, { sender: "ai", text: aiMessage }]);
    } catch (error) {
      console.error("Frontend Error:", error);
      setChat((prev) => [...prev, { sender: "ai", text: "Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blackbox-container">
      <h1 className="title">Hi, Beauty — What Happened Today?</h1>

      <div className="chat-interface">
        <div className="chat-box" ref={chatBoxRef}>
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === "user" ? "user-msg" : "ai-msg"}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="loading">Thinking...</div>}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Message floky.ai..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="message-input"
          />
          <div className="input-actions">
            <button onClick={handleSend} className="action-btn send-btn">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="footer-text">
          This is a model of AI.{" "}
          <a href="#" className="upgrade-link">
            Get More Details
          </a>
        </div>
      </div>
    </div>
  );
}
