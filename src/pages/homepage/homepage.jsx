import React from 'react';
import "./homepage.css"
import { Button } from 'antd';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import HomePageComponent from "../../components/homepage/homepage_component.jsx"
import Detail from '@rsuite/icons/legacy/Detail';
import Phat from "../../../Assets/phat.jpeg"
const HomePage = () =>{

    return (
        <>
        <div className='body_home w-screen flex flew-col justify-between h-screen'>
        <div className="left-component share_butt p-5">
            <Button type="dashed" className="">
                <FacebookOfficialIcon className="h-[22px] w-[22px] "fill="#4267B2"/> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Chia sẻ</a>
            </Button>
        </div>
            <div className="center-component w-[40%] bg-white justify-center space-x-5 h-full">
                <HomePageComponent/>
            </div>
            <div className='right-component resume pt-5'><a target="_blank" href="https://gitconnected.com/phat-pham99/resume"><Detail className="lg:h-[90px] lg:w-[90px] sm:h-[50px] sm:w-[50px] p-[10px] hover:p-[0px]"/></a></div>
        </div>
        </>
    );
}
export default HomePage;
