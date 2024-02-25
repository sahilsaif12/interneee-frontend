import React, { useContext, useEffect, useState } from 'react'
import img from '../../assets/coins.png'
import locationImg from '../../assets/location.png'
import Loader from '../../utils/Loader'
import appContext from '../../context/appContext'
import { useAlert } from 'react-alert'

function Jobcard({id,title,company,logo,location,salary,employmentType}) {
    const [btnText, setbtnText] = useState('Apply with 50 coins')
  const {applyJob,coinsEarned ,loading,allAppliedJobs} = useContext(appContext)
  const [saving, setsaving] = useState(false)
  const [applied, setapplied] = useState(false)
const alert =useAlert()
  useEffect(() => {
    let ap=allAppliedJobs?.some(obj => obj._id === id)
    setapplied(ap)
  }, [allAppliedJobs])
  
  const handleApply=async()=>{
    if (coinsEarned - 50 <0) {
      alert.error("Not Enough coins, can't apply")
    }else{
      setsaving(true)
      await applyJob(id)
      setsaving(false)
      setbtnText("Applied")
    }
  }
  return (
<div className="m-5">
  <div className="group mx-2 mt-10 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border border-y-4 border-teal-500 py-8 text-gray-300 shadow-md bg-slate-900 shadow-slate-700 transition sm:mx-auto">
{(loading && saving) && <Loader/>}
    <div className="order-2 col-span-1 mt-4 -ml-14 text-left text-gray-600 hover:text-gray-700 sm:-order-1 sm:ml-4">
      <div className="group relative h-16 w-16 overflow-hidden rounded-lg">
        <img src={logo} alt="" className="h-full w-full object-cover text-gray-700" />
      </div>
    </div>
    <div className="col-span-11 flex flex-col pr-8 text-left text-gray-300 sm:pl-4">
      <div className="mb-1 overflow-hidden pr-7 text-cyan-500 text-lg font-semibold sm:text-2xl"> {title} </div>
      <h3 className="text-md mb-3  ">{company}</h3>
      <p className="overflow-hidden pr-7 flex text-gray-400/90 font-semibold text-sm">
      <img src={locationImg} alt="" className='w-5 mr-2 filter invert' /> {location}</p>

      <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-2">
      <div className="flex">
        <div className="">period:<span className="ml-2 mr-3 rounded-full bg-green-100 px-2 py-0.5 text-green-900"> {employmentType} </span></div>
        <div className="">Stipend:<span className="ml-2 mr-3 rounded-full bg-blue-100 px-2 py-0.5 text-blue-900">{(Math.floor(Math.random() * 16) + 5 ) * salary}</span></div>
      </div>
        <div className="flex flex-col justify-end items-end">
            <button disabled={applied} onClick={handleApply}  className="w-auto disabled:bg-gray-500 disabled:cursor-not-allowed  p-x-5 cursor-pointer mt-5 mr-5 bg-teal-700 text-white rounded-md mb-2 focus:border-teal-200 focus:outline-none">{applied?"Applied":"Apply with 50 coins"} </button>

            </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Jobcard