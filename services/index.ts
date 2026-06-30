import axios from "axios";

const apiCall = () => {
    axios.create({
        baseURL: import.meta.env.VITE_APP_URL_GEO_LOCATION,
        timeout: 1000,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "POST,PATCH,PUT,DELETE,FETCH",
            "Accept": "application/json",
            "X-CSCAPI-KEY": import.meta.env.VITE_APP_API_KEY_GEO_MAP
        }
    })
}

export default apiCall;