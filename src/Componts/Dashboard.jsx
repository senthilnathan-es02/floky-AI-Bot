import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import "../Styles/Dashboard.scss";

export default function BlackboxAI() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,

        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || "AI Error...";

      setChat([...newChat, { sender: "ai", text: aiMessage }]);
    } catch (error) {
      console.error(error);
      setChat([...newChat, { sender: "ai", text: "Error fetching response." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blackbox-container">
      <h1 className="title">Hi, Beauty — What Happened Today ?</h1>

      <div className="chat-interface">
        <div className="chat-box">
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
            placeholder="Message Blackbox..."
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
