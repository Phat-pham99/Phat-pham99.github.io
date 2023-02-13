import React from 'react';
import {Link } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';

const NavBar = () => (
<div className="NavPage-level sticky top-0 z-30 backdrop-filter backdrop-blur-sm hover:backdrop-blur bg-opacity-30 flex flex-row justify-center p-4 w-full ">
<Navbar className='w-full'>
    <Nav className='w-[60%] justify-center'>
        <div className="NavBar flex flex-row justify-between">
            <div className="lg:text-2xl md:text-sm text-green-500 hover:text-green-600 hover:font-bold"><Nav.Item><Link to="/home">Home</Link></Nav.Item></div>
            <div className="lg:text-2xl md:text-sm text-green-500 hover:text-green-600 hover:font-bold"><Nav.Item><Link to="/experience">Experience</Link></Nav.Item></div>
            <div className="lg:text-2xl md:text-sm text-green-500 hover:text-green-600 hover:font-bold"><Nav.Item><Link to="/projects">Projects</Link></Nav.Item></div>
        </div>
    </Nav>
</Navbar>
</div>
)

export default NavBar;