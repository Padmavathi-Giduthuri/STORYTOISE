'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card } from 'antd';

const storytoiseAnswers: Record<string, React.ReactNode> = {
  application: (
    <>
      Hi there! 😊 To join our programs, just ask your parent or teacher to visit the{" "}
      <Link href="/pages/programs" className="text-blue-500 underline hover:text-blue-700">
        Programs page
      </Link>{" "}
      and fill out the form. We'll send a friendly message back soon!
    </>
  ),
  content: (
    <>
      We have lots of fun stories, workshops, and activities for kids. Explore them on the{" "}
      <Link href="/pages/storytoise-studio" className="text-blue-500 underline hover:text-blue-700">
        Storytoise Studio page
      </Link>!
    </>
  ),
  publishing: (
    <>
      We help kids publish their stories and drawings. If you want to see your work in a book, check{" "}
      <Link href="/pages/publishing" className="text-blue-500 underline hover:text-blue-700">
        Publishing page
      </Link>.
    </>
  ),
  workshop: (
    <>
      Our workshops are all about learning and having fun together. Visit the{" "}
      <Link href="/pages/creating-workshop" className="text-blue-500 underline hover:text-blue-700">
        Workshop page
      </Link>{" "}
      for the next session!
    </>
  ),
  bookclub: (
    <>
      The Book Club is a place to read and talk about your favorite books with friends. Join us at the{" "}
      <Link href="/pages/book-club" className="text-blue-500 underline hover:text-blue-700">
        Book Club page
      </Link>.
    </>
  ),
  hello: "Hello! 👋 I'm Storytoise, your friendly helper. Ask me about joining, stories, workshops, or anything else!",
  open: (
    <>
      Sure! Click the chat button at the bottom right to open the chat window. Or visit{" "}
      <Link href="/pages/storytoise-studio" className="text-blue-500 underline hover:text-blue-700">
        Storytoise Studio
      </Link>.
    </>
  ),
  pages: (
    <span>
      Storytoise currently has <b>6 main pages</b>:
      <ul>
        <li>🏠 Home</li>
        <li>📖 Stories</li>
        <li>📝 Workshops</li>
        <li>📚 Publishing</li>
        <li>👥 About Us</li>
        <li>📩 Contact</li>
      </ul>
      Each page is designed to guide you through different parts of Storytoise Studio.
    </span>
  ),

  hi: (
  <span>
    Hey hii!! How can I help you? 😊
    </span>
  ),
  default: "I'm Storytoise! Ask me about application, stories, workshops, publishing, or book club. I'm here to help you learn and have fun!"
};

// checks the user’s input.
function getStorytoiseAnswer(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes('application') || lower.includes('join')) return storytoiseAnswers.application;
  if (lower.includes('content') || lower.includes('story')) return storytoiseAnswers.content;
  if (lower.includes('publish')) return storytoiseAnswers.publishing;
  if (lower.includes('workshop')) return storytoiseAnswers.workshop;
  if (lower.includes('book')) return storytoiseAnswers.bookclub;
  if (lower.includes('hello') || lower.includes('hi')) return storytoiseAnswers.hello;
  return storytoiseAnswers.default;
}

