import React from 'react';
import {Link } from 'react-router-dom';

const Footer = () =>{

    return (
        <footer class="bottom-3 p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Powered by ReactJs</span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a class="hover:underline"><Link to="/contact">Contact</Link></a>
            </li>
        </ul>
          </footer>
    );
}
export default Footer;

