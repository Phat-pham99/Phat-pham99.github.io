import React from 'react';

const ContactPageComponent = () =>{

    return (
    <>
        <div className='flex flex-row justify-center'>
            <h1 className=" text-3xl text-blue-900">Contact Me</h1>
        </div>
        <br/>
        <div>
            <h2 className='flex flex-row justify-center text-3xl text-red space-x-1'>Email :  <a className=" hover:underline space-x-1"href="mailto:hphat99@gmail.com?subject=Xin%20chào&body=Tôi%20muốn%20liên%20lạc%20với%20bạn">  Hphat99@gmail.com</a></h2>
        </div>
    </>
    );
}
export default ContactPageComponent;