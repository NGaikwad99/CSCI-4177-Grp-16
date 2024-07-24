import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './chatbot.css'; // Import the CSS file

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  headerBgColor: '#00bfff',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00bfff',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: 'Welcome to the chatbot!',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'You said: {previousValue}',
    end: true,
  },
];

const Chatbot = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="chatbot-container">
        <ChatBot steps={steps} />
      </div>
    </ThemeProvider>
  );
};

export default Chatbot;
