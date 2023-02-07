import React from 'react';
import "./homepage.css"
import HomePageComponent from "../../components/homepage/homepage_component.jsx"
import Phat from "../../../Assets/phat.jpeg"
const HomePage = () =>{

    return (
        <div className='body_home h-[1000px] w-full'>
            <div className="flex flex-row justify-center">
                <HomePageComponent/>
            </div>
            <div className="flex flex-grow justify-center">
                <img className=' h-[300px] w-[300px]' src={Phat}/>
            </div>
            <div class="fb-share-button" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
        </div>
    );
}
export default HomePage;
