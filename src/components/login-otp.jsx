import React, { useState } from 'react'
import OtpInput from './otp-input';

const LoginWithOtp = () => {
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [showOtpInput, setshowOtpInput] = useState(false);
    const handlePhoneNumber=(event)=>{
        setPhoneNumber(event.target.value);
    }

    const handlePhoneSubmit=(event)=>{
        event.preventDefault();

        // phone validation

        const regex=/[^0-9]/g;

        if (PhoneNumber.length<10 || regex.test(PhoneNumber)) {
            alert("Invalid phone number");
            return;
        }


        //show otp field
        setshowOtpInput(true);

    }

    const onOtpSubmit=(otp)=>{
        console.log("Login successful. "+otp);
    }
  return (
    <div>
        {!showOtpInput?<form onSubmit={handlePhoneSubmit}>
            <input type="text" 
                   value={PhoneNumber}
                   placeholder='Enter Phone Number'
                   onChange={handlePhoneNumber}     
                        />
            <button type="submit">Submit</button>
        </form>:
        <div>
            <p>Enter OTP sent to {PhoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit}/>
        </div>}
    </div>
  )
}

export default LoginWithOtp