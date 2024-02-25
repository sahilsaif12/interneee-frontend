import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import appContext from '../../context/appContext';
import Loader from '../../utils/Loader';
import axios from 'axios';

function EducationDetails({coins,setCoins,details}) {
    const [data, setdata] = useState({});

    // const [instituteType, setinstituteType] = useState(details?.instituteType ? details.instituteType:"");
    // const [instituteTypeDisable, setinstituteTypeDisable] = useState(details?.instituteType?true:false);
    // const [instituteName, setinstituteName] = useState(data?.instituteName? data?.instituteName:"");
    // const [instituteNameDisable, setinstituteNameDisable] = useState(data?.instituteName?true:false);
    // const [startDate, setstartDate] = useState(data?.startDate? data?.startDate:"");
    // const [startDateDisable, setstartDateDisable] = useState(data?.startDate?true:false);
    // const [endDate, setendDate] = useState(data?.endDate? data?.endDate:"");
    // const [endDateDisable, setendDateDisable] = useState(data?.endDate?true:false);

    const [instituteType, setinstituteType] = useState("");
    const [instituteTypeDisable, setinstituteTypeDisable] = useState(false);
    const [instituteName, setinstituteName] = useState("");
    const [instituteNameDisable, setinstituteNameDisable] = useState(false);
    const [startDate, setstartDate] = useState("");
    const [startDateDisable, setstartDateDisable] = useState(false);
    const [endDate, setendDate] = useState("");
    const [endDateDisable, setendDateDisable] = useState(false);
    const [saving, setsaving] = useState(false);


    const {loading,setloading,updateCoins} = useContext(appContext)
    const alert=useAlert()


    useEffect(() => {
      if (details?.instituteType) {
        setinstituteType(details?.instituteType)
        setinstituteTypeDisable(true)
      }
      if (details?.instituteName) {
        setinstituteName(details?.instituteName)
        setinstituteNameDisable(true)
      }
      if (details?.startDate) {
        setstartDate(details?.startDate)
        setstartDateDisable(true)
      }
      if (details?.endDate) {
        setendDate(details?.endDate)
        setendDateDisable(true)
      }
    }, [details])
    
    const handleChange = (e, setField) => {
            setField(e.target.value);
            
        }

    const handleSave =async () => {
        let cnt = 0;
        let updatedFields={}
        if (instituteType != "" && !instituteTypeDisable){
            cnt += 5
            setinstituteTypeDisable(true);
            updatedFields.instituteType=instituteType
        } 
        if (instituteName != ""  && !instituteNameDisable){
            setinstituteNameDisable(true);
            updatedFields.instituteName=instituteName
            cnt += 5
        } 
        if (startDate != ""  && !startDateDisable){
            setstartDateDisable(true)
            updatedFields.startDate=startDate
            cnt += 2
        }
        if (endDate != ""  && !endDateDisable){
            setendDateDisable(true)
            updatedFields.endDate=endDate
            cnt += 2
        }
        

        
        setCoins(coins + cnt)

        try {
            setloading(true)
            setsaving(true)
            const res =await axios.patch("/v1/update/educational",updatedFields)
            const data=res.data.data
            setdata(data)
            setloading(false)
            setsaving(false)
            updateCoins(cnt,"in")
            alert.success('Saved')
        } catch (error) {
            setloading(false)
            setsaving(false)
            console.log(error);
            const err=error.request.response
            const msg=err.substring(err.indexOf("Error: "),err.indexOf("<br>"))
            alert.error(msg)
        }
    }
  return (
    <section className='collapse collapse-arrow border-2 border-cyan-600 mb-8 pb-3'>
    {loading && saving && <Loader/>}
    <input type="checkbox" className="peer" />
    <h2 className="text-2xl font-semibold mb-4 collapse-title bg-cyan-700">Education Details</h2>
    <div className="collapse-content">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block mb-2  text-gray-300">Type (School/College):</label>
            <input
                type="text"
                disabled={instituteTypeDisable}
                className="disabled:cursor-not-allowed w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                placeholder="ex- school"
                value={instituteType}
                onChange={(e) => handleChange(e, setinstituteType)}
            />
        </div>
        <div>
            <label className="block mb-2 text-gray-300">Institute Name:</label>
            <input
                type="text"
                disabled={instituteNameDisable}
                className=" disabled:cursor-not-allowed w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                placeholder="ex- xyz high school"
                value={instituteName}
                onChange={(e) => handleChange(e, setinstituteName)}
            />
        </div>
        <div>
            <label className="block mb-2 text-gray-300">Start Date:</label>
            <input
                type="date"
                value={startDate}
                disabled={startDateDisable}
                onChange={(e) => handleChange(e, setstartDate)}
                max={new Date().toISOString().split('T')[0]}
                className="disabled:cursor-not-allowed h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
            />
        </div>
        <div>
            <label className="block mb-2 text-gray-300">End Date:</label>
            <input
                type="date"
                value={endDate}
                disabled={endDateDisable}
                onChange={(e) => handleChange(e, setendDate)}
                min={startDate}
                max={new Date().toISOString().split('T')[0]}
                className="disabled:cursor-not-allowed h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
            />
        </div>
    </div>
        <div className="flex flex-col">
            <button onClick={handleSave} className="w-28   p-x-5 cursor-pointer self-end mt-5 mr-5 bg-teal-700 text-white rounded-md mb-2 focus:border-teal-500 focus:outline-none">Save</button>

            </div>
    </div>
</section>  )
}

export default EducationDetails