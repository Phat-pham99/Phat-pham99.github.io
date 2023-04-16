/* eslint-disable */
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";
import HomePage from './pages/homepage/homepage.jsx';
import AboutPage from './pages/about/aboutpage.jsx';
import ProfilePage from './pages/profile/profile.jsx';
import NavBar from "./pages/navpage/navpage.jsx";
import ProjectPage from "./pages/projects/projectpage.jsx";
import ContactPage from "./pages/contact/contactpage.jsx";
import PianoPage from "./pages/piano/piano.jsx";
import Footer from "./components/footer/footer.jsx";
import "./App.css"
import ParticlesBackground from "./pages/particles/particles.jsx";
import { browserName, CustomView } from 'react-device-detect';

const App = () => {
 
  useEffect(() =>{
    console.log("browserName", browserName);
  },[]);
  return (
    <>
      <div className="total-app-level h-screen flex flex-col">
      <CustomView condition={browserName === "Chrome"}>
        <ParticlesBackground/>
      </CustomView>
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
              <Route path="piano" element={<PianoPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
