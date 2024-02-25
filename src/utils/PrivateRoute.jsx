import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import appContext from "../context/appContext";
import axios from "axios";
import Cookies from "js-cookie";

const PrivateRoute = ({ Component }) => {

  const {server}=useContext(appContext)
  const [validToken, setvalidToken] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    async function validateTokens() {
      // You can await here
      try {
        console.log("here");
        let refreshToken=Cookies.get('refreshToken');
        console.log(refreshToken);
        const res = await axios.get(`${server}/v1/users/refreshAccessToken`,
        {
          headers: {
              'Authorization': `Bearer ${refreshToken}`,
            }
        },
        )
        const data =res.data.data
        Cookies.set('accessToken',data.accessToken);
        Cookies.set('refreshToken',data.refreshToken);
        setvalidToken(true)
        
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