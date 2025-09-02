'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Typography, Card, Carousel } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import StorySectionLayout from '../pages/StorySection';
import "../globals.css";

const { Title } = Typography;

const sections = [
  {
    title: "Publishing",
    description: "Learn how we publish creative stories and educational content for children.",
    color: "bg-teal-400",
    button: "Learn More"
  },
  {
    title: "Storytelling",
    description: "Explore our storytelling section for inspiring tales.",
    color: "bg-purple-400",
    button: "Explore"
  },
  {
    title: "Workshop",
    description: "Join our creative workshops and activities.",
    color: "bg-orange-400",
    button: "Join Now"
  }
];

const testimonials = [
  {
    quote: `"Your initiative is the best thing I think. Every school should have this. It is very important to educate children through stories."`,
    author: "Principal",
    org: "Educational Institution"
  },
  {
    quote: `"The workshops were engaging and fun. My students loved participating!"`,
    author: "Teacher",
    org: "Primary School"
  },
  {
    quote: `"A wonderful way to make learning interactive and meaningful."`,
    author: "Parent",
    org: "Community Member"
  }
];

const storytoiseAnswers: Record<string, string> = {
  application: "Hi there! 😊 To join our programs, just ask your parent or teacher to visit the Programs page and fill out the form. We'll send a friendly message back soon!",
  content: "We have lots of fun stories, workshops, and activities for kids. You can read, create, and share your ideas here!",
  publishing: "We help kids publish their stories and drawings. If you want to see your work in a book, let us know!",
  workshop: "Our workshops are all about learning and having fun together. Check the Workshop page for the next session!",
  bookclub: "The Book Club is a place to read and talk about your favorite books with friends. Join us for monthly picks and fun chats!",
  hello: "Hello! 👋 I'm Storytoise, your friendly helper. Ask me about joining, stories, workshops, or anything else!",
  default: "I'm Storytoise! Ask me about application, stories, workshops, publishing, or book club. I'm here to help you learn and have fun!"
};

function getStorytoiseAnswer(input: string) {
  const lower = input.toLowerCase();
  if (lower.includes('application') || lower.includes('join')) {
    return [
      "Hi there! 😊 To join our programs:",
      "• Ask your parent or teacher to visit the Programs page.",
      "• Fill out the form with your details.",
      "• We'll send a friendly message back soon!",
      "• If you need help, just ask me!"
    ];
  }
  if (lower.includes('content') || lower.includes('story')) {
    return [
      "Here's what you can do with our content:",
      "• Read fun stories and adventures.",
      "• Join workshops and activities.",
      "• Share your own ideas and stories!"
    ];
  }
  if (lower.includes('publish')) {
    return [
      "Publishing with Storytoise:",
      "• We help kids publish their stories and drawings.",
      "• Want to see your work in a book? Let us know!"
    ];
  }
  if (lower.includes('workshop')) {
    return [
      "About our workshops:",
      "• Learn and have fun together.",
      "• Check the Workshop page for the next session.",
      "• Everyone is welcome!"
    ];
  }
  if (lower.includes('book')) {
    return [
      "Book Club info:",
      "• Read and talk about your favorite books.",
      "• Join us for monthly picks and fun chats!"
    ];
  }
  if (lower.includes('hello') || lower.includes('hi')) {
    return [
      "Hello! 👋 I'm Storytoise, your friendly helper.",
      "• Ask me about joining, stories, workshops, or anything else!"
    ];
  }
  return [
    "I'm Storytoise! Ask me about:",
    "• Application",
    "• Stories",
    "• Workshops",
    "• Publishing",
    "• Book Club",
    "I'm here to help you learn and have fun!"
  ];
}

