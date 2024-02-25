import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import menuImg from '../assets/menu.png'
import crossImg from '../assets/cross.png'
import appContext from '../context/appContext'
import Loader from '../utils/Loader'
function Sidebar() {
    const {sidebarToggle,setsidebarToggle,active,logout,loading, setactive}=useContext(appContext)
    const [open, setopen] = useState(sidebarToggle)
    const {pathname} =useLocation()
    
    useEffect(() => {
      if (pathname=="/jobs") {
        setactive("jobs")
      }
      else if (pathname=="/profile") {
        setactive("profile")
      }
      else if (pathname=="/appliedJobs") {
        setactive("applied")
      }

        // let a;
        // if (sidebarToggle){
        //     a="jobs"
        // } else{
        //     a="profile"
        // }
        // setactive(a)
        
    }, [sidebarToggle])
    

  return (
<div className={`${open?"drawer-open":"drawer"} z-30  fixed left-0 top-0 lg:drawer-ope`}>
{loading && <Loader/>}

  <input onClick={()=>setopen(!open)} defaultChecked={open} id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn w-auto fixed top-5 left-5 rounded bg-slate-800 border-dashed border-cyan-800 text-slate-300/95 btn-primar drawer-button lg:hidde">
    <img src={menuImg} alt="" className='w-10 filter invert' /></label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu border-r-2 border-cyan-800 bg-gray-800  p-4 w-80 min-h-full text-base-content">
      {/* Sidebar content here */}
    <label htmlFor="my-drawer-2" className="btn w-auto absolute  top-0 right-0 rounded text-slate-300/95 btn-primar drawer-butto lg:hidde">
    <img src={crossImg} alt="" className='w-4 filter invert' /></label>
      <div className="font-bold    text-2xl text-center text-teal-100 italic tracking-widest ">Interniee</div>
      <br />
      <li><Link onClick={()=>setactive("profile")}  to="/profile" className={`text-lg text-gray-300 hover:text-gray-100 my-2 ${active=="profile" && "bg-cyan-900/90"} `} >Your Profile</Link></li>
      <li><Link onClick={()=>setactive("jobs")} to="/jobs" className={`text-lg text-gray-300 hover:text-gray-100 my-2 ${active=="jobs" && "bg-cyan-900/90"} `} >Internships</Link></li>
      <li><Link onClick={()=>setactive("applied")} to="/appliedJobs" className={`text-lg text-gray-300 hover:text-gray-100 my-2 ${active=="applied" && "bg-cyan-900/90"} `} >Applied</Link></li>
      <div onClick={()=>logout()} className="btn bg-gray-400 hover:bg-gray-500 text-gray-950 absolute right-6 bottom-2 btn-bloc">Log out</div>
    </ul>
  
  </div>
</div> 
 )
}

export default Sidebar