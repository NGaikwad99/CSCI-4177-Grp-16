
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing';
import Header from './Header';
import Footer from './Footer';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
import MeetingScheduler from './components/MeetingScheduler';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path ="ContactUs" element={<ContactUs />} />
          <Route path = "FAQ" element={<FAQ />} />
          <Route path = "MeetingScheduler" element={<MeetingScheduler />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;