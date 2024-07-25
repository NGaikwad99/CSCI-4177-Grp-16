import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import MeetingScheduler from './pages/MeetingScheduler';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/ContactUs" element={<MeetingScheduler />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/MeetingScheduler" element={<MeetingScheduler />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;