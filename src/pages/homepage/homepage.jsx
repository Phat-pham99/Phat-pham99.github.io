import React from 'react';
import "./homepage.css"
import HomePageComponent from "../../components/homepage/homepage_component.jsx"
const HomePage = () =>{

    return (
        <div className='body_home '>
            <div className="flex flex-row justify-center">
                <HomePageComponent/>
            </div>
            <div className="flex flex-grow justify-center">
                <img className=' h-[300px] w-[300px]' src={"https://media.licdn.com/dms/image/C5603AQEnCwGqPqLpRQ/profile-displayphoto-shrink_800_800/0/1659011508842?e=1680134400&v=beta&t=IDt9NRUC1-s6I2nvdFNCpdKxLKof-Dikb4J6u89d2VU"}/>
            </div>
            <div class="fb-share-button" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
        </div>
    );
}
export default HomePage;