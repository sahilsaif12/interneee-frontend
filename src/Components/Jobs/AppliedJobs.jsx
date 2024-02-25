import React, { useContext, useEffect, useState } from 'react'
import Jobcard from './Jobcard'
                import appContext from '../../context/appContext'
                import coinsImg from '../../assets/coins.png'
                import Sidebar from '../Sidebar'
                import { useNavigate } from 'react-router-dom'
                import Loader from '../../utils/Loader'

function AppliedJobs() {
    const { coinsEarned, setCoinsEarned, appliedJobs, allAppliedJobs } = useContext(appContext)
    const { setshowSidebar } = useContext(appContext)
    const [loader, setloader] = useState(true)
    setshowSidebar(true)
    // const navigate = useNavigate()
    useEffect(() => {
        const func=async()=>{
            await appliedJobs()
            setloader(false)
        }
        func()
    }, [])
    
  return (
    <div>
                {loader  && <Loader />}
            <div className="animate__animated animate__fadeIn text-lg fixed right-10 flex px-2 rounded-lg justify-center items-center border-2 border-slate-500  bg-slate-800 ">
                {coinsEarned} <img src={coinsImg} alt="" className='w-16' />
            </div>
            {allAppliedJobs.length==0 ? 
            <h1 className="text-xl m-3 text-center font-semibold">You haven't applied any jobs/internships</h1>
            :
            <h1 className="text-3xl m-3 font-semibold">Your Applied Jobs</h1>
            }
            <div>
                {
                    allAppliedJobs?.map((job, i) => {
                        return (
                            <Jobcard
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                company={job.company}
                                logo={job.image}
                                location={job.location}
                                salary={job.salaryRange}
                                employmentType={job.employmentType}

                            />
                        )
                    })
                }
            </div>
            {/* <div className="flex justify-center">

                <div className="join border-2 border-x-4 border-violet-500 ">
                    <input onChange={(e) => getJobs(e.target.ariaLabel)} className="join-item btn btn-square m-1 " onClick={(e) => console.log(e)} type="radio" name="options" aria-label="1" defaultChecked />
                    <input onChange={(e) => getJobs(e.target.ariaLabel)} className="join-item btn btn-square  m-1  " type="radio" name="options" aria-label="2" />
                    <input onChange={(e) => getJobs(e.target.ariaLabel)} className="join-item btn btn-square  m-1" type="radio" name="options" aria-label="3" />
                    <input onChange={(e) => getJobs(e.target.ariaLabel)} className="join-item btn btn-square  m-1" type="radio" name="options" aria-label="4" />
                    <input onChange={(e) => getJobs(e.target.ariaLabel)} className="join-item btn btn-square  m-1" type="radio" name="options" aria-label="5" />
                </div>
            </div> */}

        </div>
  )
}

export default AppliedJobs


