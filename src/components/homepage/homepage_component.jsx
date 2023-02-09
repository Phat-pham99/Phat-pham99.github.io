import React from 'react';
import FacebookSquare from '@rsuite/icons/legacy/FacebookSquare';
import LinkedinSquare from '@rsuite/icons/legacy/LinkedinSquare';
import GithubSquare from '@rsuite/icons/legacy/GithubSquare';


const HomePageComponent = () =>{

    return (
    <div className=''>

        <div className='flex flex-row justify-center'>
            <h1 className="lg:text-4xl md:text-xl sm:text-base text-blue">Home Page</h1>
        </div>
        <br/>
        <br/>
        <div className='flex flex-row justify-center space-x-3'>
            <a href="https://www.facebook.com/hongphat.pham99/"><FacebookSquare className="h-[60px] w-[60px] p-[10px] hover:p-[0px]"/></a>
            <a href="https://www.linkedin.com/in/hphat99/"><LinkedinSquare className="h-[60px] w-[60px] p-[10px] hover:p-[0px]"/></a>
            <a href="https://github.com/Phat-pham99"><GithubSquare className="h-[60px] w-[60px] p-[10px] hover:p-[0px]"/></a>
        </div>
    </div>
    );
}
export default HomePageComponent;