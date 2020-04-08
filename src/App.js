import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkData from "./data/skateboard-parks.json";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
  });

  let tkn = process.env.REACT_APP_MAPBOX_TOKEN;
  console.log(tkn);
  tkn =
    "pk.eyJ1IjoiZmxvMDcxMSIsImEiOiJjazhyaHdpNm0wOTNhM2ZxYW00bmFpa3lzIn0.VaBR--gsZy_nTT4sv6AYdA";
  console.log(tkn);

  const [selectedPark, setSelectedPark] = useState(null);
  useEffect(() => {
    const listner = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listner);

    return () => {
      window.removeEventListener("keydown", listner);
    };
  }, []);
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={tkn}
        mapStyle="mapbox://styles/flo0711/ck8q7a2oq15zc1ik75utoq6j7"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}
        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default App;
