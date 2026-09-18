import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { usePrefersReducedMotion } from './hooks/useTypewriter.js';
import { SECTIONS } from './data/site';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function Page() {
  const { section } = useParams();
  const reduced = usePrefersReducedMotion();
  const valid = !section || SECTIONS.includes(section);

  useEffect(() => {
    if (!section || !SECTIONS.includes(section)) return;
    document.getElementById(section)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [section, reduced]);

  if (!valid) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-btop-bg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-brand focus:bg-btop-bg focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-brand"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/:section" element={<Page />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
