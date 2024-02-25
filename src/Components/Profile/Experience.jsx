import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import uploadImg from '../../assets/upload.svg'
import appContext from '../../context/appContext';
import Loader from '../../utils/Loader';
import axios from 'axios';

function Experience({coins,setCoins,setEdited,num,details}) {
    const [experienceType, setexperienceType] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [companyWebsite, setcompanyWebsite] = useState('');
    const [role, setrole] = useState('');
    const [experienceStartDate, setexperienceStartDate] = useState('');
    const [experienceEndDate, setexperienceEndDate] = useState('');
    const [coverLetter, setcoverLetter] = useState(null);
    const [experienceTypeDisable, setexperienceTypeDisable] = useState(false);
    const [companyNameDisable, setcompanyNameDisable] = useState(false);
    const [companyWebsiteDisable, setcompanyWebsiteDisable] = useState(false);
    const [experienceStartDateDisable, setexperienceStartDateDisable] = useState(false);
    const [experienceEndDateDisable, setexperienceEndDateDisable] = useState(false);
    const [coverLetterDisable, setcoverLetterDisable] = useState(false);
    const [roleDisable, setroleDisable] = useState(false);
    const [saving, setsaving] = useState(false);
    const {loading,setloading,updateCoins}=useContext(appContext)

    const alert=useAlert()

    useEffect(() => {
        if (details?.experienceType) {
          setexperienceType(details?.experienceType)
          setexperienceTypeDisable(true)
        }
        if (details?.companyName) {
          setcompanyName(details?.companyName)
          setcompanyNameDisable(true)
        }
        if (details?.companyWebsite) {
          setcompanyWebsite(details?.companyWebsite)
          setcompanyWebsiteDisable(true)
        }
        if (details?.role) {
          setrole(details?.role)
          setroleDisable(true)
        }
        if (details?.experienceStartDate) {
          setexperienceStartDate(details?.experienceStartDate)
          setexperienceStartDateDisable(true)
        }
        if (details?.experienceEndDate) {
          setexperienceEndDate(details?.experienceEndDate)
          setexperienceEndDateDisable(true)
        }
        if (details?.coverLetter) {
          setcoverLetter(details?.coverLetter)
          setcoverLetterDisable(true)
        }
      }, [details])
    

    const handleChange = (e, setField) => {
        const file = e.target.files?e.target.files[0]:null;
        if (file && file instanceof File) {
            setField(file);
            // console.log(e);
        } else {
            setField(e.target.value);
            
        }

    };

    const handleSave = async() => {
        let edited=false
        let cnt = 0;
        const formData = new FormData();

        if (experienceType != "" && !experienceTypeDisable){
            cnt += 5
            setexperienceTypeDisable(true);
            formData.append("experienceType",experienceType);
        } 
        if (companyName != ""  && !companyNameDisable){
            setcompanyNameDisable(true);
            formData.append("companyName",companyName);
            cnt += 10
        } 
        if (companyWebsite != ""  && !companyWebsiteDisable){
            setcompanyWebsiteDisable(true)
            formData.append("companyWebsite",companyWebsite);
            cnt += 10
        }
        if (role != ""  && !roleDisable){
            setroleDisable(true)
            formData.append("role",role);
            cnt += 8
        }
        if (experienceStartDate != ""  && !experienceStartDateDisable){
            setexperienceStartDateDisable(true)
            formData.append("experienceStartDate",experienceStartDate);
            cnt += 2
        }
        if (experienceEndDate != ""  && !experienceEndDateDisable){
            setexperienceEndDateDisable(true)
            formData.append("experienceEndDate",experienceEndDate);
            cnt += 2
        }
        if (coverLetter != null  && !coverLetterDisable){
            setcoverLetterDisable(true)
            formData.append("coverLetter",coverLetter);
            cnt += 20
        }
        
        setCoins(coins + cnt)

        try {
            setloading(true)
            setsaving(true)
            const res =await axios.patch("/v1/update/experience",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const data=res.data.data
            // setdata(data)
            setloading(false)
            setsaving(false)
            updateCoins(cnt,"in")
            setEdited(true)
            alert.success('Saved')
        } catch (error) {
            console.log(error);
            setloading(false)
            setsaving(false)
            const err=error.request.response
            const msg=err.substring(err.indexOf("Error: "),err.indexOf("<br>"))
            alert.error(msg)

        }
        
    }

    // useEffect(() => {
    //   setEdited(false)
    // }, [])
    
  return (
    <div className="mb-8">
    {loading && saving && <Loader/>}
         <h3 className="text-2xl font-semibold mb-4 ">Experience {num} </h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div>
                        <label className="block mb-2 text-gray-300">Type (Internship / Job):</label>
                        <input
                            type="text"
                            className="disabled:cursor-not-allowed   w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- internship"
                            value={experienceType}
                            disabled={experienceTypeDisable}
                            onChange={(e) => handleChange(e, setexperienceType)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Company Name:</label>
                        <input
                            type="text"
                            className="disabled:cursor-not-allowed   w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- Amazon"
                            value={companyName}
                            disabled={companyNameDisable}
                            onChange={(e) => handleChange(e, setcompanyName)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Company Website link:</label>
                        <input
                            type="text"
                            className="disabled:cursor-not-allowed   w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- https://amazon.com"
                            value={companyWebsite}
                            disabled={companyWebsiteDisable}
                            onChange={(e) => handleChange(e, setcompanyWebsite)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Role:</label>
                        <input
                            type="text"
                            className="disabled:cursor-not-allowed   w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- web developer"
                            value={role}
                            disabled={roleDisable}
                            onChange={(e) => handleChange(e, setrole)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Start Date:</label>
                        <input
                            type="date"
                            value={experienceStartDate}
                            disabled={experienceStartDateDisable}
                            onChange={(e) => handleChange(e, setexperienceStartDate)}
                            max={new Date().toISOString().split('T')[0]}
                            className="disabled:cursor-not-allowed   h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">End Date:</label>
                        <input
                            type="date"
                            value={experienceEndDate}
                            disabled={experienceEndDateDisable}
                            onChange={(e) => handleChange(e, setexperienceEndDate)}
                            min={experienceStartDate}
                            max={new Date().toISOString().split('T')[0]}
                            className="disabled:cursor-not-allowed   h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Cover letter:</label>
                        <label
                            htmlFor="coverletterUpload"
                        // className="w-96 h-96 border-dotted border-4 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer"
                        >
                            <div className="flex items-center justify-center  bg-slate-800">
                                <div className="w-full h-52 border-dashed  border-2 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer">

                                    {coverLetter ? (
                                        <p className="text-lg font-semibold">{coverLetter.name}</p>
                                    ) : (
                                        <p className="text-lg font-medium text-gray-400 flex flex-col items-center ">
                                            <img src={uploadImg} alt="" className='w-28 ' />
                                            <br />
                                            click to upload pdf file </p>
                                    )}
                                    <input
                                        id="coverletterUpload"
                                        disabled={coverLetterDisable}
                                        type="file"
                                        className="hidden disabled:cursor-not-allowed  "
                                        onChange={(e) => handleChange(e, setcoverLetter)}
                                        accept=".pdf"
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-col justify-end items-end">
            <button onClick={handleSave} className="w-28   p-x-5 cursor-pointer mt-5 mr-5 bg-teal-700 text-white rounded-md mb-2 focus:border-teal-500 focus:outline-none">Save</button>

            </div>
                </div>
                </div>  )
}

export default Experience