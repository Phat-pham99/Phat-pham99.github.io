import React from 'react';
import "./homepage.css"
import { Button } from 'antd';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import HomePageComponent from "../../components/homepage/homepage_component.jsx"
import Detail from '@rsuite/icons/legacy/Detail';
import { Carousel } from 'antd';
import Phat_blue from "../../../Assets/phat_blue.jpg"
import Phat_red from "../../../Assets/phat_red.jpg"
import Phat_yellow from "../../../Assets/phat_yellow.jpg"

const HomePage = () =>{
    const contentStyle = {
        margin: 0,
        height: '300px',
        width: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'right',
      };
    return (
        <>
        <div className='body_home min-h-screen h-max min-w-screen flex flew-col justify-between p-5'>
        <div className="left-component share_butt p-4">
            <Button type="dashed" className="text-black bg-white px-2 fixed">
                <FacebookOfficialIcon className="h-[22px] w-[22px]"fill="#4267B2"/> <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">   Chia sẻ </a>
            </Button>
        </div>
            <div className="center-component min-h-screen h-max min-w-screen w-[60%] bg-white justify-center space-x-5 rounded-2xl">
                <HomePageComponent/>
      <div className="carousel-container w-[400px] h-[40%]">
      <Carousel autoplay dotPosition={"bottom"} effect={"scrollx"} className="w-[400px] h-[40%] flex flex-row justify-center">
      <div className='flex flex-row justify-center'>
          <h1 className="p-4"><img src={Phat_blue} style={contentStyle}/>I have bachelor degree in Biomedical Engineering but I want to turn my path toward programming. I'm proficient in Python, AWS , GCP and SQL, also having good knowledge of machine learning and having participated in several projects.
          It would be wonderful for me to have have a chance to work in a professional environment as well as working with people from all around the world.
          </h1>
      </div>
      <div>
      <img src={Phat_red} style={contentStyle}/>
      </div>
      <div>
      <img src={Phat_yellow} style={contentStyle}/>
      </div>
    </Carousel>
    </div>
            </div>
            <div className='right-component-resume pt-5'><a target="_blank" href="https://gitconnected.com/phat-pham99/resume"><Detail fill="white" className="lg:h-[90px] lg:w-[90px] sm:h-[50px] sm:w-[50px] p-[10px] hover:p-[0px]"/></a></div>
        </div>
        </>
    );
}
export default HomePage;
