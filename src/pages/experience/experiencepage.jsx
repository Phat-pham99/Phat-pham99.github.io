import React,{useState, useEffect, useRef} from 'react';
import ExperiencePageComponent from "../../components/experience/experiencepage_component.jsx"
import Axios from 'axios';
import { Collapse } from 'antd';
const { Panel } = Collapse;
import "./experiencepage.css"

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

    const Element = () => {
        return(
            <div className='flex flex-row justify-center'>
        <Collapse className ="text-2xl w-[50%]" defaultActiveKey={['1']}>
        <Panel header="Languages" key="1">
          <h2>English</h2>
          <h2>Japanese</h2>
          <h2>Vietnamese</h2>
        </Panel>
        <Panel header="Skills" key="2">
            <Collapse className ="text-2xl">
            <Panel header="Python">
                <h2>Django</h2>
                <h2>Selenium</h2>
            </Panel>
            </Collapse>
            <Collapse className ="text-2xl">
            <Panel header="Javascript">
                <h2>ReactJs</h2>
            </Panel>
        </Collapse>
        </Panel>
        <Panel header="Work" key="3">
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
