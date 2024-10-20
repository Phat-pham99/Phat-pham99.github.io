/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import HomePageComponent from "../../components/homepage/homepage_component.jsx"
import { Carousel } from 'antd';
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import Phat_blue from "../../../Assets/phat_blue.jpg";
import Phat_red from "../../../Assets/phat_red.jpg";
import Phat_yellow from "../../../Assets/phat_yellow.jpg";
import "./homepage.scss"

export default function HomePage (){
  const SampleNextArrow = props => {
      const { className, style, onClick } = props
      return (
        <div
          className={className}
          style={{
            ...style,
            color: 'black',
            fontSize: '30px',
            lineHeight: '1.5715',
          }}
          onClick={onClick}
        >
          <RightSquareOutlined/>
        </div>
      )
    };
    const SamplePrevArrow = props => {
      const { className, style, onClick } = props
      return (
        <div
          className={className}
          style={{
            ...style,
            color: 'black',
            fontSize: '30px',
            lineHeight: '1.5715'
          }}
          onClick={onClick}
        >
          <LeftSquareOutlined />
        </div>
      )
    };
    const settings = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }

    return (
        <div className='body_home min-h-screen h-max min-w-screen flex flew-col justify-between lg:p-5 sm:p-2'>
        <div className="left-component min-h-screen h-max share_butt z-30 sm:pt-[20px]">
        <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse"
          className="large-scr-button fb-xfbml-parse-ignore">
          <Button type="dashed" className="text-black bg-white lg:px-2 sm:px-0 fixed lg:visible sm:invisible font-Pixel"> 
          <FacebookOfficialIcon className="lg:h-[22px] lg:w-[22px] sm:h-[15px] sm:w-[15px]" fill="#4267B2"/>  Share 
          </Button></a>
          <a target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse"
          className="Small-scr-button fb-xfbml-parse-ignore lg:invisible sm:visible"><Button type="" className="bg-white p-[0px] fixed lg:invisible sm:visible">
          <FacebookOfficialIcon className="sm:h-[30px] sm:w-[30px] lg:invisible sm:visible" fill="#4267B2"/>
          </Button></a>
        </div>
        <div className="center-component min-h-screen h-max lg:w-[60%] sm:w-[90%] bg-white justify-center space-x-5 rounded-2xl border-[5px] border-green">
            <HomePageComponent/>
      <div className="carousel-container w-[90%] h-[40%] flex flex-row justify-center">
        <Carousel {...settings} arrows autoplay dots={false} effect={"scrollx"} className="lg:w-[500px] md:w-[400px] sm:w-[200px] h-[40%] flex flex-row justify-center">
      <div className='flex flex-row justify-center font-Pixel'>
          <h1 className="p-4 w-full lg:text-base md:text-lg sm:text-sm"><img src={Phat_blue} className="shadow-sl contrast-100 rounded-lg lg:w-[300px] lg:h-[300px] sm: w-[150px] sm:h-[150px]"/>I have bachelor degree
          in Biomedical Engineering but I want to turn my path toward programming.
          I'm proficient in Python, ReactJs also having good knowledge of Data Science and having participated in several projects.
          </h1>
      </div>
      <div className='flex flex-row justify-center font-Pixel'>
      <h1 className="p-4 w-full lg:text-base md:text-lg sm:text-sm"><img src={Phat_red} className="shadow-xl contrast-100 rounded-lg lg:w-[300px] lg:h-[300px] sm: w-[150px] sm:h-[150px]"/>
      I like to play piano.
          </h1>
      </div>
      <div className='flex flex-row justify-center font-Pixel'>
      <h1 className="p-4 w-full lg:text-base md:text-lg sm:text-sm"><img src={Phat_yellow} className="shadow-xl contrast-100 rounded-lg lg:w-[300px] lg:h-[300px] sm: w-[150px] sm:h-[150px]"/>
      I love programming. I often spend time on fun projects after works.
          </h1>
      </div>
    </Carousel>
    </div>
        </div>
        <div className="h-[10%]">
        </div>
        </div>
    );
};
