import React from 'react';
import {Link } from 'react-router-dom';

const Footer = () =>{

    return (
        <footer className="px-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-3 dark:bg-gray-800 border-t border-[#f2f2f2]">
        <div className="space-x-3">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Powered by ReactJs</span>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Icons by <a className="hover:underline"target="_blank"href="https://icons8.com/">icons8</a></span>
        </div>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a target="_blank" href="https://github.com/Phat-pham99/Phat-pham99.github.io" className="mr-4 hover:underline md:mr-6 ">This website Github repo</a>
            </li>
            <li>
                <a className="hover:underline"><Link to="/contact">Contact</Link></a>
            </li>
        </ul>
          </footer>
    );
}
export default Footer;

