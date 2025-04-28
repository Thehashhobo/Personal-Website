import React, { useState } from 'react';
import { ChatBotWidget } from 'chatbot-widget-ui';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Aboutpage from './pages/Aboutpage';
import Resumepage from './pages/Resumepage';
import Projectpage from './pages/Projectpage';
import Contactpage from './pages/Contactpage';
import ScrollToTop from './components/ScrollToTop';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const App: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: "Hi! I'm Jerry Wang's assistant. Feel free to ask me anything about Jerry!" }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [iconClicked, setIconClicked] = useState(false); // Track if the icon is clicked

  const customApiCall = async (userMessage: string): Promise<string> => {
    setIsTyping(true);
    try {
      const response = await axios.post('https://api.jerrywjn.com/api/ask', {
        question: userMessage
      });
      return response.data.answer;
    } catch (error) {
      console.error(error);
      return "Oops! Something went wrong. Please try again later.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewMessage = (newMessage: { content: string }) => {
    setMessages(prev => [...prev, { role: 'user', content: newMessage.content }]);
  };

  const handleBotResponse = (botResponse: string) => {
    console.log("Bot Response:", botResponse);
    setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <div
            className={!iconClicked ? "wiggle-animation" : ""} // Apply animation if not clicked
            onClick={() => setIconClicked(true)} // Stop animation on click
          >
            <ChatBotWidget
              callApi={customApiCall}
              onBotResponse={handleBotResponse}
              handleNewMessage={handleNewMessage}
              messages={messages}
              primaryColor="#ebcd02"
              inputMsgPlaceholder="Type your question..."
              chatbotName="Jerry's Assistant"
              isTypingMessage={isTyping ? "Typing..." : undefined}
              IncommingErrMsg="Oops! Something went wrong. Try again."
              chatIcon={<div>🤖</div>}
              botIcon={<div>🤖</div>}
              botFontStyle={{
                fontFamily: "Arial",
                fontSize: "14px",
                color: "black",
              }}
              typingFontStyle={{
                fontFamily: "Arial",
                fontSize: "14px",
                color: "#888",
                fontStyle: "italic",
              }}
              useInnerHTML={true}
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Aboutpage />} />
          <Route path="/resume" element={<Resumepage />} />
          <Route path="/projects" element={<Projectpage />} />
          <Route path="/contact" element={<Contactpage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
