import { useState } from "react";
import AppContext from "./appContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import Cookies from "js-cookie"


export default function AppState(props) {


    const [coinsEarned, setCoinsEarned] = useState(60)
    const [showSidebar, setshowSidebar] = useState(false)
    const [sidebarToggle, setsidebarToggle] = useState(true)
    const [active, setactive] = useState("jobs")
    const [otp, setOtp] = useState('');
    const [loading, setloading] = useState(false);
    const [userId, setuserId] = useState('');
    const [validToken, setvalidToken] = useState(false);
    const [allDetails, setallDetails] = useState({});
    const [allJobs, setallJobs] = useState([]);
    const [allAppliedJobs, setallAppliedJobs] = useState([]);
    const navigate = useNavigate()
    const alert = useAlert()

    const server="https://interneee-backend.vercel.app/api"
    // const server = "http://localhost:8000/api"

    const register = async (email, fullName) => {
        try {
            setloading(true);
            const res = await axios.post(`${server}/v1/users/register`, {
                email, fullName
            })
            const data = res.data.data
            // console.log(res.data);
            setOtp(data.otp)
            setuserId(data.createdUser._id)
            setloading(false)
            navigate("/verifyOtp")
        } catch (error) {
            console.log(error);
            const err = error.request.response
            const msg = err.substring(err.indexOf("Error: "), err.indexOf("<br>"))
            alert.error(msg)
            setloading(false)
        }
    }

    const login = async (email) => {
        console.log(server);
        try {
            setloading(true);
            const res = await axios.post(`${server}/v1/users/login`, {
                email
            })
            const data = res.data.data
            setOtp(data.otp)
            setuserId(data.user._id)
            setloading(false)
            navigate("/verifyOtp")
        } catch (error) {
            console.log(error);
            const err = error.request.response
            const msg = err.substring(err.indexOf("Error: "), err.indexOf("<br>"))
            alert.error(msg)
            setloading(false)
        }
    }

    const logout = async () => {
        try {
            setloading(true)
            const res = await axios.get(`${server}/v1/users/logout`,{
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            const success = await res.data.success
            if (success) {
                navigate("/")
                // console.log(Cookies.get('accessToken'));
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
            }
            setloading(false)
            // console.log(Cookies.get('accessToken'));
        } catch (error) {
            console.log(error);
        }
    }

    const userVerifed = async (id) => {
        try {
            const res = await axios.post(`${server}/v1/users/userVerified`, {
                id
            })
            const data = res.data
            console.log(res.data);
            Cookies.set('accessToken', data.accessToken);
            Cookies.set('refreshToken', data.refreshToken);
        } catch (error) {
            // const err=error.request.response
            // const msg=err.substring(err.indexOf("Error: "),err.indexOf("<br>"))
            // alert.error(msg)
            // setloading(false)
            console.log(error);
        }
    }

    const userDetails = async () => {
        setloading(true)
        try {
            const res = await axios.get(`${server}/v1/users/userDetails`,{
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            const data = res.data.data
            setallDetails(data)
            setCoinsEarned(data.coins)
            setallAppliedJobs(data.applied_jobs)
            setloading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const updateCoins = async (newCoins, op) => {
        try {
            const res = await axios.patch(`${server}/v1/users/updateCoins`,
                { newCoins, op },
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                    },
                })
            const data = res.data.data
            setCoinsEarned(data.CurrentCoins)
        } catch (error) {
            console.log(error);
        }
    }


    const getJobs = async (page = 1) => {
        try {
            console.log("here2");
            const res = await axios.get(`${server}/v1/jobs/allJobs`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                },
                params: { page }
            })
            console.log("here 2");
            const data = res.data.data
            console.log(data);
            setallJobs(data)
        } catch (error) {
            console.log(error);
        }
    }

    const applyJob = async (jobId) => {
        setloading(true)
        try {
            const res = await axios.patch(`${server}/v1/jobs/applyJob/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            if (res.data.success) {
                setallAppliedJobs((prev) => [...prev, res.data.data])
                updateCoins(50, "dec")
                setloading(false)
                alert.success("Applied ✔")
            }
        } catch (error) {
            setloading(false)
            console.log(error);
        }
    }

    const appliedJobs = async () => {
        try {
            const res = await axios.get(`${server}/v1/jobs/appliedJobs`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            const data = res.data.data
            console.log(data);
            setCoinsEarned(data.coins)
            setallAppliedJobs(data.applied_jobs)
            console.log(data);
        } catch (error) {
            setloading(false)
            console.log(error);
        }
    }


    return (
        <AppContext.Provider value={{
            coinsEarned,
            setCoinsEarned,
            showSidebar,
            setshowSidebar,
            location,
            sidebarToggle,
            setsidebarToggle,
            active,
            setactive,
            generatedOtp: otp,
            loading,
            setloading,
            register,
            userId,
            userVerifed,
            logout,
            login,
            validToken,
            allDetails,
            setallDetails,
            userDetails,
            updateCoins,
            getJobs,
            allJobs,
            applyJob,
            appliedJobs,
            allAppliedJobs,
            server
        }}>
            {props.children}
        </AppContext.Provider>
    )
}