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
      <div className="total-app-level h-screen flex flex-col justify-between">
        <Router>
          <div className="mid-app-level bg-[url('https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80')]">
            <NavBar />
            <Routes >
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="experience" element={<ExperiencePage />} />
              <Route path="projects" element={<ProjectPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