export default function StorySectionLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([{ sender: 'storytoise', text: storytoiseAnswers.default }]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false); 
  const [botTyping, setBotTyping] = useState(false); 
  const [showScrollButton, setShowScrollButton] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const chatWrapper = chatContainerRef.current;

  if (!chatWrapper) return;

  const handleScroll = () => {
    const nearBottom =
      chatWrapper.scrollHeight - chatWrapper.scrollTop <= chatWrapper.clientHeight + 50;
    setShowScrollButton(!nearBottom);
  };

  chatWrapper.addEventListener("scroll", handleScroll);

  // Run once to set initial state
  handleScroll();

  return () => {
    chatWrapper.removeEventListener("scroll", handleScroll);
  };
}, []);



  //creates a reference to the bottom div of the chat, so React can scroll there automatically when new messages appear.
  const messagesEndRef = useRef<HTMLDivElement>(null); 

 const handleSend = () => {
  if (!chatInput.trim()) return;
  setChatMessages([...chatMessages, { sender: 'user', text: chatInput }]);
  setIsTyping(false);

  // Bot typing effect
  setBotTyping(true);
  const userMessage = chatInput;
  setChatInput('');

  setTimeout(() => {
    setBotTyping(false);
    setChatMessages(prev => [
      ...prev,
      { sender: 'storytoise', text: getStorytoiseAnswer(userMessage) }
    ]);
  }, 750); 
};

  // Run & Scroll to bottom when chatMessages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // For testimonials navigation
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const handleTestimonialNav = (dir: 'prev' | 'next') => {
    if (testimonialsRef.current) {
      const container = testimonialsRef.current;
      container.scrollBy({ left: dir === 'next' ? 300 : -300, behavior: 'smooth' });
    }
  };

  // Fix: Use React.isValidElement and check className type
  const hasTestimonials = React.Children.toArray(children).some(
    child =>
      React.isValidElement(child) &&
      typeof (child.props as { className?: string }).className === 'string' &&
      ((child.props as { className?: string }).className ?? '').includes('testimonials-list')
  );

  return (
    <div className="main-bg min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="header-bar">
        <div className="header-logo">
          <img src="/preview.png" alt="Logo" className="logo-img" />
          <span className="logo-title">Storytoise Studio</span>
        </div>
        <nav className="header-nav">
          <Link href="/dashboard" className="nav-link">Home</Link>
          {/* Programs dropdown */}
          <div className="relative">
            <button
              className="nav-link"
              onClick={() => setDropdownOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Programs ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/dashboard" className="dropdown-link">Dashboard</Link>
                <Link href="/pages/storytoise-studio" className="dropdown-link">Storytoise Studio</Link>
                <Link href="/pages/creating-workshop" className="dropdown-link">Creating Workshop</Link>
                <Link href="/pages/publishing" className="dropdown-link">Publishing</Link>
                <Link href="/pages/testimonials" className="dropdown-link">Testimonials</Link>
                <Link href="/pages/our-details" className="dropdown-link">About Us</Link>
                <Link href="/pages/book-club" className="dropdown-link">Book Club</Link>
              </div>
            )}
          </div>
          </nav>
      </header>
      {/* Main Content */}
      <main className="main-content main-content-rel">
        <Card className="main-card wide-card">
          <h2 className="main-title">{title}</h2>
          {/* Testimonials navigation buttons */}
          {hasTestimonials && (
            <div className="testimonial-nav-btns">
              <button
                className="testimonial-nav-btn"
                onClick={() => handleTestimonialNav('prev')}
              >
                Before
              </button>
              <button
                className="testimonial-nav-btn"
                onClick={() => handleTestimonialNav('next')}
              >
                After
              </button>
            </div>
          )}
          {/* Testimonials and other children */}
          {children}
        </Card>
        
        {/* Only one chat board for all pages */}
        {!chatOpen && (
          <button
            className="chat-toggle-btn"
            onClick={() => setChatOpen(true)}
            aria-label="Open Chat"
          >
            Ask me!
            💬
          </button>
        )}
        {chatOpen && (
          <div className="chat-board-vertical">
            <Card className="chat-card-vertical">
              <div className="chat-header-row">
                <span className="chat-title">Storytoise Chat</span>
                <button
                  className="chat-close-btn"
                  onClick={() => setChatOpen(false)}
                  aria-label="Close Chat"
                >
                  ×
                </button>
              </div>

          <div className="chat-messages-wrapper">
              <div className="chat-messages-vertical chat-messages-reverse"
                ref={chatContainerRef}
              >
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={msg.sender === 'storytoise' ? 'chat-bot-vertical-reverse' : 'chat-user-vertical-reverse'}
                  >
                    {/* Interactive: show bot answers as bullet points if possible */}
                    {msg.sender === 'storytoise' && typeof msg.text === 'string' && msg.text.includes('\n') ? (
                      <ul>
                        {msg.text.split('\n').map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : Array.isArray(msg.text) ? (
                      <ul>
                        {msg.text.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      msg.text
                    )}
                  </div>
                ))}

                {/* user typing indicator */}
                  {isTyping && (
                    <div className="chat-user-vertical-reverse typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  )}

                {botTyping && (
                  <div className="chat-bot-vertical-reverse typing-indicator">
                    <span className="spinner"></span>
                    <span>Thinking...</span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {showScrollButton && (
                <button
                  className="chat-scroll-btn-inside"
                  onClick={scrollToBottom}
                  title="Scroll to bottom"
                >
                  ↓
                </button>
              )}
              </div>
             
             <div>
              <div className="chat-input-row">
                <input
                  className="chat-input-reverse"
                  value={chatInput}
                  onChange={e => {
                    setChatInput(e.target.value);
                    setIsTyping(e.target.value.trim().length > 0);
                  }}
                  placeholder="Type your question here..."
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  aria-label="Ask Storytoise"
                />
                <button
                  className="chat-send-btn-reverse"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
              <span className="interactive-footer-text">
                  <span role="img" aria-label="sparkle">✨</span> Storytoise is here to help you learn and have fun!
                </span>
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

