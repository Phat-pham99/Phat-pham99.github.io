/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'rsuite';
// import {Switch} from 'antd';
import "./navpage.scss";

export default function NavBar() {
    const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  // useEffect(() => {
  //   console.log(scrollPosition);
  // },[scrollPosition]);
    return (
    <div className={scrollPosition > 80 ?
     "NavPage-level sticky top-0 z-30 backdrop-filter backdrop-blur-sm hover:backdrop-blur bg-opacity-20 flex flex-row justify-center p-4 w-full font-Pixel text-black "
      : "NavPage-level sticky top-0 z-30 backdrop-filter backdrop-blur-sm hover:backdrop-blur bg-opacity-30 flex flex-row justify-center p-4 w-full font-Pixel text-white "}>
    <Navbar className='w-full'>
        <Nav >
            <div className='NavBar w-[70%] flex flex-row justify-center'>
                <div className="w-[50%]"></div>
                <div className="NavBar-center w-full flex flex-row lg:justify-between sm:justify-between space-x-1">
                    <div className="lg:text-2xl md:text-sm  hover:font-bold"><Nav.Item><Link to="/home">Home</Link></Nav.Item></div>
                    <div className="lg:text-2xl md:text-sm  hover:font-bold"><Nav.Item><Link to="/experience">Experience</Link></Nav.Item></div>
                    <div className="lg:text-2xl md:text-sm  hover:font-bold"><Nav.Item><Link to="/projects">Projects</Link></Nav.Item></div>
                </div>
            </div>
        </Nav>
    </Navbar>
    </div>
    )
};
