
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import appContext from '../context/appContext';
import { useAlert } from 'react-alert';
import Loader from '../utils/Loader';

const OtpBox = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpBoxReference = useRef([]);

  const {userId,userVerifed,loading,setloading, setsidebarToggle,setshowSidebar,setactive,generatedOtp}=useContext(appContext)
  setshowSidebar(false)
  const alert=useAlert()
  const navigate=useNavigate()
  const handleChange = (index, value) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value !== '' && index < 5) {
      otpBoxReference.current[index + 1].focus()
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOtp = pastedData.split('');
    setOtp((prevOtp)=>{
      const newOtp=[...prevOtp];
      for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedOtp[i]?pastedOtp[i]:'';
      }
      return newOtp;
    });

    if (pastedOtp.length>6) {
      otpBoxReference.current[5].focus()
    }else{
      otpBoxReference.current[pastedOtp.length-1].focus()
    }

    
    
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (index > 0) {
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index] = '';
          return newOtp;
        });
        if (index==5) {
          otpBoxReference.current[index ].focus()
        }
        otpBoxReference.current[index-1 ].focus()
        
      }
    } else if (e.key === 'ArrowLeft') {
      if (index > 0) {
        otpBoxReference.current[index -1].focus()
      }
    } else if (e.key === 'ArrowRight') {
      if (index < 5) {
        otpBoxReference.current[index +1].focus()
      }
    }
  };


  const handleSubmit=async()=>{
    let num=''
    for (let i = 0; i < otp.length; i++) {
      num += otp[i];
      
    }
    if (generatedOtp==num) {
      setloading(true)
      await userVerifed(userId)
      if (localStorage.getItem("userRegistered")) {
        navigate("/jobs")
        setsidebarToggle(true)
        setactive("jobs")
      }else{
        localStorage.setItem("userRegistered",true)
        navigate("/profile")
        setsidebarToggle(false)
        setactive("profile")
      }
      setloading(false)
    }else{
      alert.error("Otp not matching")
    }
    
  }



  useEffect(() => {
    otpBoxReference.current[0].focus()
   
  }, [])
  

  return (
    <div className= "flex flex-col place-items-center animate__animated animate__fadeIn bg-teal-800 p-8 pt-2 rounded-lg w-full max-w-2xl mx-auto   border-2 border-y-4 shadow-md shadow-cyan-800 border-teal-400">
    {loading && <Loader/>}
    
    <p className="text-xl w-full  text-slate-200 text-left my-4">otp sent to your email address</p>
    <div className="flex items-center justify-center h-">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(reference) => (otpBoxReference.current[index] = reference)}
          onPaste={handlePaste}
          className={`mx-2 p-4 w-16 h-16 text-center text-3xl border-2 border-teal-400 rounded-md focus:outline-none focus:border-2 ${digit!="" && "bg-slate-800" } focus:border-slate-300`}
          // disabled={index > 0 && otp[index - 1] === ''}
        />
      ))}
    </div>
    <button onClick={handleSubmit}  className="w-ful p-x-5 mt-4 cursor-pointer border-1 border-x-2 focus:outline-none border-teal-400 bg-teal-950 text-white rounded-md mb-2">Verify OTP</button>

    </div>
  );
};

export default OtpBox;

