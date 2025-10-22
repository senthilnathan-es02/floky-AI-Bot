import React, { useState } from 'react';
import { Mic, ArrowUp, Paperclip, ChevronDown } from 'lucide-react';
import '../Styles/Dashboard.scss';

export default function BlackboxAI() {
  const [message, setMessage] = useState('');

  return (
    <div className="blackbox-container">
      {/* <div className="header">
        <div className="badge">
          <span className="badge-new">New</span>
          <span className="badge-text">BLACKBOX AI Remote Agents</span>
          <ChevronDown size={16} />
        </div>
      </div> */}

      <h1 className="title">Chat Bot</h1>

      <div className="chat-interface">
        <div className="avatar-indicator">
          <div className="avatar-dot"></div>
        </div>
        
        <div className="input-container">
          <input
            type="text"
            placeholder="Message Blackbox"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          
          <div className="input-actions">
            <button className="action-btn mic-btn">
              <Mic size={20} />
            </button>
            <button className="action-btn send-btn">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="bottom-bar">
          <button className="attach-btn">
            <Paperclip size={18} />
          </button>
          
          <button className="model-selector">
            <span>Select Models</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="footer-text">
          Get access to the best AI Agent.
          <a href="#" className="upgrade-link">Upgrade plan</a>
        </div>
      </div>
    </div>
  );
}
