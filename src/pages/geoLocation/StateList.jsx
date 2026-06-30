import { useState, useContext } from "react";

import { StateContext } from "../../context/StateContext";
import { LoaderIcon } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const StateList = ({ details, setSearchCountry, searchCountry, setShowCountryDetail }) => {

let filteredCountry = details
  let navigate = useNavigate()

    let handleChange = (e) => {
        setSearchCountry(e.target.value)
    }

    return (
        <>
            <div className="showlistOfState">
                <div className="searchbar">
                    <input type="text" onChange={handleChange} value={searchCountry} placeholder="Search" />
                    <i className="ri-search-line"></i>
                </div>

               
                <ul>
                    {filteredCountry.length > 0 ? filteredCountry?.map((item, index) => {
                        return <li key={index} onClick={() => setShowCountryDetail(item)}>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 text-white">
                                    <img
                            src={`https://flagpedia.net/data/flags/h80/${item?.country_code.toLowerCase()}.png`}
                            className="flagimg" width="20"
                        /> &nbsp; {item.name} 
                                </p>
                           
              <button className='map_btn' onClick={() => navigate(`/project/map?lon=${item?.longitude}&lan=${item?.latitude}`)}>Show Map</button> </div></li> 
                        
                     }): <LoaderIcon /> 
                
                }
                </ul>
            </div>


        </>
    )
}

export default StateList