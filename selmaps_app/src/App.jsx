import React, { useState } from 'react';
import Map from './components/Map';
import SideBar from './components/SideBar';
import './styles/App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [activeLayers, setActiveLayers] = useState({
    parks: true,
    hotels: true,
    attractions: true
  });

  const toggleLayer = (layer) => {
    console.log(activeLayers)
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <>
      <SideBar activeLayers={activeLayers} toggleLayer={toggleLayer} />
      <Map activeLayers={activeLayers} />
    </>
  );
}

export default App;
