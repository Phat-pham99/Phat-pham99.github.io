import React from 'react';
import "./homepage.css"
import HomePageComponent from "../../components/homepage/homepage_component.jsx"

const HomePage = () =>{

    return (
        <div className='body_home '>
            <div className="flex flex-row justify-center">
                <HomePageComponent/>
            </div>
        </div>
    );
}
export default HomePage;