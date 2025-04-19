/* eslint-disable */
import React, {useEffect} from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/homepage/homepage.jsx';
import AboutPage from './pages/about/aboutpage.jsx';
import ProfilePage from './pages/profile/profile.jsx';
import NavBar from "./pages/navpage/navpage.jsx";
import ProjectPage from "./pages/projects/projectpage.jsx";
import ContactPage from "./pages/contact/contactpage.jsx";
import Footer from "./components/footer/footer.jsx";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="total-app-level h-screen flex flex-col">
      <div className="Whole-app-background" style={{ backgroundImage: `url("https://www.pixelstalk.net/wp-content/uploads/2016/03/Free-Green-Backgrounds-free-download.png")` }}>
        <Router>
          <div className="mid-app-level">
            <NavBar/>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="experience" element={<ProfilePage />} />
              <Route path="projects" element={<ProjectPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </div>
    </div>
    </>
  );
};

export default App;
