import React, { useContext, useEffect, useRef, useState } from 'react'
import dummyUserImg from '../../assets/user.webp'
import uploadImg from '../../assets/upload.svg'
import { useAlert } from 'react-alert';
import axios from 'axios';
import Loader from '../../utils/Loader';
import appContext from '../../context/appContext';

function PersonalDetails({ coins, setCoins, details }) {
    const [data, setdata] = useState(details);

    const [mobile, setmobile] = useState("");
    const [mobileDisable, setmobileDisable] = useState(false);
    const [avatar, setavatar] = useState(null);
    const [avatarDisable, setavatarDisable] = useState(false);
    const [linkedinLink, setlinkedinLink] = useState("");
    const [linkedinLinkDisable, setlinkedinLinkDisable] = useState(false);
    const [githubLink, setgithubLink] = useState("");
    const [githubLinkDisable, setgithubLinkDisable] = useState(false);
    const [resume, setresume] = useState(null);
    const [resumeDisable, setresumeDisable] = useState(false);
    const [saving, setsaving] = useState(false);

    const {loading,setloading,updateCoins,server}=useContext(appContext)

    const alert=useAlert()
    const ref = useRef('')
    
    useEffect(() => {
        if (details?.mobile) {
          setmobile(details?.mobile)
          setmobileDisable(true)
        }
        if (details?.avatar) {
          setavatar(details?.avatar)
          setavatarDisable(true)
        }
        if (details?.linkedinLink) {
          setlinkedinLink(details?.linkedinLink)
          setlinkedinLinkDisable(true)
        }
        if (details?.githubLink) {
          setgithubLink(details?.githubLink)
          setgithubLinkDisable(true)
        }
        if (details?.resume) {
          setresume(details?.resume)
          setresumeDisable(true)
        }
      }, [details])
    
      
    const handleChange = (e, setField) => {
        const file = e.target.files?e.target.files[0]:null;
        if (file && file instanceof File) {
            setField(file);
            if (file.type.split("/")[1]!="pdf") {
                ref.current.src=URL.createObjectURL(file)
            }
            // console.log(e);
        } else {
            setField(e.target.value);
            
        }

    };
    const handleSave = async() => {
        let cnt = 0;
        const formData = new FormData();

        if (mobile != "" && !mobileDisable){
            cnt += 15
            setmobileDisable(true);
            formData.append("mobile",mobile);
        } 
        if (linkedinLink != ""  && !linkedinLinkDisable){
            setlinkedinLinkDisable(true);
            cnt += 3
            formData.append("linkedinLink",linkedinLink);
        } 
        if (githubLink != ""  && !githubLinkDisable){
            setgithubLinkDisable(true)
            cnt += 5
            formData.append("githubLink",githubLink);
        }
        if (avatar != null  && !avatarDisable){
            setavatarDisable(true)
            cnt += 5
            formData.append("avatar",avatar);
        }
        if (resume != null  && !resumeDisable){
            setresumeDisable(true)
            cnt += 20
            formData.append("resume",resume);
        }

        
        setCoins(coins + cnt)
        
        try {
            setloading(true)
            setsaving(true)
            const res =await axios.patch(`${server}/v1/update/personal`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                },
                
            })
            const data=res.data.data
            setdata(data)
            setloading(false)
            setsaving(false)
            updateCoins(cnt,"in")
            alert.success('Saved')
        } catch (error) {
            setloading(false)
            setsaving(false)
            const err=error.request.response
            const msg=err.substring(err.indexOf("Error: "),err.indexOf("<br>"))
            alert.error(msg)
            console.log(error);

        }

    }
    return (
        <section className='collapse collapse-arrow   border-2 border-cyan-600  mb-8 pb-3'>
        {loading && saving && <Loader/> }
        
            <input type="checkbox" defaultChecked className="peer" />
            <h2 className="text-2xl font-semibold mb-4 collapse-title bg-cyan-700">Personal Details</h2>
            <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div>
                        <label className="block mb-2  text-gray-300">Mobile:</label>
                        <input
                            disabled={mobileDisable}
                            type="text"
                            className="disabled:cursor-not-allowed w-64 h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- +9199898898"
                            value={mobile}
                            onChange={(e) => handleChange(e, setMobile)}
                        />
                    </div>
                    <div>

                        <label className="block mb-2  text-gray-300">Profile Pic:</label>
                        <div class="flex items-center space-x-6">
                            <div class="shrink-0">
                                <img ref={ref} id='preview_img' class="h-16 w-16 object-cover rounded-full" src={details?.avatar ? details.avatar : dummyUserImg} alt="Current profile photo" />
                            </div>
                            <label class="block">
                                <input type="file"
                            disabled={avatarDisable}
                        
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={(e) => handleChange(e, setavatar)} class="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-600
                                    hover:file:bg-violet-100
                                    disabled:cursor-not-allowed
                                    cursor-pointer
                                "/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2  text-gray-300">LinkedIn Link:</label>
                        <input
                            type="text"
                            disabled={linkedinLinkDisable}
                            className="disabled:cursor-not-allowed w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- https://www.linkedin.com/in/sk-saifuddin-8593411b4/"
                            value={linkedinLink}
                            onChange={(e) => handleChange(e, setlinkedinLink)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2  text-gray-300">GitHub Link:</label>
                        <input
                            type="text"
                            className="disabled:cursor-not-allowed w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- https://github.com/sahilsaif12"
                            value={githubLink}
                            disabled={githubLinkDisable}
                            onChange={(e) => handleChange(e, setgithubLink)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block mt-6 mb-3  text-gray-300">Resume:</label>
                    <label
                        htmlFor="resumeUpload"
                    // className="w-96 h-96 border-dotted border-4 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer"
                    >
                        <div className="flex items-center justify-center  bg-slate-800">
                            <div className="w-full h-52 border-dashed  border-2 border-gray-400 rounded-lg flex items-center justify-center cursor-pointer">

                                {resume ? (
                                    <p className="text-lg font-semibold">{resume.name || `resume uploaded`}</p>
                                ) : (
                                    <p className="text-lg font-medium text-gray-400 flex flex-col items-center ">
                                        <img src={uploadImg} alt="" className='w-28 ' />
                                        <br />
                                        click to upload pdf file </p>
                                )}
                                <input
                                    id="resumeUpload"
                                    type="file"
                                    disabled={resumeDisable}
                                    className="hidden disabled:cursor-not-allowed"
                                    onChange={(e) => handleChange(e, setresume)}
                                    accept=".pdf"
                                />
                            </div>
                        </div>
                    </label>
                </div>
            <div className="flex flex-col">

            <button onClick={handleSave} className="w-28 p-x-5 cursor-pointer self-end mt-5 mr-5 bg-teal-700 text-white rounded-md mb-2 focus:border-teal-500 focus:outline-none">Save</button>
            </div>
            </div>

        </section>
    )
}

export default PersonalDetails