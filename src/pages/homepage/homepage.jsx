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
        <div className='body_home w-full flex flew-col justify-between'>
        <div className="left-component share_butt p-2">
            <Button type="dashed" className="">
                <FacebookOfficialIcon className="h-[22px] w-[22px] "fill="#4267B2"/> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Chia sẻ</a>
            </Button>
        </div>
            <div className="center-component bg-white justify-center space-x-1">
                <HomePageComponent/>
            <div className=""><img className='lg:h-[400px] lg:w-[400px] md:h-[200px] md:w-[200px] sm:[50px] sm:[50px]'src={Phat}/></div>
            </div>
            <div className='right-component resume'><a target="_blank" href="https://gitconnected.com/phat-pham99/resume"><Detail className="lg:h-[90px] lg:w-[90px] sm:h-[50px] sm:w-[50px] p-[10px] hover:p-[0px]"/></a></div>
        </div>
        </>
    );
}
export default HomePage;
