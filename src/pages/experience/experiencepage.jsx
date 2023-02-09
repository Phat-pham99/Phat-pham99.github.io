import React,{useState, useEffect, useRef} from 'react';
import ExperiencePageComponent from "../../components/experience/experiencepage_component.jsx";
// import Language from '@rsuite/icons/legacy/Language';
import Realtime from '@rsuite/icons/legacy/Realtime';

import English from "../../../Assets/england.png";
import Vietnamese from "../../../Assets/vietnam.png";
import Japanese from "../../../Assets/japan.png";
import Django from "../../../Assets/django.svg";
import React_icon from "../../../Assets/react.svg";
import Language from "../../../Assets/language.svg";
import Coding from "../../../Assets/coding.svg";
import Python from "../../../Assets/python.svg";
import Javascript from "../../../Assets/javascript.svg";
import Axios from 'axios';
import { Collapse } from 'antd';
import "./experiencepage.css"
const { Panel } = Collapse;


const ExperiencePage = () =>{
    const [data_total,setDataTotal] = useState([]);
    const [data_basic,setDataBasic] = useState([]);
    const data_language = useRef([]);
    const temp = useRef([]);
    // const [data_language,setDataLanguage] = useState([]);
    
    const getData = async () =>{
            const data = await Axios.request({
                url: "https://gitconnected.com/v1/portfolio/phat-pham99",
                method: "get",
            });
        setDataTotal(data.data);
        setDataBasic(data.data.basics);
        data_language.current = data.data;
        temp.current = data.data;
        console.log("BRuhhhhh",data_total.languages[0].language);
    };

    const PeopleFoldSvg = props => (
        <Python/>
      );

    const Element = () => {
        return(
            <div className='flex flex-row justify-center'>
        <Collapse className ="lg:text-2xl md:text-xl sm:text-base w-[50%]" defaultActiveKey={['1']}>
        <Panel header={<div className='flex space-x-3'><img className="h-[60px] w-[60px]"src={Language}/><h1>Language</h1></div>} showArrow={false} key="1"> 
          <h2><div className='flex space-x-[50px]'><img className="h-[70px] w-[70px] align-top"src={English}/><h1>English</h1><a className="text-blue text-base hover:underline" target="_blank" href="https://media.licdn.com/dms/document/C562DAQH2qpDAgJcBuA/profile-treasury-document-pdf-analyzed/0/1657813308703?e=1677110400&v=beta&t=e3mRX8RwxM5Rcmusudoklbkol4rniBIJLRzjXndW08c">Link to certificate</a></div></h2>
          <h2><div className='flex space-x-[50px]'><img className="h-[60px] w-[60px]"src={Japanese}/><h1>Japanese</h1><a className="text-blue text-base hover:underline" target="_blank" href="https://media.licdn.com/dms/image/C562DAQEgTEMOwzItsw/profile-treasury-image-shrink_1280_1280/0/1635000386719?e=1676527200&v=beta&t=Fjqaud944KbXDYCydYnLE96KR9C-5n4WVc3ervUbK6c">Link to certificate</a></div></h2>
          <h2><div className='flex space-x-[50px]'><img className="h-[60px] w-[60px]"src={Vietnamese}/><h1>Vietnamese</h1></div></h2>
        </Panel>
        <Panel header={<div className='flex space-x-3'><img className="h-[60px] w-[60px]"src={Coding}/><h1>Skills</h1></div>} showArrow={false} key="2">
            <Collapse className ="lg:text-2xl md:text-xl sm:text-base">
            <Panel header={<div className='flex space-x-3'><img className="h-[60px] w-[60px]"src={Python}/><h1>Python</h1></div>} showArrow={false} >
                <h2><div className='flex space-x-3'><img className="h-[60px] w-[60px]"src={Django}/><h1>Django</h1></div></h2>
                <h2>Selenium</h2>
                <Collapse className ="lg:text-2xl md:text-xl sm:text-base">
                <Panel header="Data science - Data Analysis" showArrow={false} >
                <h2><div className='flex space-x-3'><Realtime/> <h1>TimeSeries Forecast</h1></div></h2>
                <h2>Natural Language Processing</h2>
                <h2>Computer Vision</h2>
                <h2>Data Visualization</h2>
            </Panel>
            </Collapse>
            </Panel>
            </Collapse>
            <Collapse className ="lg:text-2xl md:text-xl sm:text-base">
            <Panel header={<div className='flex space-x-3'><img className="h-[60px] w-[60px]"src={Javascript}/><h1>Javascript</h1></div>} showArrow={false} >
                <h2>{<div className='flex space-x-3'><img className="h-[60px] w-[60px]"src={React_icon}/><h1>React</h1></div>}</h2>
            </Panel>
        </Collapse>
        </Panel>
        <Panel header="Work" showArrow={false} key="3">
          <h2>Terralogic Inc,</h2>
        </Panel>
        </Collapse>
       
        </div>
        )
    };

    useEffect(()=> {
        getData();
    },[])
    useEffect(()=> {
        console.log("Total",data_total);
        console.log("Basics",data_basic);
        console.log("Languages",data_language);
        console.log("temp",temp);
    },[data_total]);
    return (
    <>
    <div className='body_experience flex flex-row justify-center'>
        <ExperiencePageComponent/>
    </div>
    <br/>
    <Element/>
    </>
    );
}
export default ExperiencePage;
