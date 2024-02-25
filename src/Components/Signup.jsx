import React, { useContext, useEffect, useState } from 'react'
import signUpIllu from '../assets/signup.svg'
import {  useNavigate } from 'react-router-dom';
import appContext from '../context/appContext';
import Loader from '../utils/Loader';
function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [signUp, setSignUp] = useState(true);
    const navigate=useNavigate()
    const {setshowSidebar,register,login,loading}=useContext(appContext)
    setshowSidebar(false)
  
    // const handleSubmit=()=> {
        
    //     navigate("/verifyOtp")
    //     return otp;
    //   }
    useEffect(() => {
      navigate("/")
    }, [])
    
      
  return (
    <div className="relative bg-teal-700/85 p-8 rounded-lg w-full max-w-2xl mx-auto  flex justify-between  items-center border-2 border-y-4 shadow-md shadow-cyan-800 border-teal-400">
    {loading && <Loader/> }
    
      <img src={signUpIllu} alt="Logo" className="w-1/2 sm:w-1/3 mt-8" />
      {
        signUp &&
      <div className="flex flex-col items-center w-full sm:w-1/2">
        <h2 className="text-2xl w-full text-left mb-4 ">Sign Up</h2>
        <input type="email" required  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full p-2 mb-4 rounded-md outline-none ${email? "bg-slate-800":""}`} />
        <input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-2 mb-4 rounded-md outline-none ${name? "bg-slate-800":""}`} />
        <button onClick={()=>register(email,name)} disabled={email.trim()=="" || name.trim()==""} className="disabled:cursor-not-allowed disabled:bg-slate-800 disabled:border-none w-ful p-x-5 cursor-pointer border-1 border-x-2 border-teal-400 bg-teal-950 text-white rounded-md mb-2">Verify email</button>
        <p>Already have an account ? <span onClick={()=>setSignUp(!signUp)} className='cursor-pointer underline-offset-2 underline text-teal-100'>Log in</span></p>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        </div>
        }
        {
        !signUp &&
      <div className="flex flex-col items-center w-full sm:w-1/2">
        <h2 className="text-2xl mb-4 w-full text-left">Log in</h2>
        <input type="email" required  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full p-2 mb-4 rounded-md outline-none ${email? "bg-slate-800":""}`} />
        <button onClick={()=>login(email)} disabled={email.trim()==""} className="disabled:cursor-not-allowed disabled:bg-slate-800 disabled:border-none  w-ful p-x-5 cursor-pointer border-1 border-x-2 border-teal-400 bg-teal-950 text-white rounded-md mb-2">Verify email</button>
        <p>First time ? <span onClick={()=>setSignUp(!signUp)} className='cursor-pointer underline-offset-2 underline text-teal-100'>Sign up</span></p>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        </div>
        }
      </div>
  )
}

export default Signup