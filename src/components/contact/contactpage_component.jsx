import React from 'react';

const ContactPageComponent = () =>{

    return (
    <>
        <div className='flex flex-row justify-center'>
            <h1 className=" flex flew-row justify-center lg:text-3xl md:text-2xl sm:text-xl">Contact Me</h1>
        </div>
        <br/>
        <div>
            <h2 className='flex flew-row justify-center lg:text-3xl md:text-xl sm:text-base text-red space-x-1'>Email :  <a className=" hover:underline space-x-1"href="mailto:hphat99@gmail.com?subject=Xin%20chào&body=Tôi%20muốn%20liên%20lạc%20với%20bạn">  Hphat99@gmail.com</a></h2>
        </div>
    </>
    );
}
export default ContactPageComponent;