import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.jsx";
import AboutPage from "./pages/about/aboutpage.jsx";
import ExperiencePage from "./pages/experience/experiencepage.jsx";
import NavBar from "./pages/navpage/navpage.jsx";
import ProjectPage from "./pages/projects/projectpage.jsx";
import ContactPage from "./pages/contact/contactpage.jsx";
import Footer from "./components/footer/footer.jsx";

const App = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-between">
        <Router>
          <div className="">
            <NavBar />
            <Routes >
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="experience" element={<ExperiencePage />} />
              <Route path="projects" element={<ProjectPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
};

export default App;
