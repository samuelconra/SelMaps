import React, { useState } from 'react';
import Map from './components/Map';
import SideBar from './components/SideBar';
import './styles/App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [isMapDark, setIsMapDark] = useState(true)
  const toggleMapLight = () => {
    setIsMapDark(!isMapDark);
  }

  const [activeLayers, setActiveLayers] = useState({
    parks: true,
    hotels: true,
    attractions: true
  });
  const [activeOptions, setActiveOptions] = useState({
    neighbors: false,
    distances: false,
    buffer: false,
    clustering: false,
    area: false,
  });

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const toggleOption = (option) => {
    setActiveOptions(prev => {
      const isCurrentlyActive = prev[option];

      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      if (!isCurrentlyActive) {
        newState[option] = true;
      }

      return newState;
    });
  };


  return (
    <>
      <SideBar activeLayers={activeLayers} toggleLayer={toggleLayer} activeOptions={activeOptions} toggleOption={toggleOption} toggleMapLight={toggleMapLight} isMapDark={isMapDark}/>
      <Map activeLayers={activeLayers} activeOptions={activeOptions} isMapDark={isMapDark}/>
    </>
  );
}

export default App;
