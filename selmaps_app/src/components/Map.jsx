import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { getAttractions, getHotels, getParks } from '../api/geoData';
import { addParksLayer } from '../layers/parksLayer';
import { addHotelsLayer } from '../layers/hotelsLayer';
import { addAttractionsLayer } from '../layers/attractionsLayer';
import { addPopUps } from '../utils/popup';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2FtdWVsY29ucmEiLCJhIjoiY203ejRoazl6MGhqNzJ0cTFqMGNhOXZiNSJ9.ar43sgRo_30JOY8r-GHxUw';
const BOUNDS = [
    [-74.2591, 40.4774],
    [-73.7004, 40.9176]
];


function Map ({activeLayers}) {
    // CONST
    const mapContainer = useRef(null);
    const mapRef = useRef(null);
    
    useEffect(() => {
        // MAP DEFINITION
        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            center: [12.4822, 41.8887],
            zoom: 11.5,
            // maxBounds: BOUNDS
        });

        mapRef.current = map;

        // LIGHT
        map.on('style.load', () => {
            map.setConfigProperty('basemap', 'lightPreset', 'light');
        });

        // API CALLS & LAYERS
        map.on('load', () => {
            getParks().then(data => {
                addParksLayer(map, data);
            });

            getHotels().then(data => {
                addHotelsLayer(map, data);
            });

            getAttractions().then(data => {
                addAttractionsLayer(map, data);
            });

            addPopUps(map)
        });

        // CONTROLS
        map.addControl(new mapboxgl.NavigationControl());

        return () => map.remove();
    }, []);


    useEffect(() => {
        const map = mapRef.current;
        if (!map || !map.isStyleLoaded()) return;

        if (map.getLayer('parks-layer')) {
            map.setLayoutProperty('parks-layer', 'visibility', activeLayers.parks ? 'visible' : 'none');
        }
        if (map.getLayer('outline')) {
            map.setLayoutProperty('outline', 'visibility', activeLayers.parks ? 'visible' : 'none');
        }
        if (map.getLayer('hotels-layer')) {
            map.setLayoutProperty('hotels-layer', 'visibility', activeLayers.hotels ? 'visible' : 'none');
        }
        if (map.getLayer('attractions-layer')) {
            map.setLayoutProperty('attractions-layer', 'visibility', activeLayers.attractions ? 'visible' : 'none');
        }
    }, [activeLayers]);


    return (
        <div ref={mapContainer} id='map'/>
    )
};

export default Map;
