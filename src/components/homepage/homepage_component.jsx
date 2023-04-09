import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import FacebookSquare from '@rsuite/icons/legacy/FacebookSquare';
import LinkedinSquare from '@rsuite/icons/legacy/LinkedinSquare';
import GithubSquare from '@rsuite/icons/legacy/GithubSquare';
import Detail from '@rsuite/icons/legacy/Detail';

export default function HomePageComponent (){

    return (
    <div className='Container_ px-4 h-max min-h-[100px] flex flew-col justify-center'>
        <div className=''>
        <div className='justify-center'>
            <h1 className=" flex flex-row justify-center text-green font-PixelLarge font-bold lg:text-5xl md:text-2xl sm:text-xl"><ReactTypingEffect text={["Hi, I'm Phat"]}/></h1>
            <br/>
            <h1 className="  flex flew-row justify-center lg:text-3xl md:text-xl sm:text-base font-Pixel">Welcome to my website !</h1>
        </div>
        <div className='flex flex-row justify-center share_buttons lg:space-x-[50px] sm:space-x-[10px]'>
            <a target="_blank" href="https://www.facebook.com/hongphat.pham99/"><FacebookSquare fill="#4267B2" className="lg:h-[90px] lg:w-[90px] sm:h-[70px] sm:w-[70px] p-[10px] hover:p-[0px]"/></a>
            <a target="_blank" href="https://www.linkedin.com/in/hphat99/"><LinkedinSquare fill="#0077b5" className="lg:h-[90px] lg:w-[90px] sm:h-[70px] sm:w-[70px]  p-[10px] hover:p-[0px]"/></a>
            <a target="_blank" href="https://github.com/Phat-pham99"><GithubSquare className="lg:h-[90px] lg:w-[90px] sm:h-[70px] sm:w-[70px]  p-[10px] hover:p-[0px]"/></a>
            <a target="_blank" href="https://gitconnected.com/phat-pham99/resume"><Detail fill="black" className="lg:h-[90px] lg:w-[90px] sm:h-[70px] sm:w-[70px] p-[10px] hover:p-[0px]"/></a>

        </div>
        </div>
    </div>
    );
};
