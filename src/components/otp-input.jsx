import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length=4,onOtpSubmit=()=>{}}) => {
    const [Otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([])

    useEffect(()=>{
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    },[]);

    
   

    const handleChange=(index,e)=>{
        const value=e.target.value;
       
        if(isNaN(value))return;

        const newOtp=[...Otp];
        
        //allow only one input

        newOtp[index]=value.substring(value.length-1);
        setOtp(newOtp);

        // submit trigger
        const combinedOtp=newOtp.join("");
        if (combinedOtp.length===length) {
            onOtpSubmit(combinedOtp);
        }

        // move to next input if current field is filled
        if (value && index<length-1 && inputRefs.current[index+1]) {
            inputRefs.current[index+1].focus();
        }
       
    }
    const handleClick=(index)=>{
        inputRefs.current[index].setSelectionRange(1,1);
    }

    const handleKeyDown=(index,e)=>{
        if (e.key==='Backspace'&&!Otp[index] && index>0 &&inputRefs.current[index-1]) {
            inputRefs.current[index-1].focus();
        }
    }
  return (
    
    <div>
        {
            Otp.map((value,index)=>{
                return <input key={index} type="text" value={value} onChange={(e)=>{handleChange(index,e)}} 
                ref={(input)=>{inputRefs.current[index]=input}}
                onClick={()=>{handleClick(index)}} 
                onKeyDown={(e)=>{handleKeyDown(index,e)}}
                className='otpInput'
                />
        
            })
        }
    </div>
  )
}

export default OtpInput