import { createContext, useState, useEffect } from "react";
import axios from "axios";

let StateContext = createContext()

let StateProvider = ({ children }) => {

    let [apiData, setApiData] = useState([]);

    let [searchCountry, setSearchCountry] = useState("")
    let [deboucedSearch, setDebouncedSearch] = useState("")
    
    let [showCountryDetail,setShowCountryDetail] = useState()

    const getGeoData = async () => {

        try {


            if (apiData.length > 0) return
            // 1. You must 'await' the response
            const response = await axios.get(import.meta.env.VITE_APP_URL_GEO_MAP + 'v1/countries', {
                headers: {
                    'X-CSCAPI-KEY': import.meta.env.VITE_APP_API_KEY_GEO_MAP
                }
            });

            // 2. Axios puts the actual data inside a .data property
            setApiData(response.data);

        } catch (error) {
            // 3. Always handle errors in API calls
            console.error("API Call Failed:", error);
        }
    };

    // search functionality 
    const filteredCountry = apiData.filter(item => item.name.toLowerCase().includes(deboucedSearch.toLowerCase()))

    // for optimization
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchCountry.toLowerCase())
        }, 2000)
        return () => clearTimeout(timer);
    }, [searchCountry])

    // for api call 
    useEffect(() => {

        getGeoData();
    }, [])


    return (
        <StateContext.Provider value={{ filteredCountry, setSearchCountry, searchCountry,showCountryDetail,setShowCountryDetail }}>
            {children}
        </StateContext.Provider>
    )
}



export { StateContext, StateProvider }