/* eslint-disable */

import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () =>{
    return (
        <div className="font-Pixel relative bottom-0 backdrop-filter backdrop-blur-sm hover:backdrop-blur-lg bg-opacity-30 md:flex md:items-center md:justify-between md:p-3 border">
        <div className="lg:space-x-[40px] sm:space-x-[20px]">
        <span className="lg:text-sm sm:text-sxm sm:text-center text-white">©2023 Built with ReactJs</span>
        <span className="lg:text-sm sm:text-sxm sm:text-center text-white">Icons by <a className="hover:underline"target="_blank"href="https://icons8.com/">icons8</a></span>
        </div>
        <ul className="flex flex-wrap items-center mt-3 sm:mt-0 lg:text-sm sm:text-sxm lg:space-x-[40px] sm:space-x-[20px]">
            <li>
                <a target="_blank" href="https://github.com/Phat-pham99/Phat-pham99.github.io" className="mr-4 md:mr-6 hover:underline text-orange">This website Github repo</a>
            </li>
            <li>
                <a className="lg:text-sm sm:text-sxm hover:underline text-orange"><Link to="/contact">Contact</Link></a>
            </li>
        </ul>
        </div>
    );
}
export default Footer;

