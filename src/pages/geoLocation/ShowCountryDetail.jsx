import React, { useContext, useState } from 'react'
import axios from 'axios'
import CountryList from './CountryList';
import StateList from './StateList';
import { CountryContext } from '../../context/CountryContext';
import { LoaderIcon } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ShowCountryDetail = ({ countryDetail }) => {

  let { setCountryCode, filteredCountry, setSearchCountry, searchCountry, setShowCountryDetail } = useContext(CountryContext)

  let navigate = useNavigate()

  let showCountryState = async (countryCode) => {
    setCountryCode(countryCode)
  }


  return (
    <div className='row'>

      <div className="col-lg-6">
        <table className='country_table'>
          <thead>
            <th colspan="2">Country Detail</th>
          </thead>
          <tbody>
            <tr>
              <td>Country</td>
              <td>{countryDetail?.name}</td>
            </tr>
            <tr>
              <td>Capital</td>
              <td>{countryDetail?.capital}</td>
            </tr>
            <tr>
              <td>Region / Subregion</td>
              <td>{countryDetail?.region} / {countryDetail?.subregion}</td>
            </tr>
            <tr>
              <td>Flag</td>
              <td><img src={`https://flagpedia.net/data/flags/h80/${countryDetail?.iso2.toLowerCase()}.png`} alt="" style={{ width: '30px' }} /></td>
            </tr>
            <tr>
              <td>Phonecode</td>
              <td>{countryDetail?.phonecode}</td>
            </tr>
            <tr>
              <td>Currency</td>
              <td>{countryDetail?.currency}</td>
            </tr>
            <tr>
              <td>Language</td>
              <td>{countryDetail?.native} </td>
            </tr>
            <tr>
              <td>States</td>
              <td><button className='map_btn' onClick={() => showCountryState(countryDetail?.iso2)}>View States</button></td>
            </tr>
            <tr>
              <td>Map</td>
              <td><button className='map_btn' onClick={() => navigate(`/map?lon=${countryDetail?.longitude}&lan=${countryDetail?.latitude}`)}>Show Map</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-lg-6">
        {filteredCountry.length > 0 ? <StateList details={filteredCountry} setSearchCountry={setSearchCountry} searchCountry={searchCountry} setShowCountryDetail={setShowCountryDetail} /> : <LoaderIcon />}

      </div>




    </div>
  )
}



// const StateView = (filteredCountry) => {
//   log
//   if (filteredCountry) {
//     if (filteredCountry?.length > 0) {
//       <StateList details={filteredCountry} setSearchCountry={setSearchCountry} searchCountry={searchCountry} setShowCountryDetail={setShowCountryDetail} />
//     }
//     // else {
//     //   alert('This Country has no state')
//     // }
//   }
//   else {
//     <LoaderIcon />
//   }

// }

export default ShowCountryDetail