export default function Dashboard() {
  const [chatInput, setChatInput] = useState('');
  type ChatMessage = { sender: string; text: string | string[] };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'storytoise', text: storytoiseAnswers.default }
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: 'user', text: chatInput },
      { sender: 'storytoise', text: getStorytoiseAnswer(chatInput) }
    ]);
    setChatInput('');
  };

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const handlePrevTestimonial = () => {
    setTestimonialIdx(idx => (idx === 0 ? testimonials.length - 1 : idx - 1));
  };

  const handleNextTestimonial = () => {
    setTestimonialIdx(idx => (idx === testimonials.length - 1 ? 0 : idx + 1));
  };

  return (
    <StorySectionLayout title="Dashboard">
      {/* Main Content Card */}
      <main className="main-content" style={{ position: 'relative' }}>
        <Card className="main-card wide-card">
          {/* Movable Sections */}
          <section className="mb-8">
            <Carousel autoplay dots>
              {sections.map((section, idx) => (
                <div key={idx}>
                  <div className={`${section.color} h-48 flex flex-col items-center justify-center rounded-lg shadow-md relative`}>
                    <span className="text-white text-4xl font-bold">{section.title}</span>
                    <span className="text-white mt-2">{section.description}</span>
                    <button className="absolute bottom-4 right-4 bg-white text-teal-500 px-4 py-2 rounded shadow hover:bg-teal-100">{section.button}</button>
                  </div>
                </div>
              ))}
            </Carousel>
          </section>

          {/* Our Aim */}
          <section className="mb-8">
            <Title level={3} className="!mb-2">Our Aim</Title>
            <p className="text-gray-700 max-w-3xl">
              We want to educate children through stories that inspire, teach valuable life lessons, and create awareness about important social issues. Our mission is to make learning engaging, interactive, and impactful through creative storytelling techniques.
            </p>
          </section>

          {/* Overview */}
          <section className="mb-8">
            <Title level={4} className="!mb-2">Overview</Title>
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              <li><Link href="/pages/storytoise-studio" className="overview-link">Storytoise Studio</Link> <span className="overview-desc">Explore our storytelling section</span></li>
              <li><Link href="/pages/creating-workshop" className="overview-link">Creating Workshop</Link> <span className="overview-desc">Explore our creating workshop section</span></li>
              <li><Link href="/pages/publishing" className="overview-link">Publishing</Link> <span className="overview-desc">Explore our publishing section</span></li>
              <li><Link href="/pages/testimonials" className="overview-link">Testimonials</Link> <span className="overview-desc">Explore our testimonial section</span></li>
              <li><Link href="/pages/our-details" className="overview-link">Our Details</Link> <span className="overview-desc">Explore our details section</span></li>
              <li><Link href="/pages/book-club" className="overview-link">Book Club</Link> <span className="overview-desc">Explore our book club section</span></li>
            </ul>
          </section>

          {/* Movable Testimonials */} 
          <section className="mb-8">
            <Title level={3} className="!mb-4 text-center">TESTIMONIALS</Title>
            <div className="flex justify-center items-center">
              <button
                aria-label="Previous"
                onClick={handlePrevTestimonial}
                className="testimonial-arrow-btn testimonial-arrow-btn-left"
              >
                <ArrowLeftOutlined />
              </button>
              <Card className="text-center shadow-lg mx-auto testimonial-card-center">
                <p className="text-lg italic text-gray-700">{testimonials[testimonialIdx].quote}</p>
                <div className="mt-4 text-gray-600">
                  <span className="font-semibold" style={{ color: '#f44336', fontSize: '1.1rem' }}>
                    {testimonials[testimonialIdx].author}
                  </span>
                  <br />
                  <span className="text-sm">{testimonials[testimonialIdx].org}</span>
                </div>
                {/* Dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {testimonials.map((_, idx) => (
                    <span
                      key={idx}
                      className={`testimonial-dot${idx === testimonialIdx ? ' testimonial-dot-active' : ''}`}
                    />
                  ))}
                </div>
              </Card>
              <button
                aria-label="Next"
                onClick={handleNextTestimonial}
                className="testimonial-arrow-btn testimonial-arrow-btn-right"
              >
                <ArrowRightOutlined />
              </button>
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="mb-8">
            <Title level={4} className="!mb-2">Contact Us</Title>
            <div className="bg-fuchsia-100 rounded-lg p-4 text-center shadow">
              <div className="font-bold text-fuchsia-700 mb-2">We'd love to hear from you!</div>
              <div className="text-gray-700 mb-2">Email: <a href="mailto:info@storytoise.com" className="text-fuchsia-700 underline">info@storytoise.com</a></div>
              <div className="text-gray-700 mb-2">Phone: <span className="text-fuchsia-700">+91-1234567890</span></div>
              <div className="text-gray-700">Location: <span className="text-fuchsia-700">Mumbai, India</span></div>
            </div>
          </section>
        </Card>
      </main>
    </StorySectionLayout>
  );
}