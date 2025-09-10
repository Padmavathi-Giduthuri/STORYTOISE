'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation'; 
import Link from 'next/link';
import { Card } from 'antd';
import Image from 'next/image';
import Markdown from 'react-markdown';
import './globals.css';


  let persistedMessages: { sender: string; text: React.ReactNode }[] = [
  {
    sender: "storytoise",
    text: "I'm Storytoise🐢! Ask me about application, stories, workshops, publishing, or book club. I'm here to help you learn and have fun!"
  }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
const pathname = usePathname(); 
const showHeader = pathname !== '/login'; 


  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(persistedMessages);
  const [chatOpen, setChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setChatMessages(parsed);
      persistedMessages = parsed;
    }
  }, []);

  // ✅ Save to localStorage + global
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    persistedMessages = chatMessages;
  }, [chatMessages]);

  // ✅ Scroll behavior
  useEffect(() => {
    const chatWrapper = chatContainerRef.current;
    if (!chatWrapper) return;

    const handleScroll = () => {
      const nearBottom =
        chatWrapper.scrollHeight - chatWrapper.scrollTop <= chatWrapper.clientHeight + 50;
      setShowScrollButton(!nearBottom);
    };

    chatWrapper.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => chatWrapper.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: "user", text: chatInput }]);
    setIsTyping(false);
    setBotTyping(true);

    const userMessage = chatInput;
    setChatInput("");

    try {
      const res = await fetch("http://localhost:5000/api/gemini/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      setBotTyping(false);
      setChatMessages(prev => [
        ...prev,
        { sender: "storytoise", text: data.reply || "Hmm, I couldn’t think of an answer 🤔" },
      ]);
    } catch (err) {
      console.error("Gemini API error:", err);
      setBotTyping(false);
      setChatMessages(prev => [
        ...prev,
        { sender: "storytoise", text: "Oops! Something went wrong. Try again later." },
      ]);
    }
  };

  return (
    <div className="main-bg min-h-screen font-sans flex flex-col">
      {/* Header */}
    {showHeader && (
  <header className="header-bar">
    <Image src="/preview.png" alt="Logo" className="header-logo" width={50} height={50} />
    <span className="logo-title">Storytoise</span>
    <nav className="header-nav">
      <Link href="/dashboard" className="nav-link">Home</Link>
      
      {/* Programs Dropdown */}
      <div 
        className="dropdown-container"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span className="nav-link dropdown-toggle">Programs</span>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link href="/pages/storytoise-studio" className="dropdown-link">Storytoise Studio</Link>
            <Link href="/pages/writers-collaboration" className="dropdown-link">Writers Collaboration</Link>
            <Link href="/pages/creative-workshop" className="dropdown-link">Creative Workshop</Link>
            <Link href="/pages/our-details" className="dropdown-link">Know us</Link>
            <Link href="/pages/publishing" className="dropdown-link">Publishing</Link>
            <Link href="/pages/testimonials" className="dropdown-link">Testimonials</Link>
          </div>
        )}
      </div>

      <Link href="/login" className="nav-link">LogOut</Link>
    </nav>
  </header>
  )}

      {/* Main */}
      <main className="main-content main-content-rel">
        {children}

        {/* Chat Toggle */}
        {!chatOpen && (
          <button className="chat-toggle-btn" onClick={() => setChatOpen(true)} aria-label="Open Chat">
            Ask me! 💬
          </button>
        )}

        {/* Chat Board */}
        {chatOpen && (
          <div className="chat-board-vertical">
            <Card className="chat-card-vertical">
              <div className="chat-header-row">
                <span className="chat-title">Storytoise Chat</span>
                <button className="chat-close-btn" onClick={() => setChatOpen(false)} aria-label="Close Chat">×</button>
              </div>

              <div className="chat-messages-wrapper">
                <div className="chat-messages-vertical chat-messages-reverse" ref={chatContainerRef}>
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={msg.sender === "storytoise" ? "chat-bot-vertical-reverse" : "chat-user-vertical-reverse"}
                    >
                      {msg.sender === "storytoise" ? (
                        <Markdown>{String(msg.text)}</Markdown>
                      ) : (
                        <div className="user-msg">{String(msg.text)}</div>
                      )}
                    </div>
                  ))}

                  {/* Typing indicators */}
                  {isTyping && (
                    <div className="chat-user-vertical-reverse typing-indicator">
                      <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                    </div>
                  )}
                  {botTyping && (
                    <div className="chat-bot-vertical-reverse typing-indicator">
                      <span>Thinking...</span>
                      <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {showScrollButton && (
                  <button className="chat-scroll-btn-inside" onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}>
                    ↓
                  </button>
                )}
              </div>

              {/* Input */}
              <div className="chat-input-row">
                <input
                  className="chat-input-reverse"
                  value={chatInput}
                  onChange={(e) => {
                    setChatInput(e.target.value);
                    setIsTyping(e.target.value.trim().length > 0);
                  }}
                  placeholder="Type your question here..."
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="chat-send-btn-reverse" onClick={handleSend}>Send</button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <span className="footer-text">© 2025 Storytoise Studio</span>
      </footer>
    </div>
  );
}
