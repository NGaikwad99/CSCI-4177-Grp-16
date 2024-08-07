import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import LocalResources from './pages/LocalResources';
import OnlineResources from './pages/OnlineResources';
import Chatbot from './components/Chatbot';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path ="ContactUs" element={<ContactUs />} />
          <Route path = "FAQ" element={<FAQ />} />
          <Route path="OnlineResources" element={<OnlineResources />} />
          <Route path="LocalResources" element={<LocalResources />} />
        </Routes>
        
        <Footer />
      </Router>
      <Chatbot />
    </div>
  );
}

export default App;
