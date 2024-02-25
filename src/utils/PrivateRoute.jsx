import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import appContext from "../context/appContext";
import axios from "axios";
import Cookies from "js-cookie";

const PrivateRoute = ({ Component }) => {

  // const {validateTokens}=useContext(appContext)
  const [validToken, setvalidToken] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    async function validateTokens() {
      // You can await here
      try {
        const res = await axios.get("v1/users/refreshAccessToken")
        const success = res.data.success
        if (success) {
          setvalidToken(true)
          // console.log(Cookies.get('refreshToken'));

          // return true
        }
      } catch (error) {
        setvalidToken(false)
        // return false;
        // const err=error.request.response
        // const msg=err.substring(err.indexOf("Error: "),err.indexOf("<br>"))
        // alert.error(msg)
        // setloading(false)
        navigate("/")
        console.log(error);
      }
    }
    validateTokens();

  }, [])

  return validToken && <Component />

  // : <Navigate to="/" />;
};
export default PrivateRoute;