import React, {useRef} from 'react';
import { Button } from 'antd';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import HomePageComponent from "../../components/homepage/homepage_component.jsx"
import { Carousel } from 'antd';
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import Phat_blue from "../../../Assets/phat_blue.jpg";
import Phat_red from "../../../Assets/phat_red.jpg";
import Phat_yellow from "../../../Assets/phat_yellow.jpg";
import "./homepage.scss"

const HomePage = () => {
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
        <div className='body_home min-h-screen h-max  min-w-screen flex flew-col justify-between p-5'>
        <div className="left-component min-h-screen h-max share_butt z-30">
            <Button type="dashed" className="text-black bg-white px-2 fixed">
                <FacebookOfficialIcon className="h-[22px] w-[22px] "fill="#4267B2"/> <a target="_blank"
                 href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fphat-pham99.github.io%2F&amp;src=sdkpreparse"
                 className="fb-xfbml-parse-ignore">   Share </a>
            </Button>
        </div>
        <div className="center-component min-h-screen h-max w-[60%] sm:w-[90%] bg-white justify-center space-x-5 rounded-2xl">
            <HomePageComponent/>
      <div className="carousel-container w-[90%] h-[40%] flex flex-row justify-center ">
        <Carousel {...settings} arrows autoplay dots={false} effect={"scrollx"} className="lg:w-[500px] md:w-[400px] sm:w-[200px] h-[40%] flex flex-row justify-center">
      <div className='flex flex-row justify-center'>
          <h1 className="p-4 w-full lg:text-xl md:text-lg sm:text-base"><img src={Phat_blue} className="lg:w-[300px] lg:h-[300px] sm: w-[150px] sm:h-[150px]"/>I have bachelor degree
          in Biomedical Engineering but I want to turn my path toward programming.
          I'm proficient in Python, Javscript, ReactJs also having good knowledge of data science and having participated in several projects.
          </h1>
      </div>
      <div>
      <h1 className="p-4 w-full lg:text-xl md:text-lg sm:text-base"><img src={Phat_red} className="lg:w-[300px] lg:h-[300px] sm: w-[150px] sm:h-[150px]"/>
      I like to play piano. You can find some of my piano video on my facebook. 
          </h1>
      </div>
      <div>
      <h1 className="p-4 w-full lg:text-xl md:text-lg sm:text-base"><img src={Phat_yellow} className="lg:w-[300px] lg:h-[300px] sm: w-[150px] sm:h-[150px]"/>
      I love programming. I often spend time on fun projects after works.
          </h1>
      </div>
    </Carousel>
    </div>
            <div className="Comment-section h-max w-full ">
                <iframe name="f24fa0407cf65b" data-testid="fb:comments Facebook Social Plugin" title="fb:comments Facebook Social Plugin" allowtransparency="false" allowFullScreen={false} scrolling="yes" allow="encrypted-media" src="https://www.facebook.com/v2.5/plugins/comments.php?app_id=726204555155322&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df26b57f7b013f78%26phat-pham99.github.io%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fdinhvanlanh.info%252Ff2f1a85e3fe5e54%26relation%3Dparent.parent&amp;container_width=790&amp;height=100&amp;href=https%3A%2F%2Fphat-pham99.github.io&amp;locale=vi_VN&amp;numposts=5&amp;sdk=joey&amp;version=v2.5" className="min-h-[300px] min-w-[100px] lg:w-full md:w-full sm:w-full px-[5%]"></iframe>
            </div>
        </div>
        <div className="h-[10%]">
        </div>
        </div>
    );
}
export default HomePage;
