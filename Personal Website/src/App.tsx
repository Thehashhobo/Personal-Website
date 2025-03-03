import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Aboutpage from './pages/Aboutpage';
import Resumepage from './pages/Resumepage';
import Projectpage from './pages/Projectpage';
import Contactpage from './pages/Contactpage';

import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';




const App: React.FC = () => {

  return (
    <Router>
      <ScrollToTop />
      <Navbar />

        <Routes>
          <Route path="/" element={<Aboutpage />} />
          <Route path="/resume" element={<Resumepage />} />
          <Route path="/Projects" element={<Projectpage />} />
          <Route path="/Contact" element={<Contactpage />} />
          {/* <Route path="/trainings" element={<TrainingsPage />} /> */}
        </Routes>
        <Footer />
    </Router>
  );
};

export default App;