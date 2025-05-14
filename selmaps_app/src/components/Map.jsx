import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { getAttractions, getHotels, getParks } from '../api/geoData';
import { addParksLayer } from '../layers/parksLayer';
import { addHotelsLayer } from '../layers/hotelsLayer';
import { addAttractionsLayer } from '../layers/attractionsLayer';
import { addPopUps } from '../utils/popup.js';
import { addDistanceMeasurementHandler, setupAreaClick, setupNeighborCheck, showNearbyCluster } from '../utils/events.js';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2FtdWVsY29ucmEiLCJhIjoiY203ejRoazl6MGhqNzJ0cTFqMGNhOXZiNSJ9.ar43sgRo_30JOY8r-GHxUw';
const BOUNDS = [
    [-74.2591, 40.4774],
    [-73.7004, 40.9176]
];


function Map ({activeLayers, activeOptions}) {
    // CONST
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    const [_, setSelectedPoints] = useState([]);
    const [mapInformation, setMapInformation] = useState('test');
    
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
            map.setConfigProperty('basemap', 'lightPreset', 'night');
        });

        // API CALLS & LAYERS
        map.on('load', () => {
            getParks().then(data => {
                addParksLayer(map, data);
            });

            getHotels().then(data => {
                addHotelsLayer(map, data);
                 map.setLayoutProperty('hotels-buffer-layer', 'visibility', 'none');
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
        if (map.getLayer('hotels-buffer-layer')) {
            map.setLayoutProperty('hotels-buffer-layer', 'visibility', activeLayers.hotels && activeOptions.buffer ? 'visible' : 'none');
        }
        if (map.getLayer('attractions-layer')) {
            map.setLayoutProperty('attractions-layer', 'visibility', activeLayers.attractions ? 'visible' : 'none');
        }
    }, [activeLayers, activeOptions]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        let handler;

        if (activeOptions.distances) {
            handler = addDistanceMeasurementHandler(map, setSelectedPoints, setMapInformation);
        }

        return () => {
            if (handler) {
                map.off('click', 'hotels-layer', handler);
                map.off('click', 'attractions-layer', handler);
            }

            if (map.isStyleLoaded()) {
                if (map.getLayer('distance-line-layer')) {
                    map.removeLayer('distance-line-layer');
                }
                if (map.getSource('distance-line')) {
                    map.removeSource('distance-line');
                }
            }
            setSelectedPoints([]);
            setMapInformation()
        };
    }, [activeOptions.distances]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const {
            hotelEnter,
            hotelLeave,
            attractionEnter,
            attractionLeave
        } = addPopUps(map);

        if (!activeOptions.distances) {
            map.on('mouseenter', 'hotels-layer', hotelEnter);
            map.on('mouseleave', 'hotels-layer', hotelLeave);
            map.on('mouseenter', 'attractions-layer', attractionEnter);
            map.on('mouseleave', 'attractions-layer', attractionLeave);
        }

        return () => {
            map.off('mouseenter', 'hotels-layer', hotelEnter);
            map.off('mouseleave', 'hotels-layer', hotelLeave);
            map.off('mouseenter', 'attractions-layer', attractionEnter);
            map.off('mouseleave', 'attractions-layer', attractionLeave);
        };
    }, [activeOptions.distances]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !activeOptions.clustering) return;

        const handleClick = (e) => {
            const clickedFeature = e.features[0];
            if (!clickedFeature) return;

            const hotelsData = map.querySourceFeatures('hotels-source');
            const attractionsData = map.querySourceFeatures('attractions-source');

            console.log('Hotels data:', hotelsData); // Ahora ya no debería estar vacío
            console.log('Attractions data:', attractionsData);

            showNearbyCluster(map, clickedFeature, hotelsData, attractionsData);
        };

        map.on('click', 'hotels-layer', handleClick);
        map.on('click', 'attractions-layer', handleClick);

        return () => {
            map.off('click', 'hotels-layer', handleClick);
            map.off('click', 'attractions-layer', handleClick);

            if (map.getLayer('cluster-area-layer')) {
                map.removeLayer('cluster-area-layer');
            }
            if (map.getSource('cluster-area')) {
                map.removeSource('cluster-area');
            }
        };
    }, [activeOptions.clustering]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !activeOptions.area) return;

        const cleanup = setupAreaClick(map, 'parks-layer', setMapInformation);

        return () => {
            cleanup();
        };
    }, [activeOptions.area]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !activeOptions.neighbors) return;

        const cleanup = setupNeighborCheck(map, {
            hotelLayer: 'hotels-layer',
            radiusMeters: 0.2,
        }, setMapInformation);

        return () => {
            cleanup(); 
        };
    }, [activeOptions.neighbors]);


    return (
        <>
            <div ref={mapContainer} id='map'>
                <div className='map-info'>{mapInformation}</div>
            </div>
        </>
    )
};

export default Map;
