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
        data_language.current = data.data.languages;
        temp.current = data_language.current[0]["language"];
        console.log("BRuhhhhh",temp);
    };
    const Element = () => {
        return(
        <Collapse defaultActiveKey={['1']}>
        <Panel header="Languages" key="1">
          <h2>{temp.current}</h2>
        </Panel>
        <Panel header="Languages" key="2">
          <h2>{temp.current}</h2>
        </Panel>
        </Collapse>
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
    <Element/>
    </>
    );
}
export default ExperiencePage;
