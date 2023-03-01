import React,{useState, useRef} from 'react';
import Axios from 'axios';
import inprogress from "../../../Assets/work-in-progress.png"

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
    <div className="min-h-screen h-max min-w-screen flex flex-row justify-center">
            <img src={inprogress} className="lg:w-[40%] lg:h-[40%] xl:w-[40%] xl:h-[40%] sm:w-[50%] sm:h-[50%] content-center	"></img>
    </div>
    
    );
}
export default ProjectPage;