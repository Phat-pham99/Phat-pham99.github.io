import React from 'react';
import "./homepage.css"

import { Button } from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';

import HomePageComponent from "../../components/homepage/homepage_component.jsx"
import Phat from "../../../Assets/phat.jpeg"
const HomePage = () =>{

    return (
        <>
        <div className='body_home w-full'>
            <div className="flex flex-row justify-center">
                <HomePageComponent/>
            </div>
            <Button color="red" appearance="primary" className="bg-[#4267B2]">
                <FacebookOfficialIcon /> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Chia sẻ</a>
            </Button>
            <div className="flex flex-grow justify-center">
                <img className=' h-[300px] w-[300px]' src={Phat}/>
            </div>
        </div>
        
        </>
    );
}
export default HomePage;
