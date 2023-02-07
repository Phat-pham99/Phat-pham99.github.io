import React from 'react';

const ContactPageComponent = () =>{

    return (
    <>
        <div className='flex flex-row justify-center'>
            <h1 className=" text-3xl text-blue-900">Contact Page</h1>
        </div>
        <div>
            <h2 className='flex flex-row justify-center text-3xl text-red'>Email : Hphat99@gmail.com</h2>
            <h2 className='flex flex-row justify-center text-3xl hover:text-pink'><a href="https://www.linkedin.com/in/hphat99/">LinkedIn</a></h2>
        </div>
    </>
    );
}
export default ContactPageComponent;