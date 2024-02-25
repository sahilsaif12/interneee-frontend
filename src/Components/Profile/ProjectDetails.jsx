import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import appContext from '../../context/appContext';
import Loader from '../../utils/Loader';
import axios from 'axios';

function ProjectDetails({coins,setCoins,details}) {
    const [projectName, setprojectName] = useState('');
    const [projectDescription, setprojectDescription] = useState('');
    const [projectType, setprojectType] = useState('');
    const [projectLink, setprojectLink] = useState('');
    const [projectNameDisable, setprojectNameDisable] = useState(false);
    const [projectDescriptionDisable, setprojectDescriptionDisable] = useState(false);
    const [projectTypeDisable, setprojectTypeDisable] = useState(false);
    const [projectLinkDisable, setprojectLinkDisable] = useState(false);
    const [saving, setsaving] = useState(false);
    const {loading,setloading,updateCoins} = useContext(appContext)

    const alert=useAlert()

    useEffect(() => {
        if (details?.projectName) {
         setprojectName(details?.projectName)
         setprojectNameDisable(true)
        }
        if (details?.projectDescription) {
          setprojectDescription(details?.projectDescription)
          setprojectDescriptionDisable(true)
        }
        if (details?.projectType) {
          setprojectType(details?.projectType)
          setprojectTypeDisable(true)
        }
        if (details?.projectLink) {
          setprojectLink(details?.projectLink)
          setprojectLinkDisable(true)
        }
      }, [details])
      

    const handleChange = (e, setField) => {
            setField(e.target.value);
            
        }

    const handleSave = async () => {
        let cnt = 0;
        let updatedFields={}

        if (projectName != "" && !projectNameDisable){
            cnt += 5
            setprojectNameDisable(true);
            updatedFields.projectName=projectName
        } 
        if (projectDescription != ""  && !projectDescriptionDisable){
            setprojectDescriptionDisable(true);
            updatedFields.projectDescription=projectDescription
            cnt += 6
        } 
        if (projectType != ""  && !projectTypeDisable){
            setprojectTypeDisable(true)
            updatedFields.projectType=projectType
            cnt += 4
        }
        if (projectLink != ""  && !projectLinkDisable){
            setprojectLinkDisable(true)
            updatedFields.projectLink=projectLink
            cnt += 10
        }
        

       
        setCoins(coins + cnt)

        try {
            setloading(true)
            setsaving(true)
            const res =await axios.patch("/v1/update/project",updatedFields)
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
{loading && saving && <Loader/> }
                <input type="checkbox" className="peer" />
                <h2 className="text-2xl font-semibold mb-4 bg-cyan-700 collapse-title">Project Details</h2>
                <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div>
                        <label className="block mb-2 text-gray-300">Project Name:</label>
                        <input
                            type="text"
                            disabled={projectNameDisable}
                            className="disabled:cursor-not-allowed  w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- movie app"
                            value={projectName}
                            onChange={(e) => handleChange(e, setprojectName, 5)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Project Description:</label>
                        <input
                            type="text"
                            disabled={projectDescriptionDisable}
                            className="disabled:cursor-not-allowed  w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- movie app"
                            value={projectDescription}
                            onChange={(e) => handleChange(e, setprojectDescription, 6)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Solo Project / Group Project:</label>
                        <input
                            type="text"
                            disabled={projectTypeDisable}
                            className="disabled:cursor-not-allowed  w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- solo"
                            value={projectType}
                            onChange={(e) => handleChange(e, setprojectType, 4)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Project link:</label>
                        <input
                            type="text"
                            disabled={projectLinkDisable}
                            className="disabled:cursor-not-allowed  w-full h-12 px-4 rounded-md border-2 border-transparent focus:border-teal-500 border-b-slate-500 bg-slate-700 focus:outline-none"
                            placeholder="ex- http://project.com"
                            value={projectLink}
                            onChange={(e) => handleChange(e, setprojectLink, 10)}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
            <button onClick={handleSave} className="w-28   p-x-5 cursor-pointer self-end mt-5 mr-5 bg-teal-700 text-white rounded-md mb-2 focus:border-teal-500 focus:outline-none">Save</button>

            </div>
            </div>
            </section>  )
}

export default ProjectDetails