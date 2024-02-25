import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Signup.jsx'
import OtpBox from './Components/OtpBox.jsx'
import ProfilePage from './Components/ProfilePage.jsx'
import Jobs from './Components/Jobs/Jobs.jsx'
import { Route,Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute.jsx'
import Sidebar from './Components/Sidebar.jsx'
import appContext from './context/appContext.jsx'
import AppliedJobs from './Components/Jobs/AppliedJobs.jsx'

function App() {

  const {showSidebar, setshowSidebar,validateTokens}=useContext(appContext)
  
  useEffect(() => {
    
    // validateTokens()
  }, [])
  
  return (
    <>
    <div className="flex justify-center h-full items-center">
    {
      showSidebar &&  <Sidebar/>
    }
   

    <Routes>
        <Route path="/"  element={<Signup/>} />
        <Route path="/verifyOtp" element={<OtpBox/>} />
        <Route path="/profile" element={<PrivateRoute Component={ProfilePage} /> } />
        <Route path="/jobs" element={<PrivateRoute Component={Jobs} /> } />
        <Route path="/appliedJobs" element={<PrivateRoute Component={AppliedJobs} /> } />
        <Route path="*" element={<PrivateRoute Component={Jobs}  />} />
        {/* <PrivateRoute path="/profilepage" element={<ProfilePage/>} /> */}

  </Routes>
    {/* <Router> */}
      {/* <Switch> */}
      
        {/* <Route path="/"> */}
        {/* <Signup  /> */}
        {/* </Route> */}
        {/* <PrivateRoute path="/jobs" component={<Jobs/>} /> */}
        {/* <PrivateRoute path="/appliedjobs" component={AppliedJobs} /> */}
        {/* <Redirect to="/signup" /> */}
      {/* </Switch> */}
      {/* <Sidebar /> */}
    {/* </Router> */}
      {/* <Signup/> */}
      {/* <OtpBox/> */}
      {/* <ProfilePage/> */}
      {/* <Jobs/> */}
      
    </div>
    </>
  )
}

export default App
