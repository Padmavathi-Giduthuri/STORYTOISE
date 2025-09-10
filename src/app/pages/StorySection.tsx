'use client';

import React from "react";

interface StorySectionLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function StorySectionLayout({
  title,
  children,
}: StorySectionLayoutProps) {
  return (
    <div className="main-bg min-h-screen font-sans flex flex-col">
      {/* Header */}
      {/* <header className="header-bar">
        <span className="logo-title">Storytoise</span> */}
        {/* you can add nav links here */}
      {/* </header> */}

      {/* Main */}
      <main className="main-content">
        <h2 className="main-title">{title}</h2>
        {children}
      </main>

      {/* Footer */}
      {/* <footer className="footer-bar">
        <span className="footer-text">© 2025 Storytoise Studio</span>
      </footer> */}
    </div>
  );
}
