import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect } from "react";

import "leaflet/dist/leaflet.css";

const Mapped = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const lan = queryParams.get("lan");
  const lon = queryParams.get("lon");
  const country = queryParams.get("country");

  let [position, setPosition] = useState([40, 0, "England"]);

  useEffect(() => {
    if (lan && lon) {
      const lant = parseFloat(lan);
      const lont = parseFloat(lon);
      const count = country;
      if (!isNaN(lant) && !isNaN(lont)) {
        setPosition([lant, lont, count]);
      } else {
        console.error("Invalid latitude or longitude");
      }
    }
  }, [lan, lon]);

  let getCurrentLocation = (locate) => {
    // console.log(getCurrentLocation);
    setPosition(locate);
    console.log(locate);
  };

  return (
    <div className="map-container" id="map">
      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        /> */}
        <Marker position={position}>
          <Popup>{position[2]}</Popup>
        </Marker>
        <ChangeMarker positionSet={position} />
      </MapContainer>

      {/* <GetGeoLocation setCurrLoca={getCurrentLocation} /> */}
    </div>
  );
};

let ChangeMarker = ({ positionSet }) => {
  const map = useMap();
  map.setView(positionSet);
  return null;
};

let GetGeoLocation = () => {
  let [currentLocation, setCurrentLocation] = useState();
  let location = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });

      setCurrLoca(currentLocation);
    });
  };

  return (
    <button
      onClick={() => {
        location();
      }}
    >
      Get Location
    </button>
  );
};

export default Mapped;
