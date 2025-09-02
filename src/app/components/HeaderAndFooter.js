'use client';

import React from 'react';
import { Layout, Typography } from "antd";
import Link from 'next/link';
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Header, Footer } = Layout;
const { Paragraph } = Typography;

// 🔹 Header component
export const AppHeader = () => (
<Header className="app-header bg-white rounded-full shadow-lg p-2 md:p-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">
<div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
<div className="flex-shrink-0">
 <img
src="/media.jpg"
alt="Storytoise logo"
 className="sider-logo-img" 
 />
 </div>
 </div>
 <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
 <Link href="/" className="py-2 px-4 rounded-full bg-blue-300 text-#090300 font-semibold transition-colors duration-200 hover:bg-blue-400">Home</Link>
 <a href="#" className="py-2 px-4 rounded-full text-gray-800 font-semibold color-black duration-200 hover:bg-gray-200 flex items-center space-x-1">
 <span>About Us</span>
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="6 9 12 15 18 9"></polyline>
 </svg>
 </a>
 <a href="#" className="py-2 px-4 rounded-full text-gray-800 font-semibold transition-colors duration-200 hover:bg-gray-200 flex items-center space-x-1">
 <span>Programs</span>
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <polyline points="6 9 12 15 18 9"></polyline>
 </svg>
 </a>
 <a href="#" className="py-2 px-4 rounded-full text-gray-800 font-semibold transition-colors duration-200 hover:bg-gray-200">Recent Updates</a>
 <a href="#" className="py-2 px-6 rounded-full bg-blue-500 text-white font-bold shadow-lg transition-colors duration-200 hover:bg-blue-600">Collaborate Us</a>
 </nav>
 </Header>
);

// 🔹 Footer component
    export const AppFooter = () => (
        <Footer className="app-footer text-center py-4 bg-gray-100 text-gray-600">
            <Paragraph>
                Contact: <a href="mailto:storytoise@gmail.com">storytoise@gmail.com</a> | +91 81796 97610<br />
                STORYTOISE ©2024
            </Paragraph>
        </Footer>
    );