import * as turf from '@turf/turf';

export const addDistanceMeasurementHandler = (map, setSelectedPoints, setMapInformation) => {
    const handler = function (e) {
        const clickedFeature = e.features[0];
        const clickedPoint = turf.point(clickedFeature.geometry.coordinates);

        setSelectedPoints(prev => {
            if (prev.length === 0) {
                return [clickedPoint];
            } else if (prev.length === 1) {
                const line = turf.lineString([
                    prev[0].geometry.coordinates,
                    clickedPoint.geometry.coordinates
                ]);

                if (map.getSource('distance-line')) {
                    map.getSource('distance-line').setData(line);
                } else {
                    map.addSource('distance-line', {
                        type: 'geojson',
                        data: line
                    });

                    map.addLayer({
                        id: 'distance-line-layer',
                        type: 'line',
                        source: 'distance-line',
                        paint: {
                            'line-color': '#fff',
                            'line-width': 3,
                            'line-emissive-strength': 0.7
                        }
                    });
                }

                const distance = turf.distance(prev[0], clickedPoint, { units: 'kilometers' });
                // alert(`Distance: ${distance.toFixed(2)} km`);
                setMapInformation(`Distance: ${distance.toFixed(2)} km`);

                return [];
            } else {
                return [];
            }
        });
    };

    map.on('click', 'hotels-layer', handler);
    map.on('click', 'attractions-layer', handler);

    return handler;
};


export const showNearbyCluster = (map, clickedFeature, hotelsData, attractionsData, clusterRadiusKm = 0.5) => {
    if (!clickedFeature || !map) return;

    const clickedPoint = turf.point(clickedFeature.geometry.coordinates);

    const allPoints = [...hotelsData, ...attractionsData].map(f =>
        turf.point(f.geometry.coordinates)
    );

    const nearbyPoints = allPoints.filter(pt => 
        turf.distance(pt, clickedPoint, { units: 'kilometers' }) <= clusterRadiusKm
    );

    if (nearbyPoints.length === 0) return;

    const cluster = turf.featureCollection(nearbyPoints);
    const clusterShape = turf.convex(cluster);

    // Elimina la capa anterior si existe
    if (map.getLayer('cluster-area-layer')) {
        map.removeLayer('cluster-area-layer');
    }
    if (map.getSource('cluster-area')) {
        map.removeSource('cluster-area');
    }


    map.addSource('cluster-area', {
        type: 'geojson',
        data: clusterShape
    });

    map.addLayer({
        id: 'cluster-area-layer',
        type: 'fill',
        source: 'cluster-area',
        paint: {
            'fill-color': '#fff',
            'fill-opacity': 0.3,
            'fill-emissive-strength': 0.9
        }
    });
};


export function setupAreaClick(map, layerId = 'parks-layer', setMapInformation) {
    const handleClick = (e) => {
        const clickedFeature = e.features[0];
        if (!clickedFeature || clickedFeature.geometry.type !== 'Polygon') return;

        const area = turf.area(clickedFeature);
        const areaKm2 = (area / 1e6).toFixed(2);
        // alert(`Área del parque: ${areaKm2} km²`);
        setMapInformation(`Park Area: ${areaKm2} km²`);
    };

    const handleMouseEnter = () => {
        map.getCanvas().style.cursor = 'pointer';
    };

    const handleMouseLeave = () => {
        map.getCanvas().style.cursor = '';
    };

    map.on('click', layerId, handleClick);
    map.on('mouseenter', layerId, handleMouseEnter);
    map.on('mouseleave', layerId, handleMouseLeave);

    return () => {
        map.off('click', layerId, handleClick);
        map.off('mouseenter', layerId, handleMouseEnter);
        map.off('mouseleave', layerId, handleMouseLeave);
        map.getCanvas().style.cursor = '';
    };
}


export function setupNeighborCheck(map, options = {}, setMapInformation) {
    const {
        hotelLayer = 'hotels-layer',
        radiusMeters = 0.2
    } = options;

    const handleClick = (e) => {
        const hotelFeature = e.features[0];
        if (!hotelFeature || hotelFeature.geometry.type !== 'Point') return;

        const hotelPoint = turf.point(hotelFeature.geometry.coordinates);

        const attractions = map.querySourceFeatures('attractions-source');

        const nearby = attractions.filter((feat) => {
            if (feat.geometry.type !== 'Point') return false;
            const attractionPoint = turf.point(feat.geometry.coordinates);
            const distance = turf.distance(hotelPoint, attractionPoint, { units: 'kilometers' });
            return distance <= radiusMeters;
        });

        // alert(`${nearby.length} attractions close.`);
        setMapInformation(`${nearby.length} attractions close.`);
    };


    const handleMouseEnter = () => {
        map.getCanvas().style.cursor = 'pointer';
    };

    const handleMouseLeave = () => {
        map.getCanvas().style.cursor = '';
    };

    map.on('click', hotelLayer, handleClick);
    map.on('mouseenter', hotelLayer, handleMouseEnter);
    map.on('mouseleave', hotelLayer, handleMouseLeave);

    return () => {
        map.off('click', hotelLayer, handleClick);
        map.off('mouseenter', hotelLayer, handleMouseEnter);
        map.off('mouseleave', hotelLayer, handleMouseLeave);
        map.getCanvas().style.cursor = '';
    };
}
