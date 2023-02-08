import React from 'react';

const ContactPageComponent = () =>{

    return (
    <>
        <div className='flex flex-row justify-center'>
            <h1 className=" text-3xl text-blue-900">Contact Page</h1>
        </div>
        <h2 className='flex flex-row justify-center text-3xl text-red-500'>Email : Hphat99@gmail.com</h2>
        <h2 className='flex flex-row justify-center text-3xl text-red-500 hover:text-blue-400'><a href="https://www.linkedin.com/in/phamhongphat09051999">LinkedIn</a></h2>
    </>
    );
}
export default ContactPageComponent;