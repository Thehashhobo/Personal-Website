import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Aboutpage from './pages/Aboutpage';
import Resumepage from './pages/Resumepage';
import Projectpage from './pages/Projectpage';
import Contactpage from './pages/Contactpage';

import ScrollToTop from './components/ScrollToTop';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main>
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
