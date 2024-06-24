import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';
import FAQ from './components/faq';
function App() {

  return (
    <Router>
      <Header/>
      <div>
        <Routes>
          {/*<Route path="/" element={<ContactUs />} />*/}
          <Route path="/" element={<FAQ />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
