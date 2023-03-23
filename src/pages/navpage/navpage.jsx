/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'rsuite';
import {Switch} from 'antd';
import "./navpage.scss"

const NavBar = () =>{
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
    <div className={scrollPosition > 80 ? "NavPage-level sticky top-0 z-30 backdrop-filter backdrop-blur-sm hover:backdrop-blur bg-opacity-20 flex flex-row justify-center p-4 w-full text-black" : "NavPage-level sticky top-0 z-30 backdrop-filter backdrop-blur-sm hover:backdrop-blur bg-opacity-30 flex flex-row justify-center p-4 w-full text-white"}>
    <Navbar className='w-full'>
        <Nav >
            <div className='NavBar lg:w-[70%] sm:w-[90%] flex flex-row justify-center'>
                <div className="lg:w-[40%] sm:w-[5%]"></div>
                <div className="NavBar-center w-full flex flex-row justify-between">
                    <div className="lg:text-xl sm:text-sm  hover:font-bold"><Nav.Item><Link to="/home">Home</Link></Nav.Item></div>
                    <div className="lg:text-xl sm:text-sm  hover:font-bold"><Nav.Item><Link to="/experience">Experience</Link></Nav.Item></div>
                    <div className="lg:text-xl sm:text-sm  hover:font-bold"><Nav.Item><Link to="/projects">Projects</Link></Nav.Item></div>
                    <div className="Toggle-language">
                    {/* <Switch
                        className="lg:h-[30px] lg:w-[100px] sm:h-[10px] sm:w-[10px] bg-green hover:bg-green"
                        checkedChildren={"Tiếng Việt"}
                        unCheckedChildren={"English"}
                        defaultunChecked
                    /> */}
                </div>
                </div>
            </div>
        </Nav>
    </Navbar>
    </div>
    )
};

export default NavBar;