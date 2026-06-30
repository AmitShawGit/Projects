import axios from "axios";
import CountryList from "./CountryList";
import { useContext, useEffect, useState } from "react";
import ShowCountryDetail from "./ShowCountryDetail";
import { StateContext } from "../../context/StateContext";


let Geolocation = () => {
let {showCountryDetail} = useContext(StateContext)
console.log(showCountryDetail?.length);


    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <CountryList  />
                </div>
                <div className="col-md-8">
                {showCountryDetail && <ShowCountryDetail countryDetail={showCountryDetail} /> }
                </div>
            </div>
        </>
    )
}
export default Geolocation;