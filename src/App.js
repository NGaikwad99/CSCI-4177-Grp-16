import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './Landing';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;