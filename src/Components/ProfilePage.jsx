import React, { useContext, useEffect, useState } from 'react';
import dummyUserImg from '../assets/user.webp'
import coinsImg from '../assets/coins.png'
import uploadImg from '../assets/upload.svg'
import PersonalDetails from './Profile/PersonalDetails';
import EducationDetails from './Profile/EducationDetails';
import ProjectDetails from './Profile/ProjectDetails';
import appContext from '../context/appContext';
import Experience from './Profile/Experience';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
    const {coinsEarned, setCoinsEarned,allDetails,userDetails} = useContext(appContext);
    const [experienceCount, setExperienceCount] = useState([1]);
    const [prevExEdited, setprevExEdited] = useState(false);
    const{email,fullName,experience_details,personal_details,educational_details,project_details}=allDetails
    const {setshowSidebar,setsidebarToggle,setactive}=useContext(appContext)
    setshowSidebar(true)
    // const navigate=useNavigate()

    // const handleChange = (e, setField, coins) => {
    //     setField(e.target.value);
    //     setCoinsEarned((prevCoins) => prevCoins + coins);
    // };

    useEffect(() => {
        
      if (experience_details?.length==0) {
        setExperienceCount([1])
        setprevExEdited(false)
      }else{
        setExperienceCount(experience_details)
        setprevExEdited(true)
      }
    }, [experience_details])
    
    useEffect(() => {
      userDetails()
    }, [])
    
    const handleAddExp=()=>{
        setExperienceCount((prev)=>{
            let arr=[...prev]
            arr.push(1)
            return arr
        })
        // experienceCount.push(1)
    }
    
    const navigate=useNavigate()
    
    const handleSkip=()=>{
        setsidebarToggle(true)
        navigate("/jobs")
        setactive("jobs")
    }
    return (
        <div className="container animate__animated animate__fadeIn w-screen mx-auto p-8">
            <button onClick={handleSkip} className=" fixed right-5 bottom-5 p-x-2 cursor-pointer border-1 border-x-2 border-slate-400 bg-gray-700 text-white rounded-md mb-1">Skip</button>

            <header className="sticky top-0 z-10  bg-stone-900 w-full border-b-2 border-cyan-400 mb-8 p-3 rounded-b-lg  flex justify-between">
                <div>
                    <img src={personal_details?.avatar ? personal_details.avatar : dummyUserImg} alt="" className="w-20 rounded-lg my-2" />
                    <h1 className="text-3xl font-semibold">{fullName}</h1>
                    <h1 className="text-lg font-semibold text-gray-300/80">{email}</h1>
                </div>
                <div className="self-center" >
                    <div className="text-lg flex px-2 rounded-lg justify-center items-center border-2 border-slate-500  bg-slate-800 ">
                        {coinsEarned} <img src={coinsImg} alt="" className='w-16' /> </div>
                </div>
            </header>


            <PersonalDetails details={personal_details} coins={coinsEarned} setCoins={setCoinsEarned} />


           <EducationDetails details={educational_details} coins={coinsEarned} setCoins={setCoinsEarned} />


            <ProjectDetails details={project_details} coins={coinsEarned} setCoins={setCoinsEarned} />

            <section className='collapse collapse-arrow border-2 border-cyan-600 mb-8 pb-3'>
                <input type="checkbox" className="peer" />
                <h2 className="text-2xl font-semibold mb-4 bg-cyan-700 collapse-title">Past Experience details</h2>
                <div className="collapse-content">

                {
                    experienceCount?.map((item,id)=>(
                        <Experience num={id+1} key={item?._id} details={item} coins={coinsEarned} setCoins={setCoinsEarned} edited={prevExEdited} setEdited={setprevExEdited} />
                    ))
                }

                <br />
                <div className="flex flex-col">
            <button onClick={handleAddExp} disabled={!prevExEdited} className="disabled:cursor-not-allowed w-auto mx-5   p-x-5 cursor-pointer self-start mt-5 mr-5 bg-gray-700 text-white rounded-md mb-2 focus:border-teal-500 focus:outline-none">+ Add Experience</button>

            </div>
            </div>
            </section>
        </div>
    );
};

export default ProfilePage;
