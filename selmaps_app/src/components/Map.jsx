import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2FtdWVsY29ucmEiLCJhIjoiY203ejRoazl6MGhqNzJ0cTFqMGNhOXZiNSJ9.ar43sgRo_30JOY8r-GHxUw'
const BOUNDS = [
    [-74.2591, 40.4774],
    [-73.7004, 40.9176]
];


function Map () {
    // CONST
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    
    useEffect(() => {
        // MAP DEFINITION
        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            // style: 'mapbox://styles/mapbox/streets-v12',
            center: [12.4822, 41.8967],
            zoom: 12,
            // maxBounds: BOUNDS
        });

        mapRef.current = map
        map.on('click', (e) => {
            console.log('Coordenadas:', e.lngLat);
        });

        map.on('style.load', () => {
            map.setConfigProperty('basemap', 'lightPreset', 'night');
        });
        map.addControl(new mapboxgl.NavigationControl());

        

        return () => map.remove()
    }, []);

    return (
        <div ref={mapContainer} id='map'/>
    )
};

export default Map;
