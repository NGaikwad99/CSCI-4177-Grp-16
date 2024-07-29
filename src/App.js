
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import SignUp from './pages/SignUp';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path ="ContactUs" element={<ContactUs />} />
          <Route path = "FAQ" element={<FAQ />} />
          <Route path = "Login" element={<Login />} />
          <Route path = "SignUp" element={<SignUp />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;