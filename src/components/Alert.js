import aos from 'aos';
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'

const Alert = ({color,text}) => {
    useEffect(()=>{
        aos.init({duration:1000});
    });
    const alert={
        "position":"absolute",
        "top":"5%",
        "right":"7%",
        "height":"50px",
        "backgroundColor":color,
        "padding":"12px 20px",
        "zIndex":"10",
        "color":"white",
        'borderRadius':"10px",
        "fontWeight":"bolder"
    }
  return (
    <>
        <div style={alert} data-aos="fade-left">
            {text}
        </div>
    </>
  );
}

export default Alert