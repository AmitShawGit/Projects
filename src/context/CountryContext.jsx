import { createContext, useState, useEffect } from "react";
import axios from "axios";

let CountryContext = createContext()

let CountryProvider = ({ children }) => {



    let [stateData, setStateData] = useState([]);
    let [countryCode, setCountryCode] = useState("");
    let [searchCountry, setSearchCountry] = useState("")
    let [deboucedSearch, setDebouncedSearch] = useState("")

    let [showCountryDetail, setShowCountryDetail] = useState()

    const getGeoData = async () => {


        try {
            
            // 1. You must 'await' the response
            const response = await axios.get(import.meta.env.VITE_APP_URL_GEO_MAP + `v1/countries/${countryCode}/states`, {
                headers: {
                    'X-CSCAPI-KEY': import.meta.env.VITE_APP_API_KEY_GEO_MAP
                }
            });

            // 2. Axios puts the actual data inside a .data property
            setStateData(response.data);

        } catch (error) {
            // 3. Always handle errors in API calls
            console.error("API Call Failed:", error);
        }
    };

    // search functionality 
    const filteredCountry = stateData?.filter(item => item.name.toLowerCase().includes(deboucedSearch.toLowerCase()))

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
    }, [countryCode])


    return (
        <CountryContext.Provider value={{ filteredCountry, setSearchCountry, searchCountry, showCountryDetail, setShowCountryDetail , setCountryCode }}>
            {children}
        </CountryContext.Provider>
    )
}



export { CountryContext, CountryProvider }