import React from 'react';
import Work from "../../../Assets/work.png";
import Terralogic from "../../../Assets/terralogic.jpeg";
import English from "../../../Assets/england.png";
import Vietnamese from "../../../Assets/vietnam.png";
import Japanese from "../../../Assets/japan.png";
import Django from "../../../Assets/django.svg";
import React_icon from "../../../Assets/react.svg";
import Language from "../../../Assets/language.svg";
import Coding from "../../../Assets/coding.svg";
import Python from "../../../Assets/python.svg";
import Javascript from "../../../Assets/javascript.svg";
import Education from "../../../Assets/education.png"
import BK from "../../../Assets/BK.png"
import IELTS from "../../../Assets/My_IELTS_Certificate.pdf";
import Tensorflow from "../../../Assets/tensorflow.svg";
import "./profile.css"
import {Steps } from 'antd';
import { Collapse } from 'antd';
import Moment from 'react-moment';

const { Panel } = Collapse;

const ProfilePage = () =>{

    const start_date = new Date("2022-08-03");

    const Element = () => {
        return(
            <div className='collapse-container flex flex-row justify-center p-4'>
        <Collapse className ="lg:text-2xl md:text-xl sm:text-base lg:w-[60%] md:w-[60%] sm:w-[80%]" style={{'backgroundColor' : '#ccffe6'}} defaultActiveKey={['1']}>
        <Panel header={<div className='flex space-x-3'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px]"src={Work}/><h1>Experience</h1></div>} showArrow={true} key="1">
          <div ><Steps
    current={1}
    direction="vertical"
    size ="lg"
    progressDot
    responsive
    items={[
      {
        title:  <h2><div className='flex space-x-[50px]'><img className="lg:h-[80px] lg:w-[80px] sm:h-[35px] sm:w-[35px] "src={Terralogic}/><h1><a className='hover:font-bold hover:text-black' target="_blank" href='https://terralogic.com/'>Terralogic Inc,</a></h1></div></h2>,
        description :     
        <>
          <div className='flex flex-row space-x-3'>
          <h2 className="font-bold">Associate Software Engineer</h2> <h2 className="font-light">Fulltime</h2>
          </div>
          <h2 className='text-base font-light'>Ho Chi Minh City Metropolitan Area</h2>
          <h2 className='text-base font-medium'>Aug 2022 - Present ?? <Moment date={start_date} format="MM" durationFromNow /> months</h2>
        </>,
      },
      {},
    ]}
  /></div>
        </Panel>
        <Panel header={<div className='flex space-x-3'><img className="lg:h-[80px] lg:w-[80px] sm:h-[35px] sm:w-[35px] "src={Education}/><h1>Education</h1></div>} showArrow={true} key="2">
          <div className='text-sm pl-[3%]'>
            <h2><div className='flex space-x-[50px] text-base'><img className=" lg:h-[80px] lg:w-[80px] sm:h-[35px] sm:w-[35px] "src={BK}/><h1><a className='hover:font-bold hover:text-black' target="_blank" href='https://hcmut.edu.vn/'>HoChiMinh City University of Technology (HCMUT)</a></h1></div></h2>
            <div className='flex flex-row space-x-3'>
            <h2 className="font-bold"> BE in <a className='' target="_blank" href='https://en.wikipedia.org/wiki/Biomedical_engineering'>Biomedical Engineering</a></h2> <h2 className="font-light">Fulltime</h2>
            </div>
            <h2 className='text-base font-light'>Ho Chi Minh City - Thu Duc city</h2>
            <h2 className='text-base font-medium'>Sep 2017 - November 2021 ?? <Moment diff="2017-09-01" unit="years">2021-11-01</Moment> years</h2>
      </div>
        </Panel>
        <Panel header={<div className='flex space-x-3'><img className="lg:h-[70px] lg:w-[70px] sm:h-[30px] sm:w-[30px]"src={Language}/><h1>Language</h1></div>} showArrow={true} key="3"> 
          <h2><div className='flex lg:space-x-[60px] sm:space-x-[20px]'><img className="lg:h-[70px] lg:w-[70px] sm:h-[35px] sm:w-[35px] "src={English}/><h1>English</h1><a className="text-blue  sm:text-sm lg:text-base hover:underline" target="_blank" href={IELTS}>Click to view certificate</a></div></h2>
          <h2><div className='flex lg:space-x-[60px] sm:space-x-[20px]'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px] "src={Japanese}/><h1>Japanese</h1></div></h2>
          <h2><div className='flex lg:space-x-[60px] sm:space-x-[20px]'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px] "src={Vietnamese}/><h1>Vietnamese</h1></div></h2>
        </Panel>
        <Panel header={<div className='flex space-x-3'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px]"src={Coding}/><h1>Skills</h1></div>} showArrow={true} key="4">
            <Collapse className ="lg:text-2xl md:text-xl sm:text-base" style={{'backgroundColor' : '#ccffe6'}}>
            <Panel header={<div className='flex space-x-3'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px]"src={Python}/><h1>Python</h1></div>} showArrow={true} >
                {/* <h2><div className='flex space-x-3'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px]"src={Django}/><h1>Django</h1></div></h2> */}
                <h2>Selenium</h2>
                <Collapse className ="lg:text-2xl md:text-xl sm:text-base" style={{'backgroundColor' : '#ccffe6'}}>
                <Panel header="Data science - Data Analysis" showArrow={true} >
                <h2><div className='flex lg:space-x-[60px] sm:space-x-[20px]'><img className="lg:h-[70px] lg:w-[70px] sm:h-[35px] sm:w-[35px] "src={Tensorflow}/><h1>Tensorflow</h1><a className="text-blue  sm:text-sm lg:text-base hover:underline" target="_blank" href={"https://www.coursera.org/account/accomplishments/verify/SLL28JQ9NVB7"}>
                  Click to view certificate</a></div></h2>
                <h2>Data Visualization</h2>
            </Panel>
            </Collapse>
            </Panel>
            </Collapse>
            <Collapse className ="lg:text-2xl md:text-xl sm:text-base" style={{'backgroundColor' : '#ccffe6'}}>
            <Panel header={<div className='flex space-x-3'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px]"src={Javascript}/><h1>Javascript</h1></div>} showArrow={true} >
                <h2>{<div className='flex space-x-3'><img className="lg:h-[60px] lg:w-[60px] sm:h-[30px] sm:w-[30px]"src={React_icon}/><h1>ReactJs</h1></div>}</h2>
            </Panel>
        </Collapse>
        </Panel>
        </Collapse>
        </div>
        )
    };
    return (
    <div className="min-h-screen h-max min-w-screen">
    <br/>
    <Element/>
    </div>
    );
}
export default ProfilePage;
