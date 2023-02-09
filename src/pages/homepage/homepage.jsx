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
            <div className="">
            <Button color="red" appearance="primary" className="bg-black">
                <FacebookOfficialIcon fill="#4267B2"/> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Chia sẻ</a>
            </Button>
            </div>
            <div className="flex flex-grow justify-center">
                <img className='lg:h-[500px] lg:w-[500px] md:h-[300px] md:w-[300px] sm:[50px] sm:[50px]'src={Phat}/>
            </div>
        </div>
        
        </>
    );
}
export default HomePage;
