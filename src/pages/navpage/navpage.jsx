import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';

const NavBar = () => (
<div className="NavPage-level flex flex-row justify-center p-4 h-full w-full bg-gradient-to-r from-cyan-300 to-green-300">
<Navbar className='w-full'>
    <Nav className='w-full'>
        <div className="NavBar flex flex-row justify-between">
            <div className="text-2xl text-green-500 hover:text-green-600"><Nav.Item><Link to="/home">Home</Link></Nav.Item></div>
            <div className="text-2xl text-green-500 hover:text-green-600"><Nav.Item><Link to="/experience">Experience</Link></Nav.Item></div>
            <div className="text-2xl text-green-500 hover:text-green-600"><Nav.Item><Link to="/projects">Projects</Link></Nav.Item></div>
        <div className="text-2xl text-green-500 hover:text-green-600"><Nav.Menu title="About">
            <Nav.Item>About me</Nav.Item>
            <Nav.Item>Team</Nav.Item>
        </Nav.Menu></div>
        <div className="text-2xl text-green-500 hover:text-green-600"><Nav.Item><Link to="/contact">Contact</Link></Nav.Item></div>
        </div>
    </Nav>
</Navbar>
</div>
)

// const NavBar = () => (
//     <NavBar>   
//      <Nav>
//       <Link to="/home">Home</Link>
//       {/* <Link to="/about">About</Link> */}
//       <Link to="/experience">Experience</Link>
//     </Nav>
//     </NavBar>

//   );
export default NavBar;