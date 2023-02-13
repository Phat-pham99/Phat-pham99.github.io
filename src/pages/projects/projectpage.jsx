import React,{useState, useRef} from 'react';
import Axios from 'axios';
import {Steps } from 'antd';
import Terralogic from "../../../Assets/terralogic.jpeg";


const ProjectPage = () =>{

    const [data_total,setDataTotal] = useState([]);
    const temp = useRef([]);    
    const getData = async () =>{
            const data = await Axios.request({
                url: "https://gitconnected.com/v1/portfolio/phat-pham99",
                method: "get",
            });
        setDataTotal(data.data);
        temp.current = data.data;
        console.log("data_total",data_total);
    };
    return (
    <div className='w-full flex flex-row justify-center'>
       <h1>Project page</h1>
    </div>
    
    );
}
export default ProjectPage;