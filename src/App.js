
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './Landing';
import Header from './Header';
import Footer from './Footer';
import ContactUs from './ContactUs';
import FAQ from './FAQ';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path ="ContactUs" element={<ContactUs />} />
          <Route path = "FAQ" element={<FAQ />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;