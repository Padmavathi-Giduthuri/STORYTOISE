'use client'; // This is necessary to use client-side features like state and event listeners

import { Inter } from "next/font/google";
import "./globals.css";

import { Layout } from "antd";
import { AppHeader, AppFooter } from "../components/HeaderAndFooter"; // Import the header and footer components

const { Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Storytoise Studio",
  description: "Creative and educational platform for children's stories.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout className="app-main-container">
          {/* Header at the top of every page */}
          <AppHeader />
          
          <Layout>
            {/* Main content of each page will be rendered here */}
            <Content className="app-content">{children}</Content>
          </Layout>
          
          {/* Footer at the bottom of every page */}
          <AppFooter />
        </Layout>
      </body>
    </html>
  );
}