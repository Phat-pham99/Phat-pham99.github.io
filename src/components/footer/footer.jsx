import React from 'react';
import {Link } from 'react-router-dom';

const Footer = () =>{

    return (
        <div className="relative bottom-0 backdrop-filter backdrop-blur-sm hover:backdrop-blur-lg bg-opacity-30 md:flex md:items-center md:justify-between md:p-3 border">
        <div className="space-x-3">
        <span className="text-sm text-white sm:text-center ">©2023 Built with ReactJs</span>
        <span className="text-sm text-white sm:text-center ">Icons by <a className="hover:underline"target="_blank"href="https://icons8.com/">icons8</a></span>
        </div>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
            <li>
                <a target="_blank" href="https://github.com/Phat-pham99/Phat-pham99.github.io" className="mr-4 hover:underline md:mr-6 ">This website Github repo</a>
            </li>
            <li>
                <a className="hover:underline"><Link to="/contact">Contact</Link></a>
            </li>
        </ul>
        </div>
    );
}
export default Footer;

