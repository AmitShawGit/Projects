import { useState, useContext } from "react";

import { StateContext } from "../../context/StateContext";
import { LoaderIcon } from "react-hot-toast";
const CountryList = () => {

  const { filteredCountry, setSearchCountry, searchCountry,setShowCountryDetail } = useContext(StateContext)

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

        {/* <div className="country_state">
          <div className="country" onClick={() => showCountry()}>Country</div>
          <div className="state">State</div>
        </div> */}
        <ul>
          {filteredCountry.length > 0 ? filteredCountry?.map((item, index) => {
            return <li key={index} onClick={()=>setShowCountryDetail(item)}> 
            <img
              src={`https://flagpedia.net/data/flags/h80/${item?.iso2.toLowerCase()}.png`}
              className="flagimg" width="20"
            /> &nbsp; {item.name}
            
            </li>
          }) : <LoaderIcon /> }
        </ul>
      </div>


    </>
  )
}

export default CountryList