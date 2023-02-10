import React,{useState, useRef} from 'react';
import Axios from 'axios';
import {Steps } from 'antd';
import Terralogic from "../../../Assets/terralogic.jpeg";


const ProjectPage = () =>{
    
    const date = new Date();
    const start_date = new Date("2022-08-03");
    let month = date.getMonth() + 1;
    console.log("Have been",start_date.getMonth() + 1-month, "months") // "17-6-2022"

    const description = 
<>
<div className='flex flex-row space-x-3'>
<h2 className="font-bold">Associate Software Engineer</h2> <h2 className="font-light">Fulltime</h2>
</div>
<h2 className='text-base font-light'>Ho Chi Minh City Metropolitan Area</h2>
<h2 className='text-base font-medium'>Aug 2022 - Present · {start_date.getMonth() + 1-month} months</h2>
</>;

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
       <Steps
    current={1}
    direction="vertical"
    items={[
      {
        title:  <h2><div className='flex space-x-[50px]'><img className="lg:h-[70px] lg:w-[70px] sm:h-[35px] sm:w-[35px] "src={Terralogic}/><h1><a className='hover:font-bold hover:text-black' target="_blank" href='https://terralogic.com/'>Terralogic Inc,</a></h1></div></h2>,
        description,
      },
    ]}
  />
    </div>
    
    );
}
export default ProjectPage;