import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import FacebookSquare from '@rsuite/icons/legacy/FacebookSquare';
import LinkedinSquare from '@rsuite/icons/legacy/LinkedinSquare';
import GithubSquare from '@rsuite/icons/legacy/GithubSquare';

const HomePageComponent = () =>{
    return (
    <div className='Container_ p-4'>
        <div className=''>
            <h1 className="flex justify-center text-green font-bold lg:text-5xl md:text-xl sm:text-base"><ReactTypingEffect text={["Hi, I'm Phat"]}/></h1>
            <br/>
            <h1 className="flex justify-center lg:text-3xl md:text-2xl sm:text-base">Welcome to my website !</h1>
        </div>
        <div className='share_buttons flex flex-row justify-center space-x-3'>
            <a target="_blank" href="https://www.facebook.com/hongphat.pham99/"><FacebookSquare fill="#4267B2" className="lg:h-[90px] lg:w-[90px] sm:h-[50px] sm:w-[50px] p-[10px] hover:p-[0px]"/></a>
            <a target="_blank" href="https://www.linkedin.com/in/hphat99/"><LinkedinSquare fill="#0077b5" className="lg:h-[90px] lg:w-[90px] sm:h-[50px] sm:w-[50px] p-[10px] hover:p-[0px]"/></a>
            <a target="_blank" href="https://github.com/Phat-pham99"><GithubSquare className="lg:h-[90px] lg:w-[90px] sm:h-[50px] sm:w-[50px] p-[10px] hover:p-[0px]"/></a>
        </div>
    </div>
    );
}
export default HomePageComponent